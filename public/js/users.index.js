new Vue({
   el: '#usersApp',

   data: {
      form: new Form({
         firstName: '',
         lastName: '',
         sex: '',
         email: '',
         password: '',
         passwordType: 'dontChange',
         status: ''
      }),
      userRow: null,
      passwordOptions: [{ text: trans('formLabels.passwordDontChange'), value: 'dontChange' }, { text: trans('formLabels.passwordChange'), value: 'change' }, { text: trans('formLabels.passwordAuto'), value: 'auto' }]
   },

   created: function created() {},


   methods: {
      edit: function edit(row) {
         this.userRow = row;
         this.form.firstName = row.item.firstName;
         this.form.lastName = row.item.lastName;
         this.form.sex = row.item.sex;
         this.form.email = row.item.email;
         this.form.status = row.item.active;

         this.$refs.editUserModal.show();
      },
      save: function save() {
         var _this = this;

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
                     required: this.form.passwordType == 'change',
                     minLength: 6
                  }
               }
            }
         });

         this.form.clear = false;

         this.form.put(['users.update', { user: this.userRow.item.id }]).then(function (newUser) {
            Event.emit('scUpdateDisplayRow', { index: _this.userRow.index, data: _this.form.data() });
            _this.cancel();
         }).catch(function (error) {
            console.log('error', error);
         });
      },
      deleteUser: function deleteUser() {
         var _this2 = this;

         this.form.delete(['users.destroy', { user: this.userRow.item.id }]).then(function (data) {
            window.Event.emit('scFilteredItemsRefresh');
            _this2.userRow = null;
            _this2.$refs.deleteUserModal.hide();
         });
      },
      cancel: function cancel() {
         this.userRow = null;
         this.form.clear = true;
         this.form.reset();
         this.form.passwordType = 'dontChange';

         this.$refs.editUserModal.hide();
      }
   },

   computed: {
      editFormTitle: function editFormTitle() {
         return this.userRow ? trans('user.editFormTitle', { user: this.userRow.item.displayName }) : '';
      },
      deleteUserMsg: function deleteUserMsg() {
         return this.userRow ? trans('user.deleteUser', { user: this.userRow.item.displayName }) : '';
      }
   }
});
