const namespaced = true;

const state = {
   stores: []
};

const getters = {
   all: (state0) => state.stores,
   current: (state, getters, rootState, rootGetters) => rootGetters['auth/check'] ? state.stores.find(s => s.id === rootGetters['auth/user'].data.storeID) : state.stores[0],
   settings: (state, getters) => (path, id = false) => {
      const pathArr = path.split('.');
      const store = id ? state.stores.find(s => s.id === id) : getters['current'];
      const setting = store.settings.find(s => s.code === pathArr[0] && s.key === pathArr[1]);
      return !setting ? '' : (setting.serialize ? JSON.parse(setting.value) : setting.value);
   }
};

const actions = {
   async init ({dispatch, commit, getters, rootGetters}) {
      if (!rootGetters['auth/check']) {
         const { data } = await axios.get(laroute.route('ajax.stores.getFirst'));
         commit('setAll', [data]);
      } else {
         commit('setAll', rootGetters['auth/user'].stores);
      }
   },
   set ({commit}, store) {
      console.log('actions setStore', store);
      commit('setStore', store);
   },
   update ({commit}, store) {
      commit('updateStore', store);
   },
   delete ({commit}, id) {
      commit('deleteStore', id);
   },
   setActive ({commit}, id) {
      axios.put(laroute.route('stores.activate', {store: id}))
         .then(({data}) => {
            commit('auth/changeActiveStore', id, {root: true});
         }).catch(error => console.log('set active error', error));
   }
};

const mutations = {
   setAll(state, stores) {
      state.stores = stores;
   },
   setStore(state, store) {
      console.log('mutations setStore', store);
      state.stores.push(store);
   },
   updateStore(state, store) {
      const index = state.stores.findIndex(s => s.id === store.id);
      state.stores[index] = store;
   },
   deleteStore(state, id) {
      state.stores = state.stores.filter(store => store.id !== id);
   }
};

export default { namespaced, state, getters, actions, mutations }