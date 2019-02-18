new Vue({
   el: '#userForm',

   data: {
      form: new Form({
         firstName: 'ion',
         lastName: 'gheorghe',
         userName: 'igheorghe51',
         password: 'password',
         sex: 'male',
         email: 'ion@app.com',
         status: '1',
         test: 'test'
      })
   },

   methods: {
      submitForm: function submitForm() {
         this.form.validate({
            groups: [{
               fields: [{
                  field: 'firstName',
                  label: trans('formLabels.firstName')
               }, {
                  field: 'lastName',
                  label: trans('formLabels.lastName')
               }],
               rules: {
                  required: true,
                  lengthRange: [2, 191],
                  maxLength: 191,
                  alpha: true
               }
            }, {
               fields: [{
                  field: 'sex',
                  label: trans('formLabels.sex')
               }, {
                  field: 'status',
                  label: trans('formLabels.status')
               }],
               rules: {
                  required: true
               }
            }],
            fields: {
               userName: {
                  label: trans('formLabels.userName'),
                  rules: {
                     required: true,
                     lengthRange: [4, 25],
                     alnum: '.-_'
                  }
               },
               email: {
                  label: trans('formLabels.email'),
                  rules: {
                     required: true,
                     email: true
                  }
               },
               password: {
                  label: trans('formLabels.password'),
                  rules: {
                     required: true,
                     minLength: 6
                  }
               }
            }
         });

         this.form.post('users.store').then(function (newUser) {
            window.location.replace(laroute.route('users.show', { user: newUser.id }));
         }).catch(function (error) {
            console.log('error', error);
         });
      }
   }
});
