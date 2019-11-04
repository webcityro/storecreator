@extends('template.app')

@section('title', trans('auth.resetPassword'))

@section('bodyEnd')
    <script>
        const token = '{{ $token }}';
    </script>
    <script src="{{ asset('js/users/auth.js') }}"></script>
@endsection

@section('title', __('auth.resetPassword'))

@section('content')
    <div id="auth">
        <sc-form-wrap class="mt-5">
            <template slot="title">
                <i class="fas fa-key"></i>&nbsp;&nbsp; @lang('auth.resetPassword')
            </template>
            <sc-form-group-password id="password" label="@lang('formLabels.newPassword')" v-model="resetPasswordForm.password" :error="resetPasswordForm.errors" :required="true"></sc-form-group-password>
            <div class="form-group">
                <input type="hidden" name="token" id="token" v-model="resetPasswordForm.token">
                <b-button size="lg" variant="primary" class="btn-block" @click.prevent="submitResetPassword" :disabled="resetPasswordForm.submitting">
                    <i :class="resetPasswordForm.submitting ? 'fas fa-spinner' : 'fas fa-check'"></i>&nbsp;&nbsp;
                    @lang('auth.resetPassword')
                </b-button>
            </div>
        </sc-form-wrap>
    </div>
@endsection
