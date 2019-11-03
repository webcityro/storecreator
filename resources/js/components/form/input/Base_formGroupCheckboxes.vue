<template>
   <sc-form-group v-bind="formGroupProps">
      <template>
         <div class="custom-control custom-checkbox" v-if="mainCheckboxLabel">
            <input
               type="checkbox"
               class="custom-control-input"
               :id="'selectAll-'+id+'-'+form.group"
               @change="toggleAll"
               :checked="masterChecked"
               :indeterminate.prop="masterIndeterminate"
               :disabled="isDisabled"
            >
            <label class="custom-control-label" :for="'selectAll-'+id+'-'+form.group">{{ mainCheckboxLabel }}</label>
         </div>
         <hr v-if="mainCheckboxLabel">
         <div class="custom-control custom-checkbox" v-for="(option, key) in options" :key="key">
            <input
               type="checkbox"
               class="custom-control-input"
               :id="key+'-'+id+'-'+form.group"
               :value="key"
               :checked="isSelected(key)"
               @change="update"
               :disabled="isDisabled"
               >
            <label class="custom-control-label" :for="key+'-'+id+'-'+form.group">{{ option }}</label>
         </div>
      </template>
      <template slot="append">
         <slot name="append"></slot>
      </template>
   </sc-form-group>
</template>

<script>
import multiSelectInput from "../base/multiSelectInput";

export default {
   mixins: [multiSelectInput],

   props: {
      mainCheckboxLabel: { type: String, required: false }
   },

   data() {
      return {
         masterChecked: false,
         masterIndeterminate: false
      };
   },

   methods: {
      update(event) {
         const value = event.target.value;

         if (this.isSelected(value)) {
            this.fieldValue = this.fieldValue.filter(opt => opt !== value);
         } else {
            this.fieldValue.push(value);
         }

         const selectedLength = this.fieldValue.length;
         const optionsLength = Object.keys(this.options).length;
         this.masterChecked = selectedLength === optionsLength;
         this.masterIndeterminate = selectedLength < optionsLength && selectedLength > 0;

         // this.emit(this.selected);
      },

      toggleAll(event) {
         if (event.target.checked) {
            for (const key in this.options) {
               if (!this.isSelected(key)) {
                  this.fieldValue.push(key);
               }
            }
            this.masterChecked = true;
            this.masterIndeterminate = false;
            this.emit(this.fieldValue);
            return;
         }
         this.masterChecked = false;
         this.masterIndeterminate = false;
      }
   }
}
</script>
