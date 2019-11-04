@extends('template.app')

@section('title', trans('generic.stores'))

@section('bodyEnd')
   <script src="{{ asset('js/system/stores.js') }}"></script>
@stop

@section('content')
   <div id="storesApp">
      <sc-page-header title="@lang('generic.stores')">
         <template slot="buttons">
            @role('owner')
               <b-btn variant="primary" @click="showFormModal(storeForm.group)">
                  <i class="fas fa-store"></i>&nbsp;&nbsp;@lang('store.add')
               </b-btn>
            @endrole
         </template>
         <template slot="breadcrumb">
            <li><a href="#">@lang('generic.system')</a></li>
         </template>
      </sc-page-header>

      <b-container>
         <b-card-group deck>
            <b-col v-for="(store, key) in allStores" :key="key" sd="12" md="4">
               <b-card>
                  <h2>@{{ store.name }} <i v-if="store.id == currentStore.id" class="fas fa-check"></i></h2>
                  <p><strong>@lang('generic.numberOfUsers'):</strong> @{{ store.users.length }}</p>
                  <template slot="footer">
                     <b-row>
                        <b-col cols="12" class="mb-2">
                           <b-btn variant="default" block @click="setStore(store); $refs.storeViewModal.show();">
                              <i class="fas fa-eye"></i>&nbsp;&nbsp;@lang('generic.detalies')
                           </b-btn>
                        </b-col>
                        @role('owner')
                           <b-col sd="12" :md="store.id == currentStore.id ? 12 : 4">
                              <b-btn block variant="primary" @click="edit(store)">
                                 <i class="fas fa-pencil-alt"></i>&nbsp;&nbsp;@lang('generic.edit')
                              </b-btn>
                           </b-col>
                        @endrole
                           <b-col sd="12" :md="auth.hasRole('owner') ? 4 : 6" v-if="store.id != currentStore.id">
                              <b-btn block variant="success" @click="setActiveStore(store.id)"><i class="fas fa-check"></i>&nbsp;&nbsp;@lang('generic.active')</b-btn>
                           </b-col>
                        @role('owner')
                           <b-col v-if="store.id != currentStore.id" class="text-right" sd="12" md="4">
                              <b-btn block variant="danger" @click="setStore(store); showFormModal(deleteForm.group);">
                                 <i class="fas fa-trash"></i>&nbsp;&nbsp;@lang('generic.delete')
                              </b-btn>
                           </b-col>
                        @endrole
                     </b-row>
                  </template>
               </b-card>
            </b-col>
         </b-card-group>
      </b-container>
      @role('owner')
         <sc-form-wrap-modal
            id="storeFormModal"
            icon="fas fa-store"
            :title="formTitle"
            :form="storeForm"
            @submit="store === null ? add() : update()"
            @cancel="cancel"
         >
            <template slot-scope="{ form }">
               <sc-form-tabs :form="form">
                  <sc-form-tab id="store" title="@lang('generic.store')">
                     <sc-form-group id="name" label="{{ __('formLabels.name') }}" v-model="form.fields.store.name.value" :form="form"></sc-form-group>
                     <sc-form-group id="url" label="{{ __('formLabels.url') }}" v-model="form.fields.store.url.value" :form="form"></sc-form-group>
                     <sc-form-group id="apiPublic" label="{{ __('formLabels.apiPublic') }}" v-model="form.fields.store.apiPublic.value" :form="form"></sc-form-group>
                     <sc-form-group id="apiSecret" label="{{ __('formLabels.apiSecret') }}" v-model="form.fields.store.apiSecret.value" :form="form"></sc-form-group>
                  </sc-form-tab>
                  <sc-form-tab id="system" title="@lang('generic.settings')">
                     <sc-form-group-languages id="languageID" label="{{ __('formLabels.language') }}" v-model="form.fields.settings.system.languageID.value" :form="form"></sc-form-group-languages>
                     <sc-form-group id="itemsPerPage" label="{{ __('formLabels.itemsPerPage') }}" v-model="form.fields.settings.system.itemsPerPage.value" :form="form"></sc-form-group>
                  </sc-form-tab>
                  <sc-form-tab id="email" title="@lang('generic.email')">
                     <sc-form-group id="reply" label="{{ __('formLabels.reply') }}" v-model="form.fields.settings.email.reply.value" :form="form"></sc-form-group>
                     <sc-form-group id="noreply" label="{{ __('formLabels.noreply') }}" v-model="form.fields.settings.email.noreply.value" :form="form"></sc-form-group>
                  </sc-form-tab>
               </sc-form-tabs>
            </template>
         </sc-form-wrap-modal>
      @endrole

      <b-modal id="storeViewModal" ref="storeViewModal" no-close-on-esc no-close-on-backdrop hide-header-close centered>
         <span slot="modal-header" v-if="store != null">
            <i class="fas fa-store"></i>&nbsp;&nbsp;@{{ store.name }}
         </span>
         <b-container>
            <b-tabs v-if="store != null">
               <b-tab title="@lang('generic.store')">
                  <dl class="row">
                     <dt class="col-sd-12 col-md-3">{{ __('formLabels.name') }}</dt>
                     <dd class="col-sd-12 col-md-9" v-text="store.name"></dd>
                     <dt class="col-sd-12 col-md-3">{{ __('formLabels.url') }}</dt>
                     <dd class="col-sd-12 col-md-9" v-text="store.url"></dd>
                     <dt class="col-sd-12 col-md-3">{{ __('formLabels.apiPublic') }}</dt>
                     <dd class="col-sd-12 col-md-9" v-text="store.apiPublic"></dd>
                     <dt class="col-sd-12 col-md-3">{{ __('formLabels.apiSecret') }}</dt>
                     <dd class="col-sd-12 col-md-9" v-text="store.apiSecret"></dd>
                  </dl>
               </b-tab>
               <b-tab title="@lang('generic.settings')">
                  <dl class="row">
                     <dt class="col-sd-12 col-md-3">{{ __('formLabels.language') }}</dt>
                     <dd class="col-sd-12 col-md-9" v-text="languages.getByID(storeSettings('system.languageID', store.id)).name"></dd>
                     <dt class="col-sd-12 col-md-3">{{ __('formLabels.itemsPerPage') }}</dt>
                     <dd class="col-sd-12 col-md-9" v-text="storeSettings('system.itemsPerPage', store.id)"></dd>
                  </dl>
               </b-tab>
               <b-tab title="@lang('generic.email')">
                  <dl class="row">
                     <dt class="col-sd-12 col-md-3">{{ __('formLabels.reply') }}</dt>
                     <dd class="col-sd-12 col-md-9" v-text="storeSettings('email.reply', store.id)"></dd>
                     <dt class="col-sd-12 col-md-3">{{ __('formLabels.noreply') }}</dt>
                     <dd class="col-sd-12 col-md-9" v-text="storeSettings('email.noreply', store.id)"></dd>
                  </dl>
               </b-tab>
            </b-tabs>
         </b-container>
         <template slot="modal-footer">
            <button type="button" class="btn btn-default" @click="$refs.storeViewModal.hide(); store = null; storeIndex = null;">
               <i class="fa fa-times"></i> @lang('generic.close')
            </button>
         </template>
      </b-modal>

      @role('owner')
         <sc-form-wrap-modal
            id="storeDeleteModal"
            icon="fas fa-trash"
            :title="deleteFormTitle"
            :form="deleteForm"
            save-button-type="danger"
            save-button-label="@lang('generic.delete')"
            save-icon-class="fas fa-trash"
            @submit="deleteStore"
            @cancel="cancelDelete"
         >

               {{-- <span slot="modal-header">
                  <i class="fas fa-trash"></i>&nbsp;&nbsp;@{{ deleteFormTitle }}
               </span> --}}
            <template slot-scope="{ group, form }">
               <b-container>
                  <sc-form-group-radio id="action" label="@lang('store.deleteQuestion')" v-model="form.fields.action.value" :options="{
                     justTheStore: '@lang('store.deleteJustTheStore')',
                     evrythink: '@lang('store.deleteEvrythink')'
                  }" :form="form"></sc-form-group-radio>
                  <sc-form-group-password id="password" label="@lang('formLabels.yourPassword')" v-model="form.fields.password.value" :form="form"></sc-form-group-password>
               </b-container>
               {{-- <template slot="modal-footer">
                  <button type="button" class="btn btn-danger" @click.prevent="deleteStore()" :disabled="form.submitting">
                     <i :class="form.submitting ? 'fas fa-spinner' : 'fa fa-trash'"></i> @lang('generic.delete')
                  </button>
                  <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancelDelete">
                     <i class="fa fa-reply"></i> @lang('generic.cancel')
                  </button>
               </template> --}}
         </template>
         </sc-form-wrap-modal>
      @endrole
   </div>
@stop
