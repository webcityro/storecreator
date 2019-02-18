<script>
   export default {
      props: {
         label: { required: true },
         id: { required: true },
         value: {},
         options: { required: true, type: Object },
         inline: { type: Boolean, delault: false },
         required: { type: Boolean, delault: false },
         disabled: { type: Boolean, delault: false },
         hideDefault: { type: Boolean, delault: false },
         error: { type: Object }
      }
   }
</script>

<template>
   <sc-form-group-inline :id="id" :label="label" :error="error" :required="required" :hideDefault="hideDefault">
      <template>
         <div :class="'custom-control custom-radio' + (inline ? ' custom-control-inline' : '')" v-for="(option, key) in options">
            <input type="radio" :name="id" :value="key" :checked="value == key" @input="$emit('input', $event.target.value)" :id="id+'_'+key" :class="error.getClass(id)" class="custom-control-input" :disabled="disabled">
            <label class="custom-control-label" :for="id+'_'+key">{{option}}</label>
         </div>
      </template>
      <template slot="append">
         <slot name="append"></slot>
      </template>
   </sc-form-group-inline>
</template>
