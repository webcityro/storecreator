export default class Helper {
    static isEmpty(value) {
        if (Helper.isObject(value)) {
            return Object.keys(value).length === 0;
        }

        return (
            value === undefined ||
            value === null ||
            value.length === 0 ||
            (typeof value === 'string' && value.trim() === '')
        );
    }

    static isObject(value) {
        return value instanceof Object && !Array.isArray(value);
    }

    static isEqual(val1, val2) {
        if (
            typeof val1 !== typeof val2 ||
            (Helper.isObject(val1) && Array.isArray(val2)) ||
            (Helper.isObject(val2) && Array.isArray(val1))
        ) {
            return false;
        }

        if (typeof val1 === 'object') {
            if (
                (Array.isArray(val1) ? val1 : Object.keys(val1)).length !==
                (Array.isArray(val2) ? val2 : Object.keys(val2)).length
            ) {
                return false;
            }

            for (const key in val1) {
                if (val2.indexOf(val1[key]) === -1) {
                    return false;
                }

                if (!Helper.isEqual(val1[key], val2[val2.indexOf(val1[key])])) {
                    return false;
                }
            }
        }

        if (!Helper.isObject(val1) && !Array.isArray(val1) && val1 !== val2) {
            return false;
        }

        return true;
    }
}
