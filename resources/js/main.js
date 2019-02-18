require('./core/flashMessage');
import SideNavigation from './components/sideNavigation.vue';

let expendSideNavbar = true;

window.appHeader = new Vue({
   el: '#appHeader',

   data: {
      expendSideNavbar
   },

   watch: {
      expendSideNavbar() {
         if (!Auth) {return;}
         window.appNavbar.expendSideNavbar = this.expendSideNavbar;
      }
   }
});

if (Auth) {
   window.appNavbar = new Vue({
      el: '#column-left',

      data: {
         expendSideNavbar
      },

      components: {
         'sc-side-navigation': SideNavigation
      },

      mounted() {

      }
   });
}