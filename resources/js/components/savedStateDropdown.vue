<template>
   <div>
      <b-nav-item-dropdown right class="navbar-item right ss_items" v-if="(type === 'new' ? newSavedStates : editSavedStates).length && false">
         <template slot="button-content">
            <i :class="icon+' ss_icon'"></i>
         </template>
         <div class="dropdown-item" v-for="(item, key) in (type === 'new' ? newSavedStates : editSavedStates)" :key="key">
            <a class="ss_itemLink" @click.prevent="setActive({id: item.id, status: true})">{{ getName(item.id) }}</a>
            <a class="ss_delete" @click.prevent="deleteState(item.id)"><i class="fas fa-trash"></i></a>
         </div>
      </b-nav-item-dropdown>

      <b-modal id="savedStateCancelModal" ref="savedStateCancelModal" :title="trans('generic.warning')" no-close-on-esc no-close-on-backdrop centered>
         <b-container>
            <p class="lead">{{ canselFormMsg }}</p>
         </b-container>
         <template slot="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="cancelCurrent">
               {{ trans('generic.yes') }}
            </button>
            <button type="button" class="btn btn-primary" @click.prevent="deleteCurrent">
               {{ trans('generic.no') }}
            </button>
         </template>
      </b-modal>
   </div>
</template>

<style>
   .ss_items .dropdown-menu {
      margin-top: -1px;
   }
</style>

<style scoped>
   i.ss_icon {
      font-size: 2.2rem;
   }

   .ss_items .dropdown-item {
      display: flex;
      min-width: 200px;
      font-size: 1.5rem;
   }

   .ss_items .dropdown-item .ss_itemLink {
      flex-grow: 1;
   }

   .ss_items .dropdown-item .ss_delete {
      color: #666;
      visibility: hidden;
   }

   .ss_items .dropdown-item:hover .ss_delete {
      visibility: visible;
   }

   .ss_items .dropdown-item .ss_delete:hover {
      color: #333;
   }
</style>

<script>
   import { mapGetters, mapActions } from 'vuex';

   export default {
      props: {
         type: { required: true, type: String },
         icon: { required: true, type: String }
      },

      data() {
         return {
            canselFormMsg: '',
            untitledCount: 1,
            hasCurrent: false
         };
      },

      mounted() {
         this.Event.on('scCancelForm', itemName => {
            console.log('scCancelForm', itemName);
            if (!this.hasCurrent) { return false; }
            console.log('current');

            this.canselFormMsg = trans('generic.askSaveFormState', {item: itemName});
            setTimeout(() => {
               this.$refs.savedStateCancelModal.show();
            }, 500);
         });
      },

      methods: {
         ...mapActions({
            setActive: 'savedState/setActive'
         }),
         /*getName(id) {
            const item = this.items.filter(status => status.id == id)[0];
            let name = item.data;

            for (let i of item.nameField.split('.')) {
               name = name[i];
            }

            if (name) { return name; }

            name = trans('generic.new')+' '+this.untitledCount;
            this.untitledCount++;
            return name;
         },*/

         setState(id, status) {
            /*const item = this.items.filter(status => status.id == id)[0];

            axios.post(laroute.route('ajax.saveState.setCurrent', {savedState: item.id}), {status}).then(() => {
               for (let i in window.saveStates) {
                  window.saveStates[i].current = i == key ? status : false;
               }

               this.Event.emit('scSavedStateSet', key);
            }).catch(error => {
               flashMessage('error', error.response.data.errors);
            });*/

         },

         deleteState(id) {
            // const item = this.items.filter(status => status.id == id)[0];
         },

         cancelCurrent() {
            /*const item = this.items.filter(status => status.current)[0];
            this.setState(item.id, false);
            this.$refs.savedStateCancelModal.hide();*/
         },

         deleteCurrent() {
            // const item = this.items.filter(status => status.current)[0];
            // this.deleteState(item.id);
            // this.$refs.savedStateCancelModal.hide();
         }
      },

      computed: {
         ...mapGetters({
            allSavedStates: 'savedState/all',
            newSavedStates: 'savedState/new',
            editSavedStates: 'savedState/edit',
            getName: 'savedState/getName'
         }),

         states() {
            return this.type === 'new' ? this.newSavedStates : this.editSavedStates;
         }
      }
   }
</script>
