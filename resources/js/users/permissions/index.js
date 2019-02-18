new Vue({
   el: '#permissionsApp',

   data: {
      form: new Form({
         type: 'basic',
         displayName: '',
         slug: '',
         description: '',
         resource: '',
         resourceCRUD: ['create', 'read', 'update', 'delete']
      }),
      typeOptions: [
         { text: trans('permission.basic'), value: 'basic' },
         { text: trans('permission.crud'), value: 'crud' }
      ],
      resourceCRUDoptions: [
         { text: trans('generic.create'), value: 'create' },
         { text: trans('generic.read'), value: 'read' },
         { text: trans('generic.update'), value: 'update' },
         { text: trans('generic.delete'), value: 'delete' }
      ],
      resourceCRUDtableFields: [
         { key: 'displayName', label: trans('formLabels.displayName') },
         { key: 'slug', label: trans('formLabels.slug') },
         { key: 'description', label: trans('formLabels.description') }
      ],
      permissionRow: null
   },

   methods: {
      add() {
         this.form.validate({
            fields: this.form.type == 'basic' ? {
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
            } : {
               resource: {
                  label: trans('generic.resource'),
                  rules: {
                     required: true,
                     lengthRange: [3, 30],
                     alpha: true
                  }
               },
               resourceCRUD: {
                  label: trans('formLabels.actions'),
                  rules: {
                     required: true
                  }
               },
            }
         });

         this.form.post('permissions.store').then(data => {
            console.log('added', data);
            Event.emit('scAddDisplayRow', data.added);
            this.$refs.permissionFormModal.hide();
         }).catch(({added = false, failed = false, alreadyExists = false}) => {
            console.log('error', added);
            if (added) {
               Event.emit('scAddDisplayRow', added);
            } else if (failed || alreadyExists) {
               let keys = Object.keys(failed || alreadyExists);
               for (let i in this.resourceCRUDoptions) {
                  if (keys.indexOf(this.resourceCRUDoptions[i].value) === -1) {
                     delete this.resourceCRUDoptions[i];
                  }
               }
            } else this.$refs.permissionFormModal.hide();
         });
      },

      edit(row) {
         this.permissionRow = row;

         this.form.displayName = this.permissionRow.item.display_name;
         this.form.slug = this.permissionRow.item.name;
         this.form.description = this.permissionRow.item.description;
         this.$refs.permissionFormModal.show();
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

         this.form.put(['permissions.update', {permission: this.permissionRow.item.id}]).then(data => {
            Event.emit('scUpdateDisplayRow', { index: this.permissionRow.index, data});
            this.cancelForm();
         }).catch(error => {
            console.log('error', error);
            if (error.message) {
               this.cancelForm();
            }
         });
      },

      cancelForm() {
         this.form.reset();
         this.$refs.permissionFormModal.hide();
      }
   },

   computed: {
      permissionFormTitle() {
         return this.permissionRow ? trans('permission.editFormTitle', {permission: this.permissionRow.item.display_name}) : trans('permission.addFormTitle');
      },

      resourceCRUDtableItems() {
         if (this.form.resource.length < 3) {
            return [];
         }

         let rows = [];

         for (let crud of this.resourceCRUDoptions) {
            if (this.form.resourceCRUD.indexOf(crud.value) > -1) {
               rows.push({
                  displayName: crud.text + ' '+this.ucFirst(this.form.resource),
                  slug: crud.text.toLowerCase() + '-'+this.form.resource.toLowerCase().replace(/\s+/g, '-'),
                  description: trans('permission.crudTableDesc', { action: crud.text.toUpperCase(), resource: this.ucFirst(this.form.resource)})
               });
            }
         }
         return rows;
      }
   }
});