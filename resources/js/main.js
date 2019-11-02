require('./core/flashMessage');
import SavedStateDropdown from './components/savedStateDropdown.vue';
import SideNavigation from './components/sideNavigation.vue';
import { mapActions, mapGetters } from 'vuex';

let expendSideNavbar = true;

window.appHeader = new Vue({
   el: '#appHeader',
   store,

   data: {
      expendSideNavbar
   },

   created() {
      this.initAuth();
      this.initStores();
      this.initSavedState();
   },

   methods: {
      ...mapActions({
         initAuth: 'auth/init',
         initSavedState: 'savedState/init',
         initStores: 'stores/init',
      })
   },

   watch: {
      expendSideNavbar() {
         if (!this.authCheck) {return;}
         window.appNavbar.expendSideNavbar = this.expendSideNavbar;
      }
   },

   components: {
      scSavedStateDropdown: SavedStateDropdown
   },

   computed: {
      ...mapGetters({
         authCheck: 'auth/check',
         auth: 'auth/user',
         allStores: 'stores/all',
         currentStore: 'stores/current'
      })
   }
});

if (store.getters['auth/check']) {
   window.appNavbar = new Vue({
      el: '#column-left',

      data: {
         expendSideNavbar
      },

      components: {
         scSideNavigation: SideNavigation
      },

      mounted() {

      }
   });
}