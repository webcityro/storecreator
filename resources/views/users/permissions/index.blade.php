@extends('template.app')

@section('title', trans('permission.title'))

@section('head')
   <style>
      .resourceCRUDtableItems .invalid-feedback {
         display: block;
      }
   </style>
@endsection

@section('bodyEnd')
   <script src="{{ asset('js/users/permissions/index.js') }}"></script>
@stop

@section('content')
   <div id="permissionsApp">
      <sc-page-header title="@lang('permission.title')">
         <template slot="buttons">
            @permission('create-acl')
               <b-btn v-b-modal="'permissionFormModal'" variant="primary">
                  <i class="fas fa-plus"></i>&nbsp;&nbsp;&nbsp;@lang('permission.add')
               </b-btn>
            @endpermission
         </template>
         <template slot="breadcrumb">
            <li><a href="#">@lang('generic.users')</a></li>
         </template>
      </sc-page-header>

      <sc-items-filter :fields="{
         display_name: '@lang('formLabels.displayName')',
         name: '@lang('formLabels.slug')'
      }"></sc-items-filter>

      <b-container>
         <sc-items-table :columns="{
            display_name: '@lang('formLabels.displayName')',
            name: '@lang('formLabels.slug')',
            description: '@lang('formLabels.description')'
         }" :items='{!! $permissions->toJson() !!}' noresoults="@lang('permission.notFound')">
            <template slot="actions" slot-scope="{ row }">
               <a href="#" class="btn btn-default" :title="trans('permission.viewPermission', {permission: row.item.display_name})" @click.prevent="permissionRow = row; $refs.viewPermissionModal.show();">
                  <i class="fas fa-eye"></i>
               </a>
               @permission('update-acl')
                  <a href="#" class="btn btn-primary" title="@lang('generic.edit')" @click.prevent="edit(row)">
                     <i class="fas fa-pencil-alt"></i>
                  </a>
               @endpermission
            </template>
         </sc-items-table>
      </b-container>

      <b-container>
         <sc-pagination></sc-pagination>
      </b-container>

      @permission('create-acl|update-acl')
         <b-modal id="permissionFormModal" ref="permissionFormModal" :title="permissionFormTitle" no-close-on-esc no-close-on-backdrop hide-header-close :size="form.type == 'basic' ? 'md' : 'lg'" centered>
            <div class="container">
               <sc-form-group id="type" label="{{ __('formLabels.type') }}" :error="form.errors" :required="true" v-if="!permissionRow">
                  <b-form-radio-group id="type" v-model="form.type" :options="typeOptions" name="permissionType">
                  </b-form-radio-group>
               </sc-form-group>
               <div v-if="form.type == 'basic'">
                  <sc-form-group id="displayName" label="{{ __('formLabels.displayName') }}" v-model="form.displayName" :error="form.errors" :required="true"></sc-form-group>
                  <sc-form-group id="slug" label="{{ __('formLabels.slug') }}" v-model="form.slug" :error="form.errors" :required="!permissionRow" :disabled="permissionRow !== null"></sc-form-group>
                  <sc-form-group id="description" label="{{ __('formLabels.description') }}" v-model="form.description" :error="form.errors"></sc-form-group>
               </div>
            </div>
            <div v-if="form.type == 'crud'">
               <sc-form-group id="resource" label="{{ __('generic.resource') }}" v-model="form.resource" :error="form.errors" :required="true"></sc-form-group>
               <div class="form-group">
                  <b-row>
                     <b-col sd="12" md="3">
                        <sc-form-group id="resourceCRUD" label="{{ __('generic.actions') }}" :error="form.errors" :required="true">
                           <b-form-checkbox-group stacked v-model="form.resourceCRUD" name="resourceCRUD" :options="resourceCRUDoptions">
                           </b-form-checkbox-group>
                        </sc-form-group>
                     </b-col>
                     <b-col sd="12" md="9" class="resourceCRUDtableItems">
                        <sc-form-group id="resourcePerissions" label="{{ __('permission.title') }}" :error="form.errors" :required="true">
                           <b-table outlined :items="resourceCRUDtableItems" :fields="resourceCRUDtableFields"></b-table>
                        </sc-form-group>
                     </b-col>
                  </b-row>
               </div>
            </div>
            <template slot="modal-footer">
               <button type="button" class="btn btn-primary" @click.prevent="permissionRow ? update() : add()" :disabled="form.submitting">
                  <i :class="form.submitting ? 'fas fa-spinner' : 'fa fa-save'"></i> @lang('generic.save')
               </button>
               <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancelForm">
                  <i class="fa fa-reply"></i> @lang('generic.cancel')
               </button>
            </template>
         </b-modal>
      @endpermission

      <b-modal id="viewPermissionModal" ref="viewPermissionModal" :title="permissionRow ? permissionRow.item.display_name : ''" centered>
         <b-container>
            <dl class="row" v-if="permissionRow">
               <dt class="col-sd-12 col-md-3">@lang('formLabels.slug')</dt>
               <dd class="col-sd-12 col-md-9" v-text="permissionRow.item.name"></dd>
               <dt class="col-sd-12 col-md-3">@lang('formLabels.description')</dt>
               <dd class="col-sd-12 col-md-9" v-text="permissionRow.item.description"></dd>
            </dl>
         </b-container>
         <template slot="modal-footer">
            <b-btn variant="primary" @click="permissionRow = null; $refs.viewPermissionModal.hide();">
               <i class="fa fa-times"></i> @lang('generic.close')
            </b-btn>
         </template>
      </b-modal>
   </div>
@stop
