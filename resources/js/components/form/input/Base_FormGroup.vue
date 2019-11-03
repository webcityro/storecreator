<template>
   <div :class="getFormGroupCssClass">
      <label :for="id" :class="getFormLabelCssClass">
         {{ label }}
         <span class="form-required-field" v-if="isRequired">*</span>
         <div v-if="showOriginalSwitch" :class="showOriginalWrapperCssClasses">
            <input
               type="checkbox"
               class="custom-control-input"
               :id="showOriginalID"
               v-model="showOriginalValue"
            >
            <label
               class="custom-control-label"
               :for="showOriginalID"
            >
               {{ showOriginalLabel }}
            </label>
         </div>
      </label>
      <div :class="getFieldWrapperCssClass">
         <slot v-if="!hideDefault">
            <input
               v-on="listeners"
               v-bind="props"
               v-model="fieldValue"
            >
         </slot>
      </div>
      <slot name="append"></slot>
      <input-error :form="form" :errorKey="getFieldPath()" :isMultiLang="isMultiLang"></input-error>
   </div>
</template>

<script>
   import baseInput from "../base/baseInput";

   export default {
      mixins: [baseInput]
   }
</script>


<style scoped>
   .form-required-field {
      color: var(--red);
   }

   .invalid-feedback {
      display: block;
   }

   .form-control.is-invalid {
      background-position: top calc(0.4em + 0.1875rem) right calc(0.4em + 0.1875rem);
   }

   .showOriginalWrapperInline {
      display: inline-block;
   }
</style>
