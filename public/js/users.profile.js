new Vue({
   el: '#profileApp',

   data: {
      profileForm: new Form({
         firstName: user.firstName,
         lastName: user.lastName,
         sex: user.sex,
         email: user.email
      }),
      userInfo: {
         firstName: user.firstName,
         lastName: user.lastName,
         sex: user.sex,
         email: user.email
      },
      passwordForm: new Form({
         currentPassword: '',
         newPassword: ''
      })
   },

   mounted: function mounted() {
      this.profileForm.clear = false;
   },


   computed: {
      displaySex: function displaySex() {
         return trans('formLabels.sex' + (this.userInfo.sex[0].toUpperCase() + this.userInfo.sex.substr(1)));
      }
   },

   methods: {
      saveProfile: function saveProfile() {
         var _this = this;

         this.profileForm.validate({
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
               }],
               rules: {
                  required: true
               }
            }],
            fields: {
               email: {
                  label: trans('formLabels.email'),
                  rules: {
                     required: true,
                     email: true
                  }
               }
            }
         });

         this.profileForm.put('profile.update').then(function (updatedUser) {
            user = updatedUser;

            _this.userInfo.firstName = user.firstName;
            _this.userInfo.lastName = user.lastName;
            _this.userInfo.sex = user.sex;
            _this.userInfo.email = user.email;

            _this.$refs.editProfileModal.hide();
            _this.profileForm.errors.runed = false;
         }).catch(function (error) {
            console.log('error', error);
         });
      },
      savePassword: function savePassword() {
         var _this2 = this;

         this.passwordForm.validate({
            groups: [{
               fields: [{
                  field: 'currentPassword',
                  label: trans('formLabels.currentPassword')
               }, {
                  field: 'newPassword',
                  label: trans('formLabels.newPassword')
               }],
               rules: {
                  required: true,
                  minLength: 6
               }
            }]
         });

         this.passwordForm.put('users.changePassword').then(function (updatedUser) {
            _this2.$refs.changePasswordModal.hide();
            _this2.passwordForm.errors.runed = false;
         }).catch(function (error) {
            console.log('error', error);
         });
      },
      cancelProfile: function cancelProfile() {
         this.profileForm = new Form({
            firstName: user.firstName,
            lastName: user.lastName,
            sex: user.sex,
            email: user.email
         });
         this.$refs.editProfileModal.hide();
      },
      cancelPassword: function cancelPassword() {
         this.passwordForm.reset();
         this.$refs.changePasswordModal.hide();
      }
   }
});
