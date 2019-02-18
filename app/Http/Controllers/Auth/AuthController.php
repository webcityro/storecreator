<?php

namespace SC\Http\Controllers\Auth;

use SC\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use SC\Models\Users\User;
use Mail;
use Auth;
use Validator;

class AuthController extends Controller {
    use AuthenticatesUsers;

    public function getLogin() {
        return view('auth.login');
    }

    public function postLogin(Request $request) {
        $validation = Validator::make($request->all(), [
            'login' => 'required|between:4,191|exists:users,'.$this->username(),
            'password' => 'required|between:6,30'
        ], ['login.exists' => __('auth.wroungEmail')], [
            'login' => __('formLabels.email'),
            'password' => __('formLabels.password'),
        ]);

        if (!Auth::attempt([
            $this->username() => $request->login,
            'password' => $request->input('password'),
            'active' => 1], $request->has('rememberMe'))) {
            $user = User::where($this->username(), $request->login);

            if ($user->count() > 0) {
                if ($user->first()->active == 0) {
                    return redirect()->route('auth.login')->with('error', __('auth.inactiveAccount'));
                } else {
                    $validation->after(function($validator) {
                        $validator->errors()->add('password', __('auth.wroungPassword'));
                    });
                }
            }
        }

        if ($validation->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validation->errors()], 422);
        }

        Auth::user()->update(['lastLogin' => now()]);

        return ['status' => 'ok'];
    }

    public function getLogout() {
        Auth::user()->update(['lastLogout' => now()]);
        Auth::logout();
        return redirect()->route('auth.login');
    }

    public function username() {
        return filter_var(request('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'userName';
    }
}
