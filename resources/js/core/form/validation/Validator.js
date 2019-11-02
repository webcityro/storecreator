import Helper from '../../helpers/Helper';
import Rule from './Rule';

export default class Validator {
    constructor(form, requestMethod, resolve, reject) {
        this.form = form;
        this.requestMethod = requestMethod;
        this.errors = {};
        this.defaultMessages = {
            required: 'validation.required',
            alpha: 'validation.alpha',
            alnum: 'validation.alpha_num',
            numeric: 'validation.numeric',
            email: 'validation.email',
            length: 'validation.size.string',
            lengthRange: 'validation.between.string',
            maxLength: 'validation.min.string',
            minLength: 'validation.max.string',
            strength: 'validation.custom.password.strength',
            in: 'validation.not_in'
        };

        this.form.errors.clear();

        Promise.all(this.run())
            .then(resolve)
            .catch(error => {
                // this.form.errors.record(this.errors);
                reject({ message: error });
            });
    }

    run() {
        const promises = [];

        for (const field of this.getFields()) {
            promises.push(this.validate(field));
        }

        return promises;
    }

    validate(field) {
        return new Promise((resolve, reject) => {
            for (const rule in field.rules) {
                try {
                    if (field.hasOwnProperty('languages')) {
                        for (const id in field.languages) {
                            this.runValidationRule(rule, field, reject, id);
                        }
                    } else {
                        this.runValidationRule(rule, field, reject);
                    }
                } catch (error) {
                    reject({
                        message: 'Invalid form validation rule!',
                        formGroup: this.form.group,
                        field: field.key,
                        rule,
                        error
                    });
                }

                if (rule === Object.keys(field.rules).pop()) {
                    resolve();
                }
            }
        });
    }

    runValidationRule(rule, field, reject, languageID = false) {
        const validatedRule = Rule[rule](
            languageID ? field.languages[languageID] : field.value,
            field.rules[rule]
        );
        if (validatedRule.passed === false) {
            this.setError(
                field.key,
                field.tab,
                rule,
                languageID,
                { ...validatedRule.param, attribute: field.label },
                field.messages[rule]
            );
            reject('invalid form data');
        }
    }

    getFields() {
        const newFields = [];

        this.form.fieldsLooper({
            find: ['rules', this.requestMethod + 'Rules'],
            callback: ({ field, key, path, tab }) => {
                newFields.push({
                    field: key,
                    tab,
                    key: path ? path + '.' + key : key,
                    messages: {},
                    ...field,
                    rules: {
                        ...(field.hasOwnProperty('rules') ? field.rules : {}),
                        ...(field.hasOwnProperty(this.requestMethod + 'Rules')
                            ? field[this.requestMethod + 'Rules']
                            : {})
                    }
                });
            }
        });
        return newFields;
    }

    setError(key, tab, rule, languageID, args, message) {
        this.form.errors.set(
            key,
            message || trans(this.defaultMessages[rule], args),
            tab,
            languageID
        );
    }
}
