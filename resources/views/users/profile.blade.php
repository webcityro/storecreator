@extends('template.app')

@section('title')
   @if ($isMyProfile) @lang('generic.yourProfile') @else @lang('user.viewUsersProfile', ['username' => $user->getUsername()]) @endif
@endsection

@section('bodyEnd')
   @if ($isMyProfile)
      <script>
         var user = {!! $user->toJson() !!};
      </script>
      <script src="{{ asset('js/users/profile.js') }}"></script>
   @else
      <script>
         new Vue({
            el: '#profileApp'
         });
      </script>
   @endif
@stop

@section('content')
   <div id="profileApp">
      <div id="pageHeader">
         <sc-page-header title="@if ($isMyProfile) @lang('generic.yourProfile') @else @lang('user.viewUsersProfile', ['username' => $user->getUsername()]) @endif">
            <template slot="buttons">
               @if ($isMyProfile)
                  <b-btn variant="primary" v-b-modal="'editProfileModal'">
                     <i class="fa fa-pencil-alt"></i> @lang('user.editYourProfile')
                  </b-btn>
                  <b-btn variant="primary" v-b-modal="'changePasswordModal'">
                     <i class="fa fa-key"></i> @lang('user.chandeYourPassword')
                  </b-btn>
               @endif

               <a href="{{ route('users.index') }}" class="btn btn-default">
                  <i class="fa fa-reply"></i>
               </a>
            </template>
         </sc-page-header>
      </div>
      <div class="container">
         <div class="row">
            <div class="col-md-6">
               <div class="card" id="userInfo">
                  <div class="card-header">
                     <div class="card-title">
                        <h3>@if (auth()->id() == $user->id) @lang('user.myDetalies') @else @lang('user.userDetalies', ['username' => $user->userName]) @endif</h3>
                     </div>
                  </div>
                  <div class="card-body">
                     <dl class="row">
                        <dt class="col-sm-3">@lang('formLabels.firstName')</dt>
                        <dd class="col-sm-9" @if ($isMyProfile) v-text="userInfo.firstName"@endif>{{ $user->firstName }}</dd>
                        <dt class="col-sm-3">@lang('formLabels.lastName')</dt>
                        <dd class="col-sm-9" @if ($isMyProfile) v-text="userInfo.lastName"@endif>{{ $user->lastName }}</dd>
                        <dt class="col-sm-3">@lang('formLabels.userName')</dt>
                        <dd class="col-sm-9">{{ $user->userName }}</dd>
                        <dt class="col-sm-3">@lang('formLabels.email')</dt>
                        <dd class="col-sm-9" @if ($isMyProfile) v-text="userInfo.email"@endif>{{ $user->email }}</dd>
                        <dt class="col-sm-3">@lang('formLabels.sex')</dt>
                        <dd class="col-sm-9" @if ($isMyProfile) v-text="displaySex(userInfo.sex)"@endif>@lang('formLabels.sex'.ucfirst($user->sex))</dd>
                     </dl>
                  </div>
               </div>
            </div>

            <div class="col-md-6">
               <div class="card">
                  <div class="card-header">
                     <div class="card-title">
                        <h3>@if ($isMyProfile) @lang('user.myRoles') @else @lang('user.userRoles', ['username' => $user->userName]) @endif</h3>
                     </div>
                  </div>
                  <div class="card-body">
                     @if ($user->roles->count())
                        <dl class="row">
                           @foreach ($user->roles as $r)
                              <dt class="col-sm-12 col-md-3">{{ $r->display_name }}</dt>
                              <dd class="col-sm-12 col-md-9">{{ $r->description }}</dd>
                           @endforeach
                        </dl>
                     @else
                     <p>@if ($isMyProfile) @lang('user.youHaveNoRores') @else @lang('user.hasNoRples') @endif</p>
                     @endif
                  </div>
               </div>
            </div>
         </div>
      </div>

      @if ($isMyProfile)
         <b-modal id="editProfileModal" ref="editProfileModal" title="@lang('user.editYourProfile')" no-close-on-esc no-close-on-backdrop hide-header-close>
            <div class="container">
               <sc-form-group id="firstName" label="{{ __('formLabels.firstName') }}" v-model="profileForm.firstName" :error="profileForm.errors" required></sc-form-group>
               <sc-form-group id="lastName" label="{{ __('formLabels.lastName') }}" v-model="profileForm.lastName" :error="profileForm.errors" required></sc-form-group>
               <sc-form-group-radio id="sex" label="{{ __('formLabels.sex') }}" :options="{ male: '{{ __('formLabels.sexMale') }}', female: '{{ __('formLabels.sexFemale') }}' }" v-model="profileForm.sex" :error="profileForm.errors" required inline></sc-form-group-radio>
               <sc-form-group id="email" type="email" label="{{ __('formLabels.email') }}" v-model="profileForm.email" :error="profileForm.errors" required></sc-form-group>
            </div>
            <template slot="modal-footer">
               <button type="button" class="btn btn-primary" @click.prevent="saveProfile" :disabled="profileForm.submitting">
                  <i :class="profileForm.submitting ? 'fas fa-spinner' : 'fa fa-save'"></i> @lang('generic.save')
               </button>
               <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancelProfile">
                  <i class="fa fa-reply"></i> @lang('generic.cancel')
               </button>
            </template>
         </b-modal>

         <b-modal id="changePasswordModal" ref="changePasswordModal" title="@lang('user.chandeYourPassword')" no-close-on-esc no-close-on-backdrop hide-header-close>
            <div class="container">
               <sc-form-group-password id="currentPassword" label="{{ __('formLabels.currentPassword') }}" v-model="passwordForm.currentPassword" :error="passwordForm.errors" required></sc-form-group-password>
               <sc-form-group-password id="newPassword" label="{{ __('formLabels.newPassword') }}" v-model="passwordForm.newPassword" :error="passwordForm.errors" required></sc-form-group-password>
            </div>
            <template slot="modal-footer">
               <button type="button" class="btn btn-primary" @click.prevent="savePassword" :disabled="passwordForm.submitting">
                  <i :class="passwordForm.submitting ? 'fas fa-spinner' : 'fa fa-save'"></i> @lang('generic.save')
               </button>
               <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancelPassword">
                  <i class="fa fa-reply"></i> @lang('generic.cancel')
               </button>
            </template>
         </b-modal>
      @endif

   </div>

@stop
