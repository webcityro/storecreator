@extends('template.app')

@section('title', trans('generic.login'))

@section('head')
   <link href="{{ asset('css/auth/login.css') }}" rel="stylesheet">
@endsection

@section('bodyEnd')
   <script src="{{ asset('js/users/auth.js') }}"></script>
@endsection

@section('title', __('generic.login'))

@section('content')
   <div id="auth">
      <sc-form-wrap class="mt-5">
         <template slot="title">
            <i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp; @lang('generic.login')
         </template>
         <sc-form-group id="login" label="@lang('auth.usernameOrEmail')" v-model="loginForm.login" :error="loginForm.errors" :required="true"></sc-form-group>
         <sc-form-group-password id="password" label="@lang('formLabels.password')" v-model="loginForm.password" :error="loginForm.errors" :required="true"></sc-form-group-password>
         <div class="form-group text-right">
            <a href="#" @click.prevent="$refs.forgetPasswordModal.show()">@lang('auth.forgetPassword')</a>
         </div>
         <div class="form-group text-right">
            <b-form-checkbox id="rememberMe" v-model="loginForm.rememberMe" value="true">@lang('auth.rememberMe')</b-form-checkbox>
         </div>
         <div class="form-group">
            <b-button size="lg" variant="primary" class="btn-block" @click.prevent="submitLogin" :disabled="loginForm.submiting">
               <i :class="loginForm.submiting ? 'fas fa-spinner' : 'fas fa-check'" ></i>&nbsp;&nbsp;
               @lang('auth.loginBtn')
            </b-button>
         </div>
      </sc-form-wrap>

      <b-modal id="forgetPasswordModal" ref="forgetPasswordModal" no-close-on-esc no-close-on-backdrop hide-header-close>
         <template slot="modal-title">
            <i class="fas fa-key"></i>&nbsp;&nbsp; @lang('auth.forgetPassword')
         </template>
         <div class="container">
            <sc-form-group id="fpLogin" label="@lang('auth.usernameOrEmail')" v-model="forgetPasswordForm.fpLogin" :error="forgetPasswordForm.errors" :required="true"></sc-form-group>
         </div>
         <template slot="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="submitForgetPassword()" :disabled="forgetPasswordForm.submiting">
               <i :class="forgetPasswordForm.submiting ? 'fas fa-spinner' : 'fa fa-check'"></i> @lang('auth.resetPassword')
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="forgetPasswordForm.fpLogin = ''; $refs.forgetPasswordModal.hide()">
               <i class="fa fa-reply"></i> @lang('generic.cancel')
            </button>
         </template>
      </b-modal>
   </div>
@endsection
