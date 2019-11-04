<template>

</template>

<script>
   import { mapActions, mapGetters } from 'vuex';
   import inputError from "./inputError";
   import Helper from "../../../core/helpers/Helper";
   import setDeep from "set-value";

   export default {
      store,
      inheritAttrs: false,

      components: {
         inputError
      },

      props: {
         label: { type: String, required: true },
         id: { type: String, required: true },
         type: { type: String, required: false, default: 'text' },
         value: {},
         options: { type: [Object, Array, String], required: false },
         hideDefault: { type: Boolean, required: false, default: false },
         disabled: { type: Boolean, required: false, default: false },
         inline: { type: Boolean, required: false, default: false },
         form: { type: Object, required: true },
         vModel: { type: String, required: false },
         showOriginal: { type: Boolean, required: false, default: true }
      },

      data() {
         return {
            showOriginalValue: false,
            showOriginalValueEvent: 'scFormFieldShowOriginalValue_'+this.form.group+'_'+this.id,
            vModelExpression: null,
            vModelTrimStart: 'form.fields.',
            vModelTrimEnd: '.value',
            active: true
         };
      },

      created() {
         this.vModelExpression = this.vModel || (this.$vnode.data.model ?
                                 this.$vnode.data.model.expression : '');
      },

      mounted() {
         this.setFieldWacher();

         this.Event.on(this.showOriginalValueEvent, show => this.showOriginalValue = show);
      },

      methods: {
         disable() {
            this.active = false;
         },

         enable() {
            this.active = true;
         },

         emit(value, event = 'input') {
            this.$emit(event, value)
         },

         getFieldPath(path = this.vModelExpression) {
            return this.hasFullVmodal(path) ? path.slice(this.vModelTrimStart.length, -(this.vModelTrimEnd.length)) : path;
         },

         formField(path = this.vModelExpression, field = this.form.fields) {
            if (!path) {
               return false;
            }

            this.getFieldPath(path).split('.').forEach(key => field = field[key]);
            return field;
         },

         formOriginalField(path = this.vModelExpression) {
            return this.formField(path, this.form.originalFields);
         },

         setFieldWacher() {
            if (!this.hasFullVmodal()) {
               return false;
            }

            this.$watch(this.vModelExpression, {
               handler: value => {
                  this.syncLanguageWithValue(value);
               }
            });
         },

         syncLanguageWithValue(value, field = this.form.fields, pathArr = this.getFieldPath().split('.'), set = true) {
            if (!this.formField() || !this.formField().hasOwnProperty('languages')) {
               return false;
            }

            const key = pathArr.shift();

            if (pathArr.length === 0) {
               field[key].languages[this.form.languageID] = value;
            } else {
               field[key] = this.syncLanguageWithValue(value, field[key], pathArr, false);
            }

            if (!set) {
               return field;
            }
            this.form.fields = field;
         },

         setInitialValue(value) {
            const field = this.formField();
            this.fieldValue = Helper.isEmpty(field.value) ? value : field.value;

            if (Helper.isEmpty(field.value)) {
               setDeep(this.form.fields, this.getFieldPath()+'.value', value);
               setDeep(this.form.originalFields, this.getFieldPath()+'.value', value);
            }
         },

         hasFullVmodal(path = this.vModelExpression) {
            return path.indexOf(this.vModelTrimStart) === 0;
         }
      },

      computed: {
         ...mapGetters({
				authChech: 'auth/check',
				auth: 'auth/user',
				allStores: 'stores/all',
				currentStore: 'stores/current',
				storeSettings: 'stores/settings',
         }),

         listeners() {
            return {
               ...this.$listeners,
               input: event => this.emit(event.target.value),
               change: event => this.emit(event.target.value)
            };
         },

         props() {
            return {
               type: this.type,
               name: this.name,
               id: this.id,
               class: this.getFieldCssClass,
               value: this.value,
               disabled: this.isDisabled
            };
         },

         formGroupProps() {
            return {
               type: this.type,
               name: this.name,
               id: this.id,
               label: this.label,
               inline: this.inline,
               form: this.form,
               hideDefault: this.hideDefault,
               vModel: this.getFieldPath(),
               disabled: this.isDisabled
            };
         },

         getInitialValue() {
            const field = this.formField(this.vModelExpression, this.form.originalFields);
            return field.value;
         },

         isRequired() {
            const field = this.formField();

            if (!field) {
               return false;
            }

            if (
               (field.getRules && field.getRules.required) ||
               (field.postRules && field.postRules.required) ||
               (field.putRules && field.putRules.required) ||
               (field.deleteRules && field.deleteRules.required) ||
               (field.rules && field.rules.required)
            ) {
               return true;
            }
            return false;
         },

         isDisabled() {
            return !this.active || (this.form && this.form.disabled) || (this.form && this.form.submitting) || this.disabled;
         },

         isMultiLang() {
            return typeof this.formField().languages === 'object';
         },

         getFormGroupCssClass() {
            return ['form-group', {row: this.inline}];
         },

         getFormLabelCssClass() {
            return {
               'col-md-2': this.inline,
               'col-form-label': this.inline
            };
         },

         getFieldWrapperCssClass() {
            return {
               'col-md-10': this.inline
            };
         },

         getFieldCssClass() {
            return ['form-control', this.getFieldValidationCssClass];
         },

         getCustomFieldCssClass() {
            return ['custom-control-input', this.getFieldValidationCssClass];
         },

         getFieldValidationCssClass() {
            return {
               'is-invalid': this.hasError,
               'is-valid': !this.hasError && this.form.errors.runned
            };
         },

         showOriginalSwitch() {
            const original = this.formOriginalField();
            const current = this.formField();
            const originalValue = this.isMultiLang ?
                                    original.languages[this.form.languageID] :
                                    original.value;
            const currentValue = this.isMultiLang ?
                                    current.languages[this.form.languageID] :
                                    current.value;

            return this.showOriginal &&
                   this.form.id !== 0 &&
                   !Helper.isEqual(originalValue, currentValue);
         },

         showOriginalWrapperCssClasses() {
            return [
               'custom-control',
               'custom-switch',
               {
                  showOriginalWrapperInline: !this.inline
               }
            ];
         },

         showOriginalID() {
            return 'showOriginal_'+this.id;
         },

         showOriginalLabel() {
            return this.trans('formLabels.'+(this.showOriginalValue ? 'showCurrent' : 'showOriginal'));
         },

         fieldValue: {
            get() {
               if (!this.showOriginalValue) {
                  this.enable();
                  return this.value;
               }

               this.disable();

               if (this.isMultiLang) {
                  return this.formOriginalField().languages[this.form.languageID];
               }
               return this.getInitialValue;
            },

            set(value) {
               if (!this.showOriginalValue) {
                  this.emit(value);
               }
            }
         },

         hasError() {
            return this.form.errors.has(this.getFieldPath(), (this.isMultiLang ? this.form.languageID : false));
         }
      },

      watch: {
         showOriginalValue(show) {
            this.Event.emit(this.showOriginalValueEvent, show);
         }
      }
   }
</script>
