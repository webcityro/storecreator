<template>
	<b-modal :id="id" :ref="id" no-close-on-esc no-close-on-backdrop hide-header-close centered>
		<span slot="modal-header">
			<slot name="modal-header">
				<i v-if="icon" :class="icon"></i>&nbsp;&nbsp;{{ title }}
			</slot>
		</span>
		<sc-form-languages-tabs :form="form" v-if="form.multiLangs"></sc-form-languages-tabs>
		<slot :form="form"></slot>
		<template slot="modal-footer">
			<slot name="modal-footer">
				<button type="button" :class="saveButtonClasses" @click.prevent="$emit('submit')" :disabled="form.submitting">
                  <i :class="saveIconClasses"></i> {{ saveButtonLabel }}
               </button>
               <button type="button" :class="cancelButtonClasses" @click.prevent="$emit('cancel')">
                  <i :class="cancelIconClass"></i> {{ cancelButtonLabel }}
               </button>
			</slot>
		</template>
	</b-modal>
</template>

<script>
	import baseWrapper from "./base/baseWrapper";

	export default {
		mixins: [baseWrapper],

		created() {
			console.log('listining on scFormModal'+this.form.group);
			Event.on('scFormModal'+this.form.group, show => {
				console.log('scFormModal'+this.form.group);

				this.$refs[this.id][show ? 'show' : 'hide']()
			});
		}
	}
</script>
