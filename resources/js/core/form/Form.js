import Validator from './validation/Validator';
import Errors from './validation/Errors';
import Helper from '../helpers/Helper';
// import { mapActions, mapGetters } from 'vuex';

class Form {
    constructor({
        fields,
        group,
        id = 0,
        languageID = 0,
        skipEmpty = false,
        clear = true,
        url = false,
        multiLangs = false
    }) {
        this.fields = fields;
        this.originalFields = _.cloneDeep(fields);
        this.group = group;
        this.id = id;
        this.languageID = languageID;
        this.languageIDs = window.languages.all.map(l => l.id);
        this.multiLangs = multiLangs;
        this.submitting = false;
        this.disabled = false;
        this.validator = null;
        this.skipEmpty = skipEmpty;
        this.clear = clear;
        this.url = url;
        this.errors = new Errors();

        if (this.multiLangs) {
            this.fields = this.getFieldsWithLanguagesArray();
        }
    }

    set(fields) {
        for (const key in fields) {
            const [pathKeys, dbKey] = key.split(':')[0];
            this.setField(pathKeys.split('.'), dbKey, fields[key]);
        }
    }

    setField(keys, dbKey, value, fields = this.fields) {
        const key = keys.shift();

        if (keys.length == 0) {
            if (fields[key].hasOwnProperty('languages')) {
                fields[key].languages = [];

                value.forEach(
                    l => (fields[key].languages[i.languageID] = l[dbKey || key])
                );
                fields[key].value = fields[key].languages[this.languageID];
                fields[key].originalValue = fields[key].languages;
            } else {
                fields[key].value = value;
                fields[key].originalValue = value;
            }
        } else {
            fields[key] = this.setField(keys, dbKey, value, fields[key]);
        }

        return fields;
    }

    getFieldsWithLanguagesArray(fields = this.fields) {
        for (const key in fields) {
            if (fields[key].hasOwnProperty('languages')) {
                fields[key].languages = this.getDefaultLanguagesArray();
            } else if (!fields[key].hasOwnProperty('value')) {
                fields[key] = this.getFieldsWithLanguagesArray(fields[key]);
            }
        }
        return fields;
    }

    setLanguage(id) {
        this.fields = this.fieldsLooper({
            callback: ({ field, key, path }) => {
                if (field.hasOwnProperty('languages')) {
                    field.languages[this.languageID || id] = field.value;
                    field.value = field.languages[id];
                }

                return field;
            },
            done: () => (this.languageID = id)
        });
    }

    getDefaultLanguagesArray() {
        const langs = {};
        this.languageIDs.forEach(id => (langs[id] = ''));
        return langs;
    }

    data(fields = this.fields) {
        return this.fieldsLooper({
            callback: ({ field, key, path }) => {
                if (
                    key !== 'tab' &&
                    (!this.skipEmpty ||
                        (this.skipEmpty && !Helper.isEmpty(field.value)))
                ) {
                    return field.languages || field.value;
                }
            }
        });
    }

    fieldsLooper(
        { find = 'value', callback, done },
        fields = this.fields,
        path = '',
        tab = ''
    ) {
        const newFields = {};

        for (const key in fields) {
            tab = fields[key].tab || tab;

            if (this.fieldHasKey(fields[key], find)) {
                newFields[key] = callback({
                    field: fields[key],
                    key,
                    path,
                    tab
                });
            } else if (!this.fieldHasKey(fields[key], 'value')) {
                newFields[key] = this.fieldsLooper(
                    { find, callback },
                    fields[key],
                    path ? path + '.' + key : key,
                    tab
                );
            }

            if (typeof newFields[key] === 'undefined') {
                delete newFields[key];
            }
        }

        if (typeof done === 'function') {
            done(newFields);
        }
        return newFields;
    }

    fieldHasKey(field, key) {
        return Object.keys(field).some(
            value =>
                (Array.isArray(key) && key.includes(value)) || value === key
        );
    }

    reset() {
        this.errors.clear();
        this.errors.runed = false;
        this.autofill = true;

        if (!this.clear) {
            return;
        }

        this.fields = _.cloneDeep(this.originalFields);
        Event.emit('scFormReset-' + this.group, true);
    }

    async submit(type, url) {
        console.log(this.getAjaxURL(url));

        return new Promise((resolve, reject) => {
            this.validate(type)
                .then(async () => {
                    try {
                        const { data } = await this.makeAjaxCall(url, type);
                        this.onSuccess(data, resolve);
                    } catch ({ response: { data: error } }) {
                        console.log({
                            ajaxErrors: error,
                            formGroup: this.group
                        });
                        this.onFail(error, reject);
                    }
                })
                .catch(error => {
                    console.log({
                        validationErrors: error,
                        formGroup: this.group
                    });
                    this.onFail(error, reject);
                });
        });
    }

    validate(type) {
        return new Promise((resolve, reject) => {
            this.validator = new Validator(this, type, resolve, reject);
        });
    }

    makeAjaxCall(url, type) {
        this.submitting = true;
        const parsedURL = this.getAjaxURL(url);
        return type == 'get'
            ? axios.get(parsedURL)
            : axios[type](parsedURL, this.getAjaxData(type));
    }

    getAjaxURL(url) {
        return this.url
            ? url || this.url
            : typeof url === 'object'
            ? laroute.route(url[0], url[1])
            : laroute.route(url);
    }

    getAjaxData(type) {
        return type == 'delete' ? { data: this.data() } : this.data();
    }

    get(url) {
        const params = Object.keys(this.data())
            .map(key => key + '=' + this[key])
            .join('&');
        let getURL = this.url || url;
        getURL +=
            params.length > 0
                ? getURL.indexOf('?') === -1
                    ? '?' + params
                    : '&' + params
                : '';
        return this.submit('get', getURL);
    }

    post(url) {
        return this.submit('post', url);
    }

    put(url) {
        return this.submit('put', url);
    }

    patch(url) {
        return this.submit('patch', url);
    }

    delete(url) {
        return this.submit('delete', url);
    }

    onSuccess({ status, data, message }, resolve) {
        this.submitting = false;

        if (message) {
            flashMessage('success', message);
        }

        if (this.clear) {
            this.reset();
        }
        console.log({ data });

        resolve(data);
    }

    onFail({ errors, message }, reject) {
        this.submitting = false;

        if (message) {
            flashMessage('error', message);
        }
        reject(errors);
    }
}

export default Form;
