class Validator {

   constructor({fields, rules, errors}) {
      this.fields = fields;
      this.rules = rules;
      this.errors = errors;
      this.REGEXP = {
         alpha: /[a-zA-Z]+/,
         alnum: /[a-zA-Z0-9]+/,
         email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         zip: /^\d{5}(-\d{4})?$/,
         phone: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
         strengthPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
      };

      this.rulesAliases = {
         RULE_REQUIRED: 'required',
         RULE_ALPHA: 'alpa',
         RULE_ALNUM: 'alnum',
         RULE_EMAIL: 'email',
         RULE_LENGTH: 'length',
         RULE_LENGTHRANGE: 'lengthRange',
         RULE_MINLENGTH: 'minLength',
         RULE_MAXLENGTH: 'maxLength',
         RULE_ZIP: 'zip',
         RULE_PHONE: 'phone',
         RULE_REMOTE: 'remote',
         RULE_STRENGTH: 'strength'
      };

      this.defaultMessages = {
         required: 'validation.required',
         alpha: 'validation.alpha',
         alnum: 'validation.alpha_num',
         email: 'validation.email',
         length: 'validation.size.string',
         lengthRange: 'validation.between.string',
         maxLength: 'validation.min.string',
         minLength: 'validation.max.string',
         strength: 'validation.custom.password.strength',
      };
   }

   run() {
      this.errors.clear();
      this.errors.runed = true;

      if (this.rules.groups) {
         for (let {fields, rules} of this.rules.groups) {
            for (let {label, field} of fields) {
               this.validateField(label, field, rules);
            }
         }
      }

      if (this.rules.fields) {
         for (let field in this.rules.fields) {
            this.validateField(this.rules.fields[field].label, field, this.rules.fields[field].rules);
         }
      }
   }

   validateField(label, field, rules) {
      if (!rules) { return; }
      const value = this.fields[field];

      for (let rule in rules) {
         if (rule !== this.rulesAliases.RULE_REQUIRED && value == '') {
            return;
         }
         if (!rules[rule]) { continue; }

         switch (rule) {
            case this.rulesAliases.RULE_REQUIRED:
               if (this.validateRequired(value)) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_REQUIRED);
            break;
            case this.rulesAliases.RULE_EMAIL:
               if (this.validateEmail(value)) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_EMAIL);
            break;
            case this.rulesAliases.RULE_MAXLENGTH:
               if (this.validateMaxLength(value, rules[rule])) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_MAXLENGTH, {max: rules[rule]});
            break;
            case this.rulesAliases.RULE_MINLENGTH:
               if (this.validateMinLength(value, rules[rule])) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_MINLENGTH, {min: rules[rule]});
            break;
            case this.rulesAliases.RULE_LENGTH:
               if (this.validateLength(value, rules[rule])) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_LENGTH, {size: rules[rule]});
            break;
            case this.rulesAliases.RULE_LENGTHRANGE:
               if (this.validateLengthRange(value, rules[rule])) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_LENGTHRANGE, {min: rules[rule][0], max: rules[rule][1]});
            break;
            case this.rulesAliases.RULE_PHONE:
               if (this.validatePhone(value)) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_PHONE);
            break;
            case this.rulesAliases.RULE_ALPHA:
               if (this.validateAlpha(value, (typeof rules[rule] === 'string' ? rules[rule] : false))) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_ALPHA);
            break;
            case this.rulesAliases.RULE_ALNUM:
               if (this.validateAlnum(value, (typeof rules[rule] === 'string' ? rules[rule] : false))) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_ALNUM);
            break;
            case this.rulesAliases.RULE_STRENGTH:
               if (this.validateStrengthPass(value)) {
                  break;
               }

               this.setError(field, label, this.rulesAliases.RULE_STRENGTH);
            break;
         }
      }
   }

   setError(field, label, rule, aditionalArgs) {
      aditionalArgs = aditionalArgs || {};
      aditionalArgs.attribute = label;
      this.errors.set(field, trans(this.defaultMessages[rule], aditionalArgs));
   }

   isAlpha(str, except) {
      if (except) {
         str = str.replace(except, '');
      }
      return this.REGEXP.alpha.test(str);
   }

   isAlnum(str, except) {
      if (except) {
         str = str.replace(except, '');
      }
      return this.REGEXP.alnum.test(str);
   }

   isEmail(email) {
      return this.REGEXP.email.test(email);
   }

   isZip(zip) {
      return this.REGEXP.zip.test(zip);
   }

   isPhone(phone) {
      return this.REGEXP.phone.test(phone);
   }

   isEmpty(val) {
      let newVal = val;
      if (val.trim) {
         newVal = val.trim();
      }

      return newVal !== 0 && !newVal;
   }

   checkLength(text, length) {
      return text.length == length;
   }

   checkLengthRange(text, min, max) {
      return text.length >= min && text.length <= max;
   }

   checkLengthMax(text, max) {
      return text.length <= max;
   }

   checkLengthMin(text, min) {
      return text.length >= min;
   }

   checkStrengthPass(password) {
      return this.REGEXP.strengthPass.test(password);
   }

   validateRequired(value) {
      return !this.isEmpty(value);
   }

   validateAlpha(value, except) {
      return this.isAlpha(value, except);
   }

   validateAlnum(value, except) {
      return this.isAlnum(value, except);
   }

   validateEmail(value) {
      return this.isEmail(value);
   }

   validatePhone(value) {
      return this.isPhone(value);
   }

   validateLength(value, length) {
      return this.checkLength(value, length);
   }

   validateLengthRange(value, length) {
      return this.checkLengthRange(value, length[0], length[1]);
   }

   validateMinLength(value, min) {
      return this.checkLengthMin(value, min);
   }

   validateMaxLength(value, max) {
      return this.checkLengthMax(value, max);
   }

   validateStrengthPass(password) {
      return this.checkStrengthPass(password);
   }

   validateZip(value) {
      return this.isZip(value);
   }

   validateRemote({value,  name, url, successAnswer, sendParam, method}) {
      axios[method](url, {[sendParam]: value})
         .then(resonse => {
            if (response === successAnswer.toLowerCase()) {
               resolve(true);
            }else {
               reject(false);
            }
         })
         .catch(error => {
            reject(false);
         });
   }
}

export default Validator;