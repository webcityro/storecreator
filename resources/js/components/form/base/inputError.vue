<template>
   <span class="invalid-feedback" v-if="form.errors.has(errorKey, language)">{{ form.errors.get(errorKey, language) }}</span>
</template>

<script>
   export default {
      props: {
         errorKey: { tyoe: String, required: false },
         form: { tyoe: Object, required: true },
         isMultiLang: { tyoe: Boolean, required: false, default: false }
      },

      computed: {
         language() {
            return this.isMultiLang ? this.form.languageID : false;
         }
      }
   }
</script>
