@extends('template.app')

@section('title', trans('role.title'))

@section('bodyEnd')
   <script src="{{ asset('js/users/roles/index.js') }}"></script>
@stop

@section('content')
   <div id="rolesApp">
      <sc-page-header title="@lang('role.title')">
         <template slot="buttons">
            @permission('create-acl')
               <b-btn v-b-modal="'roleFormModal'" variant="primary">
                  <i class="fas fa-plus"></i>&nbsp;&nbsp;&nbsp;@lang('role.add')
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
         }" :items='{!! $roles->toJson() !!}' noresoults="@lang('role.notFound')">
            <template slot="actions" slot-scope="{ row }">
               <a href="#" class="btn btn-default" :title="trans('role.viewRole', {role: row.item.display_name})" @click.prevent="roleRow = row; $refs.viewRoleModal.show();">
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
      <b-modal id="roleFormModal" ref="roleFormModal" :title="roleFormTitle" no-close-on-esc no-close-on-backdrop hide-header-close centered>
         <div class="container">
            <sc-form-group id="displayName" label="{{ __('formLabels.displayName') }}" v-model="form.displayName" :error="form.errors" :required="true"></sc-form-group>
            <sc-form-group id="slug" label="{{ __('formLabels.slug') }}" v-model="form.slug" :error="form.errors" :required="!roleRow" :disabled="roleRow !== null"></sc-form-group>
            <sc-form-group id="description" label="{{ __('formLabels.description') }}" v-model="form.description" :error="form.errors"></sc-form-group>
            <sc-form-group id="permissions" label="{{ __('permission.title') }}" :error="form.errors">
               <b-form-checkbox-group v-model="form.permissions">
                  <b-row>
                     @foreach ($permissions as $p)
                        <b-col sm="12" md="6">
                           <b-form-checkbox value="{{ $p->id }}">{{ $p->display_name }}</b-form-checkbox>
                        </b-col>
                     @endforeach
                  </b-row>
               </b-form-checkbox-group>
            </sc-form-group>
         </div>
         <template slot="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="roleRow ? update() : add()" :disabled="form.submiting">
               <i :class="form.submiting ? 'fas fa-spinner' : 'fa fa-save'"></i> @lang('generic.save')
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancelForm">
               <i class="fa fa-reply"></i> @lang('generic.cancel')
            </button>
         </template>
      </b-modal>
      @endpermission

      <b-modal id="viewRoleModal" ref="viewRoleModal" centered :title="roleRow ? roleRow.item.display_name : ''">
         <b-container v-if="roleRow">
            <dl class="row" v-if="roleRow">
               <dt class="col-sd-12 col-md-3">@lang('formLabels.slug')</dt>
               <dd class="col-sd-12 col-md-9" v-text="roleRow.item.name"></dd>
               <dt class="col-sd-12 col-md-3">@lang('formLabels.description')</dt>
               <dd class="col-sd-12 col-md-9" v-text="roleRow.item.description"></dd>
            </dl>
            <hr>
            <b-row>
               <h3>@lang('permission.title')</h3>
            </b-row>
            <b-row>
               <ul>
                  <li v-for="p in roleRow.item.permissions">
                     <strong>@{{ p.display_name }}</strong> - <em>(@{{ p.description }})</em>
                  </li>
               </ul>
            </b-row>
         </b-container>
         <template slot="modal-footer">
            <b-btn variant="primary" @click="roleRow = null; $refs.viewRoleModal.hide();">
               <i class="fa fa-times"></i> @lang('generic.close')
            </b-btn>
         </template>
      </b-modal>
   </div>
@stop
