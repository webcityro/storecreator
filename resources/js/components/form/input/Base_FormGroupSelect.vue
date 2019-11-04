<template>
   <sc-form-group v-bind="formGroupProps">
      <template>
         <select
            v-on="listeners"
            v-bind="{...$attrs, ...props}"
            :class="getSelectInputCssClass"
            :multiple="multiple"
            >
            <option v-for="(option, key) in options" :key="key" :value="key" :selected="key == fieldValue">{{ option }}</option>
         </select>
      </template>
      <template slot="append">
         <slot name="append"></slot>
      </template>
   </sc-form-group>
</template>

<script>
   import baseInput from "../base/baseInput";

   export default {
      mixins: [baseInput],

      props: {
         multiple: { type: Boolean, default: false, required: false }
      },

      computed: {
         getSelectInputCssClass() {
            return [
               'custom-select',
               {...this.getFieldValidationCssClass}
            ];
         }
      }
   }
</script>
