import { mapActions, mapGetters } from 'vuex';

window.storesVM = new Vue({
    store,

    el: '#storesApp',

    data: {
        store: null,
        storeForm: new Form({
            fields: {
                store: {
                    tab: 'store',
                    name: {
                        label: trans('formLabels.name'),
                        rules: {
                            required: true,
                            lengthRange: [3, 191]
                        },
                        postRules: {
                            email: true
                        },
                        value: ''
                    },
                    url: {
                        label: trans('formLabels.url'),
                        rules: {
                            required: true,
                            maxLength: 191
                        },
                        value: ''
                    },
                    apiPublic: {
                        label: trans('formLabels.apiPublic'),
                        rules: {
                            required: true,
                            length: 32
                        },
                        value: ''
                    },
                    apiSecret: {
                        label: trans('formLabels.apiSecret'),
                        rules: {
                            required: true,
                            length: 32
                        },
                        value: ''
                    }
                },

                settings: {
                    system: {
                        tab: 'system',
                        languageID: {
                            label: trans('formLabels.language'),
                            rules: {
                                required: true
                            },
                            value: 0
                        },
                        itemsPerPage: {
                            label: trans('formLabels.itemsPerPage'),
                            rules: {
                                required: true,
                                numeric: true
                            },
                            value: ''
                        }
                    },
                    email: {
                        tab: 'email',
                        reply: {
                            label: trans('formLabels.reply'),
                            rules: {
                                required: true,
                                email: true
                            },
                            value: ''
                        },
                        noreply: {
                            label: trans('formLabels.noreply'),
                            rules: {
                                required: true,
                                email: true
                            },
                            value: ''
                        }
                    }
                }
            },
            group: 'store'
        }),
        formSavedState: null,
        deleteForm: new Form({
            fields: {
                action: {
                    rules: {
                        required: true
                    },
                    messages: {
                        required: trans('store.noDeleteActionSelected')
                    },
                    value: ''
                },
                password: {
                    label: trans('formLabels.yourPassword'),
                    rules: {
                        required: true,
                        minLength: 6
                    },
                    messages: {
                        required: trans('store.noDeletePassword')
                    },
                    value: ''
                }
            },
            group: 'deleteStore'
        })
    },

    mounted() {
        this.storeForm.fields.settings.system.languageID.value = this.storeForm.originalFields.settings.system.languageID.value = this.storeSettings(
            'system.languageID'
        );
        this.storeForm.modal = this.$refs.storeFormModal;
        // this.formSavedState = formSavedState(this.storeForm);
    },

    methods: {
        ...mapActions({
            addStore: 'stores/set',
            updateStore: 'stores/update',
            removeStore: 'stores/delete',
            setActiveStore: 'stores/setActive'
        }),

        add() {
            this.storeForm
                .post('stores.store')
                .then(({ store }) => {
                    this.addStore(JSON.parse(store));
                    this.cancel();
                })
                .catch(data => {
                    if (data && data.store) {
                        this.addStore(JSON.parse(data.store));
                    }
                });
        },

        update() {
            this.storeForm
                .put(['stores.update', { store: this.store.id }])
                .then(({ store }) => {
                    this.updateStore(JSON.parse(store));
                    this.cancel();
                });
        },

        edit(store) {
            this.setStore(store);

            this.storeForm.set({
                'store.name': this.store.name,
                'store.url': this.store.url,
                'store.apiPublic': this.store.apiPublic,
                'store.apiSecret': this.store.apiSecret,
                'settings.system.languageID': this.storeSettings(
                    'system.languageID',
                    store.id
                ),
                'settings.system.itemsPerPage': this.storeSettings(
                    'system.itemsPerPage',
                    store.id
                ),
                'settings.email.reply': this.storeSettings(
                    'email.reply',
                    store.id
                ),
                'settings.email.noreply': this.storeSettings(
                    'email.noreply',
                    store.id
                )
            });

            this.showFormModal(this.storeForm.group);
        },

        setStore(store) {
            this.store = store;
        },

        deleteStore() {
            this.deleteForm
                .delete(['stores.destroy', { store: this.store.id }])
                .then(data => {
                    this.removeStore(this.store.id);
                    this.cancelDelete();
                })
                .catch(({ errors }) => {
                    if (typeof errors === 'string') {
                        this.cancelDelete();
                    }
                });
        },

        cancel() {
            this.storeIndex = null;
            this.store = null;
            this.storeForm.reset();
            this.hideFormModal(this.storeForm.group);
        },

        cancelDelete() {
            this.storeIndex = null;
            this.store = null;
            this.deleteForm.reset();
            this.hideFormModal('storeDeleteModal');
        }
    },

    computed: {
        ...mapGetters({
            authChech: 'auth/check',
            auth: 'auth/user',
            allStores: 'stores/all',
            currentStore: 'stores/current',
            storeSettings: 'stores/settings'
        }),

        formTitle() {
            return this.store === null
                ? trans('store.addFormTitle')
                : trans('store.editFormTitle', { name: this.store.name });
        },

        deleteFormTitle() {
            return this.store === null
                ? ''
                : trans('store.deleteFormTitle', { name: this.store.name });
        }
    }
});
