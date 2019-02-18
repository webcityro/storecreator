new Vue({
   el: '#rolesApp',

   data: {
      form: new Form({
         displayName: '',
         slug: '',
         description: '',
         permissions: []
      }),
      roleRow: null
   },

   methods: {
      add() {
         this.form.validate({
            fields: {
               displayName: {
                  label: trans('formLabels.displayName'),
                  rules: {
                     required: true,
                     lengthRange: [3, 30]
                  }
               },
               slug: {
                  label: trans('formLabels.slug'),
                  rules: {
                     required: true,
                     lengthRange: [3, 35],
                     alnum: '-'
                  }
               },
               description: {
                  label: trans('formLabels.description'),
                  rules: {
                     lengthRange: [3, 191]
                  }
               },
               permissions: {
                  label: trans('formLabels.displayName'),
                  rules: {
                     required: true,
                  }
               }
            }
         });

         this.form.post('roles.store').then(data => {
            Event.emit('scAddDisplayRow', data);
            this.cancelForm();
         }).catch(error => {

         });
      },

      edit(row) {
         this.roleRow = row;

         this.form.displayName = this.roleRow.item.display_name;
         this.form.slug = this.roleRow.item.name;
         this.form.description = this.roleRow.item.description;

         for (let p of this.roleRow.item.permissions) {
            this.form.permissions.push(p.id);
         }

         this.$refs.roleFormModal.show();
      },

      update() {
         this.form.validate({
            fields: {
               displayName: {
                  label: trans('formLabels.displayName'),
                  rules: {
                     required: true,
                     lengthRange: [3, 30]
                  }
               },
               description: {
                  label: trans('formLabels.description'),
                  rules: {
                     lengthRange: [3, 191]
                  }
               }
            }
         });

         this.form.put(['roles.update', {role: this.roleRow.item.id}]).then(data => {
            Event.emit('scUpdateDisplayRow', { index: this.roleRow.index, data});
            this.cancelForm();
         }).catch(error => {
            if (error.message) {
               this.cancelForm();
            }
         });
      },

      cancelForm() {
         this.form.reset();
         this.$refs.roleFormModal.hide();
      }
   },

   computed: {
      roleFormTitle() {
         return this.roleRow ? trans('role.editFormTitle', {role: this.roleRow.item.display_name}) : trans('role.addFormTitle');
      }
   }
});