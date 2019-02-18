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

   mounted() {
      this.profileForm.clear = false;
   },

   methods: {
      saveProfile() {
         this.profileForm.validate({
            groups: [
               {
                  fields: [
                     {
                        field: 'firstName',
                        label: trans('formLabels.firstName')
                     }, {
                        field: 'lastName',
                        label: trans('formLabels.lastName')
                     }
                  ],
                  rules: {
                     required: true,
                     lengthRange: [2, 191],
                     maxLength: 191,
                     alpha: true
                  }
               }, {
                  fields: [
                     {
                        field: 'sex',
                        label: trans('formLabels.sex')
                     }
                  ],
                  rules: {
                     required: true
                  }
               }
            ],
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

         this.profileForm.put('profile.update').then(updatedUser => {
            user = updatedUser;

            this.userInfo.firstName = user.firstName;
            this.userInfo.lastName = user.lastName;
            this.userInfo.sex = user.sex;
            this.userInfo.email = user.email;

            this.$refs.editProfileModal.hide();
            this.profileForm.errors.runed = false;
         }).catch(error => {
            console.log('error', error);
         });
      },

      savePassword() {
         this.passwordForm.validate({
            groups: [
               {
                  fields: [
                     {
                        field: 'currentPassword',
                        label: trans('formLabels.currentPassword')
                     }, {
                        field: 'newPassword',
                        label: trans('formLabels.newPassword')
                     }
                  ],
                  rules: {
                     required: true,
                     minLength: 6
                  }
               }
            ]
         });

         this.passwordForm.put('users.changePassword').then(updatedUser => {
            this.$refs.changePasswordModal.hide();
            this.passwordForm.errors.runed = false;
         }).catch(error => {
            console.log('error', error);
         });
      },

      cancelProfile() {
         this.profileForm = new Form({
            firstName: user.firstName,
            lastName: user.lastName,
            sex: user.sex,
            email: user.email
         });
         this.$refs.editProfileModal.hide();
      },

      cancelPassword() {
         this.passwordForm.reset();
         this.$refs.changePasswordModal.hide();
      }
   }
});