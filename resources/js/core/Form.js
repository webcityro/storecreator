import Validator from './Validator';

 class Form {
   constructor(data) {
      this.originalData = data;
      this.errors = new Errors();
      this.submiting = false;
      this.validator = false;
      this.skipEmpty = false;
      this.clear = true;
      this.url = false;

      for (let field in data) {
         this[field] = data[field];
      }
   }

   data() {
      let data = {};

      for (let field in this.originalData) {
         if (this.skipEmpty && !this[field]) { continue; }

         data[field] = this[field];
      }

      return data;
   }

   reset() {
      this.errors.clear();
      this.errors.runed = false;

      if (!this.clear) { return; }

      for (let field in this.originalData) {
         this[field] = this.originalData[field];
      }
   }

   validate(rules) {
      this.validator = new Validator({
         rules,
         fields: this.data(),
         errors: this.errors
      });
   }

   submit(type, url) {
      return new Promise((resolve, reject) => {
         if (this.validator) { this.validator.run(); }
         if (this.errors.any()) { reject(this.errors.errors); } else {
            this.submiting = true;
            const parsedURL = (this.url ? (url || this.url) : (typeof url === 'object' ? laroute.route(url[0], url[1]) : laroute.route(url)));
            const xhr = type == 'get' ? axios.get(parsedURL) : axios[type](parsedURL, this.data());

            xhr.then((response) => {
               var {status, data = {}, message = ''} = response.data;
               this.submiting = false;
               this.onSuccess(status, data, message);
               resolve(data);
            }).catch(errors => {
               console.log('axios catch', errors);
               this.submiting = false;
               this.onFail(errors.response.data);
               reject(errors.response.data);
            });
         }
      });
   }

   get(url) {
      const params = Object.keys(this.data()).map(key => key+'='+this[key]).join('&');
      let getURL = (this.url || url);
      getURL += params.length > 0 ? (getURL.indexOf('?') === -1 ?  '?' + params : '&' + params) : '';
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

   onSuccess(status, data, message) {
      if (message) {
         flashMessage('success', message);
      }

      if (this.clear) {
         this.reset();
      }
   }

   onFail({errors, message}) {
      if (message) {
         flashMessage('error', message);
      }

      this.errors.record(errors);
   }
}

export default Form;