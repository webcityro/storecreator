<template>
   <sc-form-group v-bind="formGroupProps" :showOriginal="false">
      <template>
         <input
            v-bind="{...$attrs, ...props}"
            v-on="listeners"
            :type="inputType"
            autocomplete="new-password"
         >
         <div class="form-check float-right mr-2 showPassword">
            <input
               type="checkbox"
               :id="'showPassword_'+id"
               class="form-check-input"
               @input="inputType = $event.target.checked ? 'text' : 'password'" :disabled="isDisabled"
            >
            <label :for="'showPassword_'+id" class="form-check-label">
               {{ trans('formLabels.showPassword') }}
            </label>
         </div>
      </template>
      <template slot="append">
         <slot name="append"></slot>
      </template>
   </sc-form-group>
</template>

<style scoped>
   .form-check.showPassword {
      margin: -24px 10px 0 0;
      font-size: 14px;
   }
</style>

<script>
   import baseInput from "../base/baseInput";

   export default {
      mixins: [baseInput],

      data() {
         return {
            inputType: 'password'
         };
      }
   }
</script>
