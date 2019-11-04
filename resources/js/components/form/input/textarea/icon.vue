<template>
	<div class="icon" :class="[`icon--${name}`, `icon--${size}`, { 'has-align-fix': fixAlign }]">
		<img :src="imgSRC" :alt="name">
	</div>
</template>

<script>
export default {
	props: {
		name: { type: String, required: true },
		img: { type: String, required: true },
		size: {	type: String, required: false, default: 'normal' },
		modifier: {	type: String, required: false,	default: null },
		fixAlign: {	type: Boolean, required: false,	default: true },
	},

	computed: {
		imgSRC() {
			return `/images/editor_icons/${this.img}.svg`;
		}
	}
}
</script>

<style lang="scss" scoped>
	.icon {
	position: relative;
	display: inline-block;
	vertical-align: middle;
	width: 0.8rem;
	height: 0.8rem;
	margin: 0 .3rem;
	top: -.05rem;
	fill: currentColor;

		&:first-child {
			margin-left: 0;
		}
		&:last-child {
			margin-right: 0;
		}
	}
</style>
