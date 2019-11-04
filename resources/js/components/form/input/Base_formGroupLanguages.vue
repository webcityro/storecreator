<template>
    <sc-form-group-select
      v-bind="formGroupProps"
      v-model="fieldValue"
      :options="langs"
    ></sc-form-group-select>
</template>

<script>
import baseInput from "../base/baseInput";

export default {
   mixins: [baseInput],

   data() {
      return {
         lang: 0,
         langs: {}
      };
   },

   mounted() {
      this.languages.all.forEach((l, i) => {
         this.langs[l.id] = l.name;
      });
      this.setInitialValue(this.value || this.storeSettings('system.languageID'));
   }/* ,

   methods: {
      setValue(value) {
         this.lang = value;
         this.emit(value);
      }
   },

   watch: {
      value() {
         this.setValue(this.value);
      },

      lang(lang) {
         this.emit(lang);
      }
   } */
}
</script>
