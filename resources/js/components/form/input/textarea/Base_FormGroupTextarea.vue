<template>
	<sc-form-group v-bind="formGroupProps">
		<template>
			<textarea v-on="listeners" v-bind="{...$attrs, ...props}" v-model="fieldValue"></textarea>
		</template>
		<template slot="append">
			<slot name="append"></slot>
		</template>
	</sc-form-group>
</template>

<script>
	import baseInput from "../../base/baseInput";

	export default {
		mixins: [baseInput]
	}
</script>
