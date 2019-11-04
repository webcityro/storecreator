import User from '../../core/User';

const namespaced = true;

const state = {
   auth: {
      check: false,
      user: null
   }
};

const getters = {
   check: state => state.auth.check,
   user: state => state.auth.user
};

const actions = {
   init({ commit }) {
      commit('set', window.authData);
   }
};

const mutations = {
   set(state, auth) {
      state.auth.check = auth !== false;
      state.auth.user = new User(auth);
   },
   changeActiveStore(state, id) {
      state.auth.user.data.storeID = id;
   }
};

export default { namespaced, state, getters, actions, mutations }