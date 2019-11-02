import Helper from '../../helpers/Helper';

export default class Rule {
    static required(value, param) {
        return Rule.returnData(!Helper.isEmpty(value));
    }

    static validateIfNotEmpty(value, callback) {
        if (Helper.isEmpty(value)) {
            return null;
        }
        return callback();
    }

    static numeric(value, param) {
        return Rule.validateIfNotEmpty(value, () => {
            return Rule.returnData(!isNaN(value));
        });
    }

    static email(value, param) {
        return Rule.validateIfNotEmpty(value, () => {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return Rule.returnData(regex.test(value));
        });
    }

    static strength(value, param) {
        return Rule.validateIfNotEmpty(value, () => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
            return Rule.returnData(regex.test(value));
        });
    }

    static alpha(value, param) {
        return Rule.validateIfNotEmpty(value, () => {
            const regex = /[a-zA-Z]+/;
            return Rule.returnData(regex.test(value));
        });
    }

    static alnum(value, param) {
        return Rule.validateIfNotEmpty(value, () => {
            const regex = /[a-zA-Z0-9]+/;
            return Rule.returnData(regex.test(value));
        });
    }

    static alphaDash(value, param) {
        return Rule.validateIfNotEmpty(value, () => {
            const regex = /[a-zA-Z0-9\-\_]+/;
            return Rule.returnData(regex.test(value));
        });
    }

    static length(value, param) {
        if (typeof value === 'string') {
            return Rule.returnData(
                Rule.validateIfNotEmpty(value, () => value.length === param),
                { size: param }
            );
        }

        return Rule.returnData(Object.keys(value).length === param, {
            size: param
        });
    }

    static lengthRange(value, param) {
        if (typeof value === 'string') {
            return Rule.validateIfNotEmpty(value, () =>
                Rule.returnData(
                    value.length >= (param[0] || param.min) &&
                        value.length <= (param[1] || param.max),
                    {
                        min: param.min || param[0],
                        max: param.max || param[1]
                    }
                )
            );
        }

        return Rule.returnData(
            Object.keys(value).length >= (param[0] || param.min) &&
                Object.keys(value).length <= (param[1] || param.max),
            {
                min: param.min || param[0],
                max: param.min || param[1]
            }
        );
    }

    static maxLength(value, param) {
        if (typeof value === 'string') {
            return Rule.returnData(
                Rule.validateIfNotEmpty(value, () => value.length <= param),
                { max: param }
            );
        }

        return Rule.returnData(Object.keys(value).length <= param, {
            max: param
        });
    }

    static minLength(value, param) {
        if (typeof value === 'string') {
            return Rule.returnData(
                Rule.validateIfNotEmpty(value, () => value.length >= param),
                { min: param }
            );
        }

        return Rule.returnData(Object.keys(value).length >= param, {
            min: param
        });
    }

    static in(value, param) {
        return Rule.returnData(
            Rule.validateIfNotEmpty(value, () => param.includes(value))
        );
    }

    static returnData(passed, param = false) {
        return {
            passed,
            param
        };
    }
}
