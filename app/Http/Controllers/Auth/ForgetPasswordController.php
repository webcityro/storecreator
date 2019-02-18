<?php

namespace SC\Http\Controllers\Auth;

use SC\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SC\Models\Users\User;
use Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgetPasswordController extends Controller {
   use SendsPasswordResetEmails;

   public function sendResetLinkEmail(Request $request) {
      $loginValue = $request->input('fpLogin');
      $loginCol = filter_var($loginValue, FILTER_VALIDATE_EMAIL) ? 'email' : 'userName';

      $this->validate($request, [
         'fpLogin' => 'required|min:4|max:191|exists:users,'.$loginCol
      ], ['fpLogin.exists' => __('auth.usernameOrEmailNotFond')], [
         'fpLogin' => __('auth.usernameOrEmail')
      ]);

      $user = User::where($loginCol, $loginValue)->first();
      $response = $this->broker()->sendResetLink(['email' => $user->email]);

      return $response == Password::RESET_LINK_SENT
               ? ['status' => 'ok', 'message' => __('auth.resetPasswordEmailSend')]
               : response()->json(['status' => 'error', 'errors' => __('auth.resetPasswordEmailNotSend')], 422);
   }
}
