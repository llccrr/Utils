/**
 * Return true or false if the regex match any value of the firstObject
 * @param firstObj
 * @param regex
 * @param opt Optional, permit to custom filters
 * @param obj !! Only used by itself for recursion
 * @returns {boolean}
 */
export const recursiveRegexMatch = (firstObj, regex, opt = {}, obj = firstObj) => {
    for (let arg in obj) {
        if (obj.hasOwnProperty(arg)) {
            switch (typeof (obj[arg])) {
                case 'object':
                    if (!opt.hasOwnProperty('checkObject') || opt.checkObject) {
                        if (recursiveRegexMatch(firstObj, regex, opt, obj[arg])) {
                            return true;
                        }
                    }
                    break;
                case 'string':
                    if (!opt.hasOwnProperty('checkString') || opt.checkString) {
                        if (obj[arg].match(regex)) {
                            return true;
                        }
                    }
                    break;
                case 'boolean':
                    if (!opt.hasOwnProperty('checkBoolean') || opt.checkBoolean) {
                        if (obj[arg] && arg.match(regex)) {
                            return true;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return false;
};
