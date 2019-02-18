@extends('template.app')

@section('title', trans('user.accountsTitle'))

@section('bodyEnd')
   <script src="{{ asset('js/users/index.js') }}"></script>
@stop

@section('content')
   <div id="usersApp">
      <sc-page-header title="@lang('user.accountsTitle')">
         <template slot="buttons">
            @permission('create-users')
               <b-btn variant="primary" v-b-modal="'userFormModal'"><i class="fas fa-user-plus"></i>&nbsp;&nbsp;&nbsp;@lang('user.addUser')</b-btn>
            @endpermission
         </template>
         <template slot="breadcrumb">
            <li><a href="#">@lang('generic.users')</a></li>
         </template>
      </sc-page-header>

      <sc-items-filter :fields="{
         userName: '@lang('formLabels.userName')',
         firstName: '@lang('formLabels.firstName')',
         lastName: '@lang('formLabels.lastName')',
         email: '@lang('formLabels.email')',
         sex: {
            label: '@lang('formLabels.sex')',
            type: 'select',
            options: {
               male: '@lang('formLabels.sexMale')',
               female: '@lang('formLabels.sexFemale')'
            }
         },
         active: {
            label: '@lang('generic.status')',
            type: 'select',
            options: {
               1: '@lang('generic.active')',
               0: '@lang('generic.inactive')'
            }
         }
      }"></sc-items-filter>

      <b-container>
         <sc-items-table :columns="{
            userName: '@lang('formLabels.userName')',
            firstName: '@lang('formLabels.firstName')',
            lastName: '@lang('formLabels.lastName')',
            email: '@lang('formLabels.email')',
            roles: '@lang('role.title')',
            sex: '@lang('formLabels.sex')'
         }" :items='{!! $users->toJson() !!}' noresoults="@lang('user.userNotFound')">
            <template slot="userName" slot-scope="{ row }">
               @permission('read-profile')
                  <a :href="laroute.route('users.show', {user: row.item.id})" :title="trans('user.visitUsersProfile', {username: row.item.displayName})">
               @endpermission
                  @{{ row.value }}
               @permission('read-profile')
                  </a>
               @endpermission
            </template>
            <template slot="roles" slot-scope="{ row }">
               <span v-for="(role, key) in row.value">@{{ role.display_name+(key < row.value.length - 1 ? ' / ' : '') }}</span>
            </template>
            <template slot="sex" slot-scope="{ row }">@{{ row.value | displaySex }}</template>
            <template slot="actions" slot-scope="{ row }">
               <b-btn v-b-modal="'viewUserModal'" @click="userRow = row" variant="default" :title="trans('user.viewUsersInfo', {username: row.item.displayName})">
                  <i class="fas fa-eye"></i>
               </b-btn>
               @permission('update-users')
                  <a href="#" class="btn btn-primary" title="@lang('generic.edit')" @click.prevent="edit(row)">
                     <i class="fas fa-pencil-alt"></i>
                  </a>
               @endpermission
               @permission('delete-users')
                  <b-btn v-if="(!isOwner(row.item) || Auth.hasRole('owner')) && row.item.id != Auth.data.id" v-b-modal="'deleteUserModal'" class="btn btn-danger" title="@lang('generic.delete')" @click="userRow = row">
                     <i class="fas fa-trash-alt"></i>
                  </b-btn>
               @endpermission
            </template>
         </sc-items-table>
      </b-container>

      <b-container>
         <sc-pagination></sc-pagination>
      </b-container>

      @permission('create-users|update-users')
         <b-modal id="userFormModal" ref="userFormModal" :title="userFormTitle" no-close-on-esc no-close-on-backdrop hide-header-close size="lg">
            <div class="container">
               <sc-form-group id="user_firstName" label="{{ __('formLabels.firstName') }}" v-model="form.firstName" :error="form.errors" :required="true"></sc-form-group>
               <sc-form-group id="user_lastName" label="{{ __('formLabels.lastName') }}" v-model="form.lastName" :error="form.errors" :required="true"></sc-form-group>
               <sc-form-group id="user_userName" label="{{ __('formLabels.userName') }}" v-model="form.userName" :error="form.errors" :required="!userRow" :disabled="userRow !== null"></sc-form-group>
               <sc-form-group-radio id="user_sex" label="{{ __('formLabels.sex') }}" :options="{ male: '{{ __('formLabels.sexMale') }}', female: '{{ __('formLabels.sexFemale') }}' }" v-model="form.sex" :error="form.errors" :required="true" :inline="true"></sc-form-group-radio>
               <sc-form-group id="user_email" type="email" label="{{ __('formLabels.email') }}" v-model="form.email" :error="form.errors" :required="true"></sc-form-group>
               <sc-form-group-password id="password" label="{{ __('formLabels.password') }}" v-model="form.password" :error="form.errors" :hide-default="form.passwordType != 'change' && form.passwordType != 'set'">
                  <template slot="append">
                     <b-form-radio-group v-model="form.passwordType"
                        :options="passwordOptions"
                        stacked
                        name="passwordType"></b-form-radio-group>
                  </template>
               </sc-form-group-password>
               <sc-form-group-select id="status" label="{{ __('generic.status') }}" :options="{ 1: '{{ __('generic.active') }}', 0: '{{ __('generic.inactive') }}' }" v-model="form.status" :error="form.errors" :required="true" inline="true"></sc-form-group-select>
               <sc-form-group id="roles" label="{{ __('role.title') }}" :error="form.errors">
                  <b-form-checkbox-group v-model="form.roles">
                     <b-row>
                        @foreach ($roles as $role)
                           @if (Auth::user()->hasRole('owner') || $role->name != 'owner')
                              <b-col sm="12" md="4">
                                 <b-form-checkbox value="{{ $role->id }}">{{ $role->display_name }}</b-form-checkbox>
                              </b-col>
                           @endif
                        @endforeach
                     </b-row>
                  </b-form-checkbox-group>
               </sc-form-group>
            </div>
            <template slot="modal-footer">
               <button type="button" class="btn btn-primary" @click.prevent="userRow ? update() : add()" :disabled="form.submiting">
                  <i :class="form.submiting ? 'fas fa-spinner' : 'fa fa-save'"></i> @lang('generic.save')
               </button>
               <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancel">
                  <i class="fa fa-reply"></i> @lang('generic.cancel')
               </button>
            </template>
         </b-modal>
      @endpermission


      <b-modal id="viewUserModal" ref="viewUserModal" :title="userRow ? userRow.item.displayName : ''" centered>
         <b-container v-if="userRow">
            <h3>@lang('generic.detalies')</h3>
            <hr>
            <dl class="row">
               <dt class="col-sm-3">@lang('formLabels.firstName')</dt>
               <dd class="col-sm-9" v-text="userRow.item.firstName"></dd>
               <dt class="col-sm-3">@lang('formLabels.lastName')</dt>
               <dd class="col-sm-9" v-text="userRow.item.lastName"></dd>
               <dt class="col-sm-3">@lang('formLabels.userName')</dt>
               <dd class="col-sm-9" v-text="userRow.item.userName"></dd>
               <dt class="col-sm-3">@lang('formLabels.email')</dt>
               <dd class="col-sm-9" v-text="userRow.item.email"></dd>
               <dt class="col-sm-3">@lang('formLabels.sex')</dt>
               <dd class="col-sm-9" v-text="displaySex(userRow.item.sex)"></dd>
               <dt class="col-sm-3">@lang('user.joinedDate')</dt>
               <dd class="col-sm-9" v-text="displayDate(userRow.item.created_at)"></dd>
               <dt class="col-sm-3">@lang('user.lastLogin')</dt>
               <dd class="col-sm-9" v-text="displayDate(userRow.item.lastLogin)"></dd>
               <dt class="col-sm-3">@lang('user.lastLogout')</dt>
               <dd class="col-sm-9" v-text="displayDate(userRow.item.lastLogout)"></dd>
            </dl>
            <h3>@lang('role.title')</h3>
            <hr>
            <ul v-if="userRow.item.roles.length">
               <li v-for="role in userRow.item.roles">
                  <strong>@{{ role.display_name }}</strong> <em>(@{{ role.description }})</em>
               </li>
            </ul>
            <p v-else>@lang('user.hasNoRores')</p>
         </b-container>
         <template slot="modal-footer">
            <b-btn variant="primary" @click="userRow = null; $refs.viewUserModal.hide();">
               <i class="fa fa-times"></i> @lang('generic.close')
            </b-btn>
         </template>
      </b-modal>

      @permission('delete-users')
         <b-modal id="deleteUserModal" ref="deleteUserModal" title="@lang('generic.warning')" no-close-on-esc no-close-on-backdrop hide-header-close centered>
            <div class="container">
               <p class="lead">@{{ deleteUserMsg }}</p>
            </div>
            <template slot="modal-footer">
               <button type="button" class="btn btn-danger" @click.prevent="deleteUser()" :disabled="form.submiting">
                  <i :class="form.submiting ? 'fas fa-spinner' : 'fa fa-trash-alt'"></i> @lang('generic.delete')
               </button>
               <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="userRow = null">
                  <i class="fa fa-reply"></i> @lang('generic.cancel')
               </button>
            </template>
         </b-modal>
      @endpermission
   </div>
@stop
