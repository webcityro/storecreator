<script>
   import inputError from "./inputError";
   import scFormLanguagesTabs from "./formLanguagesTabs";

	export default {
      components: {
         inputError,
         scFormLanguagesTabs
      },

		props: {
			title: { type: String, required: false },
         form: { type: Object, required: true },
         id: { type: String, required: true },
			icon: { type: String, required: false, default: '' },
			saveIconClass: { type: String, required: false, default: 'fa fa-save' },
			saveIconLoadingClass: { type: String, required: false, default: 'fas fa-spinner' },
			saveButtonType: { type: String, required: false, default: 'primary' },
			saveButtonLabel: { type: String, required: false, default: trans('generic.save') },
			cancelButtonType: { type: String, required: false, default: 'default' },
			cancelIconClass: { type: String, required: false, default: 'fa fa-reply' },
			cancelButtonLabel: { type: String, required: false, default: trans('generic.cancel') }
      },

		computed: {
			saveIconClasses() {
				return this.form.submitting ? this.saveIconLoadingClass : this.saveIconClass;
			},

			saveButtonClasses() {
				return `btn btn-${this.saveButtonType}`;
			},

			cancelButtonClasses() {
				return `btn btn-${this.cancelButtonType}`;
			}
		}
	}
</script>
