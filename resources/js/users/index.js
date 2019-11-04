import { mapActions, mapGetters } from 'vuex';
import User from '../core/User';

new Vue({
   store,

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
         roles: [],
         stores: []
      }),
      passwordOptions: [
         { text: trans('formLabels.passwordSet'), value: 'set' },
         { text: trans('formLabels.passwordAuto'), value: 'auto' }
      ]
   },

   mounted() {
      // console.log('this.auth', this.auth.data.id);
   },

   methods: {
      edit(row) {
         console.log(row);
         this.userRow = row;
         this.form.firstName = row.item.firstName;
         this.form.lastName = row.item.lastName;
         this.form.userName = row.item.userName;
         this.form.sex = row.item.sex;
         this.form.email = row.item.email;
         this.form.status = row.item.active;
         this.form.passwordType = 'dontChange';
         this.passwordOptions =  [
            { text: trans('formLabels.passwordDontChange'), value: 'dontChange' },
            { text: trans('formLabels.passwordChange'), value: 'change' },
            { text: trans('formLabels.passwordAuto'), value: 'auto' }
         ];

         for (let role of row.item.roles) {
            this.form.roles.push(role.id);
         }

         this.form.stores = [];

         for (let store of row.item.stores) {
            this.form.stores.push(store.id);
         }

         this.$refs.userFormModal.show();
      },

      add() {
         this.validate(true);
         this.form.clear = false;

         this.form.post('users.store').then(newUser => {
            Event.emit('scAddDisplayRow', newUser);
            this.cancel();
         }).catch(error => {
            console.log('error', error);
         })
      },

      update() {
         this.validate();
         this.form.clear = false;

         this.form.put(['users.update', { user: this.userRow.item.id}]).then(updatedUser => {
            Event.emit('scUpdateDisplayRow', { index: this.userRow.index, data: updatedUser});
            this.cancel();
         }).catch(error => {
            console.log('error', error);
         })
      },

      deleteUser() {
         this.form.delete(['users.destroy', { user: this.userRow.item.id}]).then(data => {
            window.Event.emit('scFilteredItemsRefresh');
            this.userRow = null;
            this.$refs.deleteUserModal.hide();
         });
      },

      cancel() {
         this.userRow = null;
         this.form.clear = true;
         this.form.reset();
         this.form.passwordType = 'set';
         this.passwordOptions =  [
            { text: trans('formLabels.passwordSet'), value: 'set' },
            { text: trans('formLabels.passwordAuto'), value: 'auto' }
         ];

         this.$refs.userFormModal.hide();
      },

      validate(add) {
         let rules = {
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
                     alpha: true
                  }
               }, {
                  fields: [
                     {
                        field: 'sex',
                        label: trans('formLabels.sex')
                     }, {
                        field: 'status',
                        label: trans('formLabels.status')
                     }, {
                        field: 'roles',
                        label: trans('role.title')
                     }, {
                        field: 'stores',
                        label: trans('generic.stores')
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

      isOwner(row) {
         const user = new User(row);
         return user.hasRole('owner');
      }
   },

   computed: {
      ...mapGetters({
         authChech: 'auth/check',
         auth: 'auth/user'
      }),

      userFormTitle() {
         return this.userRow ? trans('user.editFormTitle', { user: this.userRow.item.displayName }) : trans('user.newAccountTitle');
      },

      deleteUserMsg() {
         return this.userRow ? trans('user.deleteUser', { user: this.userRow.item.displayName }) : '';
      }
   }
});