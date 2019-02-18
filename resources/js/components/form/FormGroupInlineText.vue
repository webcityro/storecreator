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

<template>
   <sc-form-group-inline :id="id" :label="label" :error="error" :required="required" :hideDefault="hideDefault">
      <template>
         <textarea :id="id" :class="error.getClass(id)" class="form-control" @input="$emit('input', $event.target.value)" :disabled="disabled">{{ value }}</textarea>
      </template>
      <template slot="append">
         <slot name="append"></slot>
      </template>
   </sc-form-group-inline>
</template>
