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
      add: function add() {
         var _this = this;

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
                     required: true
                  }
               }
            }
         });

         this.form.post('roles.store').then(function (data) {
            Event.emit('scAddDisplayRow', data);
            _this.cancelForm();
         }).catch(function (error) {});
      },
      edit: function edit(row) {
         this.roleRow = row;

         this.form.displayName = this.roleRow.item.display_name;
         this.form.slug = this.roleRow.item.name;
         this.form.description = this.roleRow.item.description;

         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = this.roleRow.item.permissions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var p = _step.value;

               this.form.permissions.push(p.id);
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

         this.$refs.roleFormModal.show();
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

         this.form.put(['roles.update', { role: this.roleRow.item.id }]).then(function (data) {
            Event.emit('scUpdateDisplayRow', { index: _this2.roleRow.index, data: data });
            _this2.cancelForm();
         }).catch(function (error) {
            if (error.message) {
               _this2.cancelForm();
            }
         });
      },
      cancelForm: function cancelForm() {
         this.form.reset();
         this.$refs.roleFormModal.hide();
      }
   },

   computed: {
      roleFormTitle: function roleFormTitle() {
         return this.roleRow ? trans('role.editFormTitle', { role: this.roleRow.item.display_name }) : trans('role.addFormTitle');
      }
   }
});
