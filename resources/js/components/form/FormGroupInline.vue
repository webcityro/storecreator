<script>
   export default {
      props: {
         label: { required: true },
         id: { required: true },
         type: { default: 'text' },
         value: {},
         error: { type: Object },
         hideDefault: { type: Boolean, delault: false },
         required: { type: Boolean, delault: false },
         disabled: { type: Boolean, delault: false }
      }
   }
</script>

<style>
   .form-required-field {
      color: var(--red);
   }
</style>

<template>
   <div class="form-group row">
      <label :for="id" class="col-md-2 text-right">{{ label }} <span class="form-required-field" v-if="required">*</span></label>
      <div class="col-md-10">
         <slot v-if="!hideDefault">
            <input :type="type" :name="id" :id="id" :class="error.getClass(id)" class="form-control" :value="value" @input="$emit('input', $event.target.value)" :disabled="disabled">
         </slot>
         <slot name="append"></slot>
         <span class="invalid-feedback" v-if="error.has(id)">{{ error.get(id) }}</span>
      </div>
   </div>
</template>
