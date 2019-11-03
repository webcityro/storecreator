<template>
	<div class="container">
		<div class="card card-default">
			<div class="card-header">
				<h3 class="card-title">
					<slot name="title">
						<i v-if="icon" :class="icon"></i>&nbsp;&nbsp;{{ title }}
					</slot>
				</h3>
			</div>
			<div class="card-body">
				<sc-form-languages-tabs :form="form" v-if="form.multiLangs"></sc-form-languages-tabs>
				<slot :form="form"></slot>
			</div>
			<div class="card-footer">
				<slot name="footer">
					<button type="button" :class="saveButtonClasses" @click.prevent="$emit('submit')" :disabled="form.submitting">
					<i :class="saveIconClasses"></i> {{ saveButtonLabel }}
				</button>
				<button type="button" :class="cancelButtonClasses" @click.prevent="$emit('cancel')">
					<i :class="cancelIconClass"></i> {{ cancelButtonLabel }}
				</button>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
	import baseWrapper from "./base/baseWrapper";

	export default {
		mixins: [baseWrapper]
	}
</script>
