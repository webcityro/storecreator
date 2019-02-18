<?php

namespace SC\Http\Controllers\Auth;

use SC\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SC\Models\Users\User;
use Validator;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Session;

class ResetPasswordController extends Controller {
   use ResetsPasswords;

   public function reset(Request $request) {
      $request->validate([
         'token' => 'required',
         'password' => 'required|min:6',
      ], [], ['password' => __('formLabels.password')]);

      $response = $this->broker()->reset(
         $this->credentials($request), function ($user, $password) {
            $this->resetPassword($user, $password);
         }
      );

      if ($response == Password::PASSWORD_RESET) {
         Session::flash('success', __('auth.resetPasswordSuccess'));
         return ['status' => 'ok'];
      } else {
         return response()->json(['status' => 'error', 'errors' => __('auth.resetPasswordfailed'), 'response' => $response], 422);
      }
   }

   protected function credentials(Request $request) {
      return array_merge($request->only(
         'password', 'token'
      ), ['password_confirmation' => $request->password]);
   }
}
