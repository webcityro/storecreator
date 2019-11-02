window.axios = require('axios');
window._ = require('lodash');
window.Vue = require('vue');

import store from './store';
import BootstrapVue from 'bootstrap-vue';
import MainMixins from './mixins/main';
import Settings from './core/Settings';

window.Vue.use(BootstrapVue);
window.Vue.mixin(MainMixins);
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error(
        'CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token'
    );
}

window.store = store;
// window.User = User;
// window.Settings = Settings;
// window.Auth = authData ? new User(authData) : false;
// window.store = authData ? window.stores.filter(store => store.id == Auth.data.storeID)[0] : stores[0];
// window.store.settings = new Settings(store.settings);

window.languages.getByID = id =>
    window.languages.all.filter(lang => lang.id == id)[0];

window.trans = (string, args) => {
    let value = _.get(window.i18n, string);

    _.eachRight(args, (paramVal, paramKey) => {
        value = _.replace(value, `:${paramKey}`, paramVal);
    });
    return value;
};

window.deep = (obj, path) => {
    let current = obj;

    path.split('.').forEach(key => (current = current[key]));
    return current;
};

window.Event = new (class {
    constructor() {
        this.vue = new Vue();
    }

    emit(event, data = null) {
        this.vue.$emit(event, data);
    }

    on(event, callback) {
        this.vue.$on(event, callback);
    }
})();

Vue.prototype.languages = window.languages;
Vue.prototype.trans = window.trans;
Vue.prototype.laroute = window.laroute;
Vue.prototype.Event = window.Event;
// Vue.prototype.Auth = window.Auth;
// Vue.prototype.store = window.store;
// Vue.prototype.Settings = window.Settings;

Vue.component(
    'scFormWrapModal',
    require('./components/form/FormWrapModal.vue').default
);
Vue.component(
    'scFormWrapPanel',
    require('./components/form/FormWrapPanel.vue').default
);
Vue.component('scFormTabs', require('./components/form/FormTabs.vue').default);
Vue.component('scFormTab', require('./components/form/FormTab.vue').default);
Vue.component(
    'scFormGroup',
    require('./components/form/input/FormGroup.vue').default
);
Vue.component(
    'scFormGroupPassword',
    require('./components/form/input/FormGroupPassword.vue').default
);
Vue.component(
    'scFormGroupRadio',
    require('./components/form/input/FormGroupRadio.vue').default
);
Vue.component(
    'scFormGroupCheckboxes',
    require('./components/form/input/formGroupCheckboxes.vue').default
);
Vue.component(
    'scFormGroupSelect',
    require('./components/form/input/FormGroupSelect.vue').default
);
Vue.component(
    'scFormGroupDependableSelect',
    require('./components/form/input/formGroupDependanleSelect.vue').default
);
Vue.component(
    'scFormGroupTextarea',
    require('./components/form/input/textarea/FormGroupTextarea.vue').default
);
Vue.component(
    'scFormGroupEditor',
    require('./components/form/input/textarea/FormGroupEditor.vue').default
);
Vue.component(
    'scFormGroupStores',
    require('./components/form/input/FormGroupStores.vue').default
);
Vue.component(
    'scFormGroupLanguages',
    require('./components/form/input/formGroupLanguages.vue').default
);
Vue.component('scPageHeader', require('./components/PageHeader.vue').default);
Vue.component('scItemsFilter', require('./components/FilterItems.vue').default);
Vue.component(
    'scItemsTable',
    require('./components/displayItemsInTable.vue').default
);
Vue.component('scPagination', require('./components/pagination.vue').default);

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
