<template>
   <sc-form-group v-bind="formGroupProps">
      <template>
         <div
            :class="gerRadioInputWrapperCssClass"
            v-for="(option, key) in options"
            :key="key"
         >
            <input
               v-on="listeners"
               v-bind="{...$attrs, ...props}"
               type="radio"
               :name="id"
               :value="key"
               :checked="fieldValue == key"
               :id="id+'_'+key"
               :class="getCustomFieldCssClass"
            >
            <label class="custom-control-label" :for="id+'_'+key">{{option}}</label>
         </div>
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

      computed: {
         gerRadioInputWrapperCssClass() {
            return [
               'custom-control',
               'custom-radio',
               {
                  'custom-control-inline': this.inline
               }
            ];
         }
      }
   };
</script>

