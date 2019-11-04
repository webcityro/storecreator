<template>
   <sc-form-group v-bind="formGroupProps">
      <b-form-checkbox-group v-model="fieldValue" :name="id" :options="stores" :disabled="stores.length == 1 || isDisabled" />
      <template slot="append">
         <slot name="append"></slot>
      </template>
   </sc-form-group>
</template>

<script>
   import baseInput from "../base/baseInput";

   export default {
      mixins: [baseInput],

      data() {
         return {
            storeIDs: [],
            stores: []
         };
      },

      mounted() {
         var stores = this.auth.hasRole('owner') ? this.allStores : this.auth.stores;

         for (let store of stores) {
            this.stores.push({ text: store.name, value: store.id });
         }

         this.setInitialValue([this.currentStore.id]);
      }
   }
</script>

