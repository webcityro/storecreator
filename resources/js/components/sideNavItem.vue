<template>
   <li>
      <a class="parent" :href="url" @click="show = !show">
         <i v-if="icon" :class="icon"></i>
         <span>{{ label }}</span>
      </a>
      <ul v-show="!extended || show">
         <slot></slot>
      </ul>
   </li>
</template>

<script>
   export default {
      props: {
         label: { requred: true, type: String },
         icon: { type: String },
         url: { default: false },
         extended: { default: false, type: Boolean }
      },

      data() {
         return {
            show: false
         };
      },

      methods: {
      },

      mounted() {

      }
   }
</script>
