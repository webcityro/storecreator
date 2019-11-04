<template>
	<sc-form-group-select v-bind="formGroupProps" :options="optionsList" v-model="fieldValue"></sc-form-group-select>
</template>

<script>
import baseInput from "../base/baseInput";
import Helper from "../../../core/helpers/Helper";

export default {
	mixins: [baseInput],

	props: {
		defaultOption: { type: Object, required: false },
		dependsOn: { type: [String, Object], required: false },
		selectFirst: { type: Boolean, required: false, default: true },
		lastRequest: { type: [String, Boolean], required: false, default: false }
	},

	data() {
		return {
			selected: '',
			optionsList: {}
		};
	},

	mounted() {
		if (!this.dependsOn) {
			this.optionsList = this.getOptionsWithDefault();
		} else if (typeof this.dependsOn === 'string') {
			this.setWatcher(this.dependsOn);
		} else if (typeof this.dependsOn === 'object') {
			for (const key in this.dependsOn) {
				this.setWatcher(this.dependsOn[key]);
			}
		}

		this.setInitialValue(!Helper.isEmpty(this.value) ?
						this.value :
						(this.selectFirst ? Object.keys(this.optionsList)[0] : ''));
	},

	methods: {
		setWatcher(key) {
			this.$watch(
				'form.fields.'+key+'.value',
				this.dependencyChanged.bind(this),
				{ immediate: true }
			);
		},

		dependencyChanged(value) {
			if (!this.dependsOn || (this.isAjax() && !this.validateAjaxFields(this.getAjaxFields))) {
				this.optionsList = this.getOptionsWithDefault();
				return;
			}

			if (this.isAjax()) {
				this.getOptionsFromAjax();
				return;
			}

			this.optionsList = this.getOptionsWithDefault(value ? this.options[value] : {});
			this.setInitialValue(!Helper.isEmpty(this.optionsList) ? Object.keys(this.optionsList)[0] : '');
		},

		getOptionsWithDefault(options = this.options) {
			return { ...this.getDefaultOption, ...(typeof options === 'string' ? this.optionsList : options) };
		},

		async getOptionsFromAjax() {
			const options = await this.makeAjaxRequest(
				this.options+'?'+this.getAjaxParam,
				'Error: Form dependable select fetching options with ajax:'
			);

			if (options) {
				this.optionsList = this.getOptionsWithDefault(options);
				this.setInitialValue(Object.keys(this.optionsList)[0]);
			}
		},

		async makeLastAjaxRequest() {
			if (!this.validateAjaxFields({ ...this.getAjaxFields, [this.id]: this.fieldValue})) {
				return false;
			}

			const options = await this.makeAjaxRequest(
				this.lastRequest+'?'+this.getAjaxParam+'&'+this.id+'='+this.fieldValue,
				'Error: Form dependable select fetching from last ajax request:'
			);

			this.$emit('ajax', options);
		},

		async makeAjaxRequest(url, errorMsg) {
			try {
				const { data } = await axios.get(url);
				return data
			} catch (error) {
				console.error(
					errorMsg,
					{
						fieldID: this.id,
						formGroup: this.form.group,
						ajaxURL: url,
						ajaxFields: this.getAjaxFields,
						error
					}
				);
				return false;
			}
		},

		isAjax() {
			return typeof this.options === 'string' && Helper.isObject(this.dependsOn);
		},

		validateAjaxFields(fields) {
			let passed = true;

			for (const field in fields) {
				if (Helper.isEmpty(field) || Helper.isEmpty(fields[field])) {
					passed = false;
					break;
				}
			}
			return passed;
		}
	},

	watch: {
		fieldValue(value) {
			this.setInitialValue(value);

			if (value === this.value) {
				return;
			}

			// this.emit(selected);

			if (this.lastRequest) {
				this.makeLastAjaxRequest();
			}
		},

		value(value) {
			// this.fieldValue = value;
		}
	},

	computed: {
		getDefaultOption() {
			return this.defaultOption ? { [this.defaultOption.key]: this.defaultOption.value } : {};
		},

		getAjaxFields() {
			const fields = {};

			for (const key in this.dependsOn) {
				fields[key] = this.formField(this.dependsOn[key]).value;
			}
			return fields;
		},

		getAjaxParam() {
			return Object.keys(this.getAjaxFields).map(key => key+'='+this.getAjaxFields[key]).join('&');
		}
	}
}
</script>

<style>
</style>
