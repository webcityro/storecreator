new Vue({
   el: '#auth',

   data: {
      loginForm: new Form({
         login: '',
         password: '',
         rememberMe: ''
      }),

      forgetPasswordForm: new Form({
         fpLogin: ''
      }),

      resetPasswordForm: new Form({
         password: '',
         token: typeof token == 'string' ? token : null
      })
   },

   methods: {
      submitLogin: function submitLogin() {
         this.loginForm.validate({
            fields: {
               login: {
                  label: trans('auth.usernameOrEmail'),
                  rules: {
                     required: true,
                     minLength: 4
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

         this.loginForm.post('auth.login').then(function (data) {
            window.location.replace(laroute.route('home'));
         });
      },
      submitForgetPassword: function submitForgetPassword() {
         var _this = this;

         this.forgetPasswordForm.validate({
            fields: {
               fpLogin: {
                  label: trans('auth.usernameOrEmail'),
                  rules: {
                     required: true,
                     minLength: 4
                  }
               }
            }
         });

         this.forgetPasswordForm.post('auth.password.forget').then(function (data) {
            _this.$refs.forgetPasswordModal.hide();
         });
      },
      submitResetPassword: function submitResetPassword() {
         this.resetPasswordForm.validate({
            fields: {
               password: {
                  label: trans('formLabels.newPassword'),
                  rules: {
                     required: true,
                     minLength: 6
                  }
               }
            }
         });

         this.resetPasswordForm.post(['auth.password.reset', { token: this.resetPasswordForm.token }]).then(function (data) {
            window.location.replace(laroute.route('home'));
         }).then(function (err) {});
      }
   }
});
