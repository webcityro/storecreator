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
      typeOptions: [{ text: trans('permission.basic'), value: 'basic' }, { text: trans('permission.crud'), value: 'crud' }],
      resourceCRUDoptions: [{ text: trans('generic.create'), value: 'create' }, { text: trans('generic.read'), value: 'read' }, { text: trans('generic.update'), value: 'update' }, { text: trans('generic.delete'), value: 'delete' }],
      resourceCRUDtableFields: [{ key: 'displayName', label: trans('formLabels.displayName') }, { key: 'slug', label: trans('formLabels.slug') }, { key: 'description', label: trans('formLabels.description') }],
      permissionRow: null
   },

   methods: {
      add: function add() {
         var _this = this;

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
               }
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
               }
            }
         });

         this.form.post('permissions.store').then(function (data) {
            console.log('added', data);
            Event.emit('scAddDisplayRow', data.added);
            _this.$refs.permissionFormModal.hide();
         }).catch(function (_ref) {
            var _ref$added = _ref.added,
                added = _ref$added === undefined ? false : _ref$added,
                _ref$failed = _ref.failed,
                failed = _ref$failed === undefined ? false : _ref$failed,
                _ref$alreadyExists = _ref.alreadyExists,
                alreadyExists = _ref$alreadyExists === undefined ? false : _ref$alreadyExists;

            console.log('error', added);
            if (added) {
               Event.emit('scAddDisplayRow', added);
            } else if (failed || alreadyExists) {
               var keys = Object.keys(failed || alreadyExists);
               for (var i in _this.resourceCRUDoptions) {
                  if (keys.indexOf(_this.resourceCRUDoptions[i].value) === -1) {
                     delete _this.resourceCRUDoptions[i];
                  }
               }
            } else _this.$refs.permissionFormModal.hide();
         });
      },
      edit: function edit(row) {
         this.permissionRow = row;

         this.form.displayName = this.permissionRow.item.display_name;
         this.form.slug = this.permissionRow.item.name;
         this.form.description = this.permissionRow.item.description;
         this.$refs.permissionFormModal.show();
      },
      update: function update() {
         var _this2 = this;

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

         this.form.put(['permissions.update', { permission: this.permissionRow.item.id }]).then(function (data) {
            Event.emit('scUpdateDisplayRow', { index: _this2.permissionRow.index, data: data });
            _this2.cancelForm();
         }).catch(function (error) {
            console.log('error', error);
            if (error.message) {
               _this2.cancelForm();
            }
         });
      },
      cancelForm: function cancelForm() {
         this.form.reset();
         this.$refs.permissionFormModal.hide();
      }
   },

   computed: {
      permissionFormTitle: function permissionFormTitle() {
         return this.permissionRow ? trans('permission.editFormTitle', { permission: this.permissionRow.item.display_name }) : trans('permission.addFormTitle');
      },
      resourceCRUDtableItems: function resourceCRUDtableItems() {
         if (this.form.resource.length < 3) {
            return [];
         }

         var rows = [];

         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = this.resourceCRUDoptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var crud = _step.value;

               if (this.form.resourceCRUD.indexOf(crud.value) > -1) {
                  rows.push({
                     displayName: crud.text + ' ' + this.ucFirst(this.form.resource),
                     slug: crud.text.toLowerCase() + '-' + this.form.resource.toLowerCase().replace(/\s+/g, '-'),
                     description: trans('permission.crudTableDesc', { action: crud.text.toUpperCase(), resource: this.ucFirst(this.form.resource) })
                  });
               }
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

         return rows;
      }
   }
});
