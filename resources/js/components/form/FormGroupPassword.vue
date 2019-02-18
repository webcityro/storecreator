<script>
   export default {
      props: {
         label: { required: true },
         id: { required: true },
         value: {},
         required: { type: Boolean, delault: false },
         disabled: { type: Boolean, delault: false },
         hideDefault: { type: Boolean, delault: false },
         error: { type: Object },
      },

      data() {
         return {
            type: 'password'
         };
      }
   }
</script>

<style>
   .form-check.showPassword {
      margin: -24px 10px 0 0;
      font-size: 14px;
   }
</style>

<template>
   <sc-form-group :id="id" :label="label" :error="error" :required="required" :hideDefault="hideDefault">
      <template>
         <input :type="type" :id="id" :class="error.getClass(id)" class="form-control" autocomplete="new-password" :value="value" @input="$emit('input', $event.target.value)" :disabled="disabled">
         <div class="form-check float-right mr-2 showPassword">
            <input type="checkbox" :id="'showPassword_'+id" class="form-check-input" @input="type = $event.target.checked ? 'text' : 'password'">
            <label :for="'showPassword_'+id" class="form-check-label">{{ trans('formLabels.showPassword') }}</label>
         </div>
      </template>
      <template slot="append">
         <slot name="append"></slot>
      </template>
   </sc-form-group>
</template>
