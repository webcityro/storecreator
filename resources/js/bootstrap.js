window.axios = require('axios');
window._ = require('lodash');
window.Vue = require('vue');

import BootstrapVue from 'bootstrap-vue';
import MainMixins from './mixins/main';
import User from './core/User';

/*try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
} catch (e) {
   console.log('bootstrap.js error', e);
}*/

window.Vue.use(BootstrapVue);
window.Vue.mixin(MainMixins);
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}


window.User = User;
window.Auth = authData ? new User(authData) : false;

window.trans = (string, args) => {
    let value = _.get(window.i18n, string);

    _.eachRight(args, (paramVal, paramKey) => {
        value = _.replace(value, `:${paramKey}`, paramVal);
    });
    return value;
};

window.Event = new class {
    constructor() {
        this.vue = new Vue();
    }

    emit(event, data = null) {
        this.vue.$emit(event, data);
    }

    on(event, callback) {
        this.vue.$on(event, callback);
    }
};

Vue.prototype.trans = window.trans;
Vue.prototype.laroute = window.laroute;
Vue.prototype.Event = window.Event;
Vue.prototype.Auth = window.Auth;

Vue.component('sc-form-wrap', require('./components/form/FormWrap.vue'));
Vue.component('sc-form-group', require('./components/form/FormGroup.vue'));
Vue.component('sc-form-group-inline', require('./components/form/FormGroupInline.vue'));
Vue.component('sc-form-group-password', require('./components/form/FormGroupPassword.vue'));
Vue.component('sc-form-group-radio', require('./components/form/FormGroupRadio.vue'));
Vue.component('sc-form-group-select', require('./components/form/FormGroupSelect.vue'));
Vue.component('sc-form-group-text', require('./components/form/FormGroupText.vue'));
Vue.component('sc-form-group-inline-password', require('./components/form/FormGroupInlinePassword.vue'));
Vue.component('sc-form-group-inline-radio', require('./components/form/FormGroupInlineRadio.vue'));
Vue.component('sc-form-group-inline-select', require('./components/form/FormGroupInlineSelect.vue'));
Vue.component('sc-form-group-inline-text', require('./components/form/FormGroupInlineText.vue'));
Vue.component('sc-page-header', require('./components/PageHeader.vue'));
Vue.component('sc-items-filter', require('./components/FilterItems.vue'));
Vue.component('sc-items-table', require('./components/displayItemsInTable.vue'));
Vue.component('sc-pagination', require('./components/pagination.vue'));


// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
