<script>
   export default {
      props: {
         label: { required: true },
         id: { required: true },
         value: {},
         options: { required: true, type: Object },
         multiple: { type: Boolean, delault: false },
         required: { type: Boolean, delault: false },
         disabled: { type: Boolean, delault: false },
         hideDefault: { type: Boolean, delault: false },
         error: { type: Object }
      }
   }
</script>

<template>
   <sc-form-group :id="id" :label="label" :error="error" :required="required" :hideDefault="hideDefault">
      <template>
         <select :id="id" :class="'custom-select '+error.getClass(id)" :multiple="multiple" :value="value" @input="$emit('input', $event.target.value)" :disabled="disabled">
            <option v-for="(option, key) in options" :value="key" :selected="key == value">{{ option }}</option>
         </select>
      </template>
      <template slot="append">
         <slot name="append"></slot>
      </template>
   </sc-form-group>
</template>
