class Errors {
    constructor() {
        this.errors = {};
        this.tabErrorsCount = {};
        this.languageErrorsCount = {};
        this.runed = false;
    }

    has(key, languageID = false) {
        return (
            this.errors.hasOwnProperty(key) &&
            (!languageID || typeof this.errors[key][languageID] === 'object')
        );
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }

    get(key, languageID = false) {
        if (this.has(key)) {
            return languageID
                ? this.errors[key][languageID][0]
                : this.errors[key][0];
        }
    }

    getClass(key) {
        return this.has(key) ? ' is-invalid' : this.runed ? 'is-valid' : '';
    }

    getTabErrorsCount(tab) {
        return this.tabErrorsCount[tab] || 0;
    }

    getLanguageErrorsCount(id) {
        return this.languageErrorsCount[id] || 0;
    }

    set(key, error, tab = false, languageID = false) {
        let errors = this.errors;
        this.errors = {};
        errors[key] = typeof errors[key] === 'object' ? errors[key] : {};

        if (languageID) {
            errors[key][languageID] = [
                ...(errors[key][languageID] || []),
                error
            ];
        } else {
            errors[key][Object.keys(errors[key]).length] = error;
        }

        this.errors = errors;

        this.setTabErrorOrLanguageCount('tabErrorsCount', tab);
        this.setTabErrorOrLanguageCount('languageErrorsCount', languageID);
    }

    setTabErrorOrLanguageCount(type, id) {
        if (!id) {
            return;
        }
        const tabErrorsCount = this[type];
        tabErrorsCount[id] = tabErrorsCount[id] || 0;
        tabErrorsCount[id]++;
        this[type] = {};
        this[type] = tabErrorsCount;
    }

    record(error) {
        if (typeof error === 'string') {
            flashMessage('error', error);
            return;
        }

        // let newErrors = {};

        // for (let i in error) {
        //    newErrors[i.indexOf('.') > -1 ? i.split('.').pop() : i] = error[i];
        // }
        this.errors = error;
    }

    clear(key) {
        if (key) {
            delete this.errors[key];
            delete this.tabErrorsCount[key];
            return;
        }
        this.errors = {};
        this.tabErrorsCount = {};
    }
}

export default Errors;
