<template>
  <div>
    <ul class="nav nav-tabs" :id="form.group+'-tabs'" role="tablist">
      <li v-for="tab in tabs" :key="tab.id" class="nav-item">
        <a
           href="#"
          :class="tabLinkCssClass(tab)"
          :id="tab.id+'-tab'"
          @click.prevent="Event.emit('scChangeFormTab-'+form.group, tab.id)"
        >{{ tab.title }} <span v-if="hasErrors(tab)">({{ form.errors.getTabErrorsCount(tab.id) }})</span></a>
      </li>
    </ul>
    <div class="tab-content" :id="form.group+'TabsContent'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: { type: Object, required: true }
  },

   data() {
      return {
         tabs: []
      };
   },

   mounted() {
      this.tabs = this.$children;
      this.reset();
      console.log('scFormReset-'+this.form.group);

      Event.on('scFormReset-'+this.form.group, e => {
        console.log('reset event');

        this.reset();
      });
   },

   methods: {
     reset() {
       console.log('reset');

       this.tabs.map(tab => tab.activated = false);
       this.tabs[0].activated = true;
     }
   },

   computed: {
      hasErrors() {
         return tab => this.form.errors.getTabErrorsCount(tab.id) > 0;
      },

      tabLinkCssClass() {
        return tab => [
          'nav-link',
          {
            active: tab.activated,
            'text-danger': this.hasErrors(tab)
          }
        ];
      }
   }
}
</script>

<style>
</style>
