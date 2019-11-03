<template>
  <div
   :class="['tab-pane', { show: activated, active: activated }]"
   :id="id" role="tabpanel"
   :aria-labelledby="id+'-tab'">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    active: { type: Boolean, required: false, default: false }
  },

  data() {
    return {
      form: {},
      group: '',
      activated: false,
      errors: 0
    }
  },

  mounted() {
    this.activated = this.active;
    this.form = this.$parent.form;

    this.Event.on('scChangeFormTab-'+this.form.group, id => this.activated = id == this.id);
    this.Event.on('scSetFormTabErrorsCount-'+this.form.group, errors => this.errors = errors[this.id]);
  }
}
</script>

<style>
</style>
