const namespaced = true;

const state = {
   savedStates: [],
   untitledCount: 1
};

const getters = {
   all: state => state.savedStates,
   new: state => state.savedStates.filter(state => state.itemID === 0),
   edit: state => state.savedStates.filter(state => state.itemID > 0),
   getName: (state, { commit }) => id => {
      let s = state.savedStates.find(s => s.id == id);
      let name = s.data;

      for (let i of s.nameField.split('.')) {
         name = name[i];
      }

      if (name) { return name; }

      name = trans('generic.new')+' '+state.untitledCount;
      commit('incrementUntitled');
      return name;
   },
   current: state => state.savedStates.find(s => s.current) || false
};

const actions = {
   init: ({ commit }) => {
      if (window.saveStates) {
         commit('set', window.saveStates);
      }
   },

   setActive: async ({commit}, {id, status = true}) => {
      console.log('setActive', id, status);
      try {
         const { response } = await axios.post(laroute.route('ajax.saveState.setCurrent', {savedState: id}), {status});
         commit('setActive', { id, status });
      } catch (error) {
         flashMessage('error', error.response.data.errors);
      }
   },

   cancelActive: ({getters, dispatch}) => {
      dispatch('setActive', {id: getters.current.id, status: false});
   },

   save({commit, getters}, form) {
      const currentState = getters['current'];

      axios.post(laroute.route('ajax.saveState.save', currentState ? {id: currentState.id} : false), {
         itemID: form.id,
         languageID: form.languageID,
         type: form.type,
         nameField: form.nameField,
         data: form.data()
      }).then(({data}) => {
         data.data.data = JSON.parse(data.data.data);
      }).catch((error) => {
         flashMessage('error', error.response.data.errors);
      });
   }
};

const mutations = {
   set: (state, savedStates) => {
      savedStates.map(state => {
         state.data = JSON.parse(state.data);
         return state;
      });
      state.savedStates = savedStates
   },
   incrementUntitled: state => state.untitledCount++,
   update: (state, newSavedState) => {
      const index = state.savedStates.findIndex(s => s.current);
      if (index > -1) {
         state.savedStates[index] = newSavedState;
      } else {
         state.savedStates.push(newSavedState);
      }
   },
   setActive: (state, {id, status}) => {
      const index = state.savedStates.findIndex(s => s.id === id);
      if (index > -1) {
         state.savedStates[index].current = status;
      }
   }
};

export default { namespaced, state, getters, actions, mutations }