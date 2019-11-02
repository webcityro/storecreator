import Vuex from 'vuex';
import Vue from 'vue';
import savedState from './modules/savedState';
import auth from './modules/auth';
import stores from './modules/stores';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      savedState,
      auth,
      stores
   }
});