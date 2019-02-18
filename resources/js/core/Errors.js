class Errors {
   constructor() {
      this.errors = {};
      this.runed = false;
   }

   has(key) {
      return this.errors.hasOwnProperty(key);
   }

   any() {
      return Object.keys(this.errors).length > 0;
   }

   get(key) {
      if (this.has(key)) {
         return this.errors[key][0];
      }
   }

   getClass(key) {
      return this.has(key) ? ' is-invalid' : (this.runed ? 'is-valid' : '');
   }

   set(key, error) {
      let errors = this.errors;
      this.errors = {};
      errors[key] = (typeof errors[key] === 'object') ? errors[key] : [];
      errors[key].push(error);

      this.errors = errors;
   }

   record(error) {
      if (typeof error === 'string') {
         flashMessage('error', error);
         return;
      }
      this.errors = error;
   }

   clear(key) {
      if (key) {
         delete this.errors[key];
         return;
      }
      this.errors = {};
   }
}

export default Errors;