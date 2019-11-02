<template>
	<ul class="nav nav-tabs" :id="form.group+'-tabs'" role="tablist">
		<li v-for="l in languages.all" :key="l.id" class="nav-item">
			<a
				href="#"
				:class="tabLinkCssClass(l)"
				:id="l.id+'-tab'"
				@click.prevent="change(l.id)"
			>
				<img :src="'/images/flags/'+l.image" :alt="l.name" />
				{{ l.name }}
				<span v-if="hasErrors(l)">
					({{ form.errors.getLanguageErrorsCount(l.id) }})
				</span>
			</a>
		</li>
	</ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	store,

	props: {
		form: { tyoe: Object, required: true }
	},

	data() {
		return {
			lang: 0,
		};
	},

	mounted() {
		this.change(this.value || this.storeSettings('system.languageID'));
	},

	methods: {
		change(id) {
			this.form.setLanguage(id);
		}
	},

	computed: {
		...mapGetters({
			storeSettings: 'stores/settings',
		}),

		hasErrors() {
			return language => this.form.errors.getLanguageErrorsCount(language.id) > 0;
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
