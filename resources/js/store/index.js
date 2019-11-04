import Vuex from 'vuex';
import Vue from 'vue';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    modules
});

const actionsToDispatch = [];

for (const action of actionsToDispatch) {
    store.dispatch(action);
}

export default store;
