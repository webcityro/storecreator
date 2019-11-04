window.axios = require('axios');
window._ = require('lodash');
window.Vue = require('vue');

import store from './store';
import BootstrapVue from 'bootstrap-vue';
import MainMixins from './mixins/main';

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

window.languages.getByID = id =>
    window.languages.all.filter(lang => lang.id == id)[0];

window.trans = (string, args) => {
    let value = _.get(window.i18n, string);

    _.eachRight(args, (paramVal, paramKey) => {
        value = _.replace(value, `:${paramKey}`, paramVal);
    });
    return value;
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

const requireComponents = require.context(
    './components',
    true,
    /Base_[\w-]+\.vue$/
);

requireComponents.keys().forEach(fileName => {
    const componentConfig = requireComponents(fileName);
    const componentName = `sc${_.upperFirst(
        fileName.split('Base_')[1].replace(/\.\w+$/, '')
    )}`;

    Vue.component(componentName, componentConfig.default || componentConfig);
    console.log({ componentName });
});

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
