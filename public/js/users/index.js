new Vue({
   el: '#usersApp',

   data: {
      userRow: null,
      form: new Form({
         firstName: '',
         lastName: '',
         userName: '',
         sex: '',
         email: '',
         password: '',
         passwordType: this.userRow ? 'dontChange' : 'set',
         status: '',
         roles: []
      }),
      passwordOptions: [{ text: trans('formLabels.passwordSet'), value: 'set' }, { text: trans('formLabels.passwordAuto'), value: 'auto' }]
   },

   created: function created() {},


   methods: {
      edit: function edit(row) {
         this.userRow = row;
         this.form.firstName = row.item.firstName;
         this.form.lastName = row.item.lastName;
         this.form.userName = row.item.userName;
         this.form.sex = row.item.sex;
         this.form.email = row.item.email;
         this.form.status = row.item.active;
         this.form.passwordType = 'dontChange';
         this.passwordOptions = [{ text: trans('formLabels.passwordDontChange'), value: 'dontChange' }, { text: trans('formLabels.passwordChange'), value: 'change' }, { text: trans('formLabels.passwordAuto'), value: 'auto' }];

         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = row.item.roles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var role = _step.value;

               this.form.roles.push(role.id);
            }
         } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
               }
            } finally {
               if (_didIteratorError) {
                  throw _iteratorError;
               }
            }
         }

         this.$refs.userFormModal.show();
      },
      add: function add() {
         var _this = this;

         this.validate(true);
         this.form.clear = false;

         this.form.post('users.store').then(function (newUser) {
            Event.emit('scAddDisplayRow', newUser);
            _this.cancel();
         }).catch(function (error) {
            console.log('error', error);
         });
      },
      update: function update() {
         var _this2 = this;

         this.validate();
         this.form.clear = false;

         this.form.put(['users.update', { user: this.userRow.item.id }]).then(function (updatedUser) {
            Event.emit('scUpdateDisplayRow', { index: _this2.userRow.index, data: updatedUser });
            _this2.cancel();
         }).catch(function (error) {
            console.log('error', error);
         });
      },
      deleteUser: function deleteUser() {
         var _this3 = this;

         this.form.delete(['users.destroy', { user: this.userRow.item.id }]).then(function (data) {
            window.Event.emit('scFilteredItemsRefresh');
            _this3.userRow = null;
            _this3.$refs.deleteUserModal.hide();
         });
      },
      cancel: function cancel() {
         this.userRow = null;
         this.form.clear = true;
         this.form.reset();
         this.form.passwordType = 'set';
         this.passwordOptions = [{ text: trans('formLabels.passwordSet'), value: 'set' }, { text: trans('formLabels.passwordAuto'), value: 'auto' }];

         this.$refs.userFormModal.hide();
      },
      validate: function validate(add) {
         var rules = {
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
               }, {
                  field: 'roles',
                  label: trans('role.title')
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
                     required: this.form.passwordType == 'change' || this.form.passwordType == 'set',
                     minLength: 6
                  }
               }
            }
         };

         if (add) {
            rules.fields.userName = {
               label: trans('formLabels.userName'),
               rules: {
                  required: true,
                  lengthRange: [4, 25],
                  alnum: '.-_'
               }
            };
         }
         this.form.validate(rules);
      },
      isOwner: function isOwner(row) {
         var user = new User(row);
         return user.hasRole('owner');
      }
   },

   computed: {
      userFormTitle: function userFormTitle() {
         return this.userRow ? trans('user.editFormTitle', { user: this.userRow.item.displayName }) : trans('user.newAccountTitle');
      },
      deleteUserMsg: function deleteUserMsg() {
         return this.userRow ? trans('user.deleteUser', { user: this.userRow.item.displayName }) : '';
      }
   }
});
