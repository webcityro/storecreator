<?php

namespace SC\Http\Controllers\Users;

use SC\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SC\Models\Users\User;
use SC\Models\Users\Role;
use SC\Libs\Filter;
use SC\Notifications\Users\AccountNotification;
use Session;
use Validator;
use Hash;
use Auth;

class UserController extends Controller {
   protected $plainTextPassword;

   function __construct() {
      $this->middleware('permission:create-users')->only('store');
      $this->middleware('permission:update-users')->only('update');
      $this->middleware('permission:deleie-users')->only('destroy');
   }

   public function index() {
      $users = new Filter(User::with('roles'), ['id', 'userName', 'firstName', 'lastName', 'email', 'sex', 'active'], 10);
      return $users->get('users.index', 'users', ['roles' => Role::all()]);
   }

   public function store(Request $request) {
      $this->validate($request, [
         'firstName' => 'required|between:3,191|alpha_dash',
         'lastName' => 'required|between:3,191|alpha',
         'userName' => 'required|between:4,25|alpha_dash|unique:users,userName',
         'email' => 'required|email|max:191|unique:users,email',
         'password' => 'nullable|required_if:passwordType,set|min:6',
         'sex' => 'required',
         'status' => 'required',
      ], [], [
         'firstName' => trans('formLabels.firstName'),
         'lastName' => trans('formLabels.lastName'),
         'userName' => trans('formLabels.userName'),
         'email' => trans('formLabels.email'),
         'password' => trans('formLabels.password'),
         'sex' => trans('formLabels.sex'),
         'status' => trans('formLabels.status'),
      ]);

      $owner = Role::where('name', 'owner')->first();

      if (in_array($owner->id, $request->roles) && !Auth::user()->hasRole('owner')) {
         return response()->json(['status' => 'error', 'errors' => trans('user.onlyOwnerCanAddAnotherOwner')], 422);
      }

      $user = User::create(array_merge($request->only([
         'firstName',
         'lastName',
         'userName',
         'email',
         'sex'
      ]), [
         'password' => $this->makePassword(),
         'active' => $request->input('status'),
      ]));

      if ($user && $user->syncRoles($request->roles)) {
         $user = User::where('id', $user->id)->with('roles')->first();
         $user->notify(new AccountNotification($user, $this->plainTextPassword, true));
         return ['status' => 'ok', 'data' => $user, 'message' => trans('user.accountCreated', ['username' => $request->userName])];
      } else {
         return response()->json(['status' => 'error', 'errors' => trans('user.accountNotCreated')], 422);
      }
   }

   public function show($user = false) {
      $user = $user ? User::where('id', $user)->with('roles')->first() : Auth::user();
      $isMyProfile = $user->id == Auth::id();

      if (!$isMyProfile && !Auth::user()->can('read-profile')) {
         return response(null, 403);
      }
      return view('users.profile', ['user' => $user, 'isMyProfile' => $isMyProfile]);
   }

   public function update(Request $request, User $user) {
      $this->validate($request, [
         'firstName' => 'required|between:3,191|alpha_dash',
         'lastName' => 'required|between:3,191|alpha',
         'email' => 'required|max:191|email|unique:users,email,'.$user->id,
         'password' => 'nullable|required_if:passwordType,==,change|min:6',
         'passwordType' => 'required',
         'sex' => 'required',
         'status' => 'required',
      ], [], [
         'firstName' => trans('formLabels.firstName'),
         'lastName' => trans('formLabels.lastName'),
         'email' => trans('formLabels.email'),
         'password' => trans('formLabels.password'),
         'passwordType' => trans('formLabels.password'),
         'sex' => trans('formLabels.sex'),
         'status' => trans('formLabels.status'),
      ]);

      $owner = Role::where('name', 'owner')->first();

      if (in_array($owner->id, $request->roles) && !Auth::user()->hasRole('owner')) {
         return response()->json(['status' => 'error', 'errors' => trans('user.onlyOwnerCanAddAnotherOwner')], 422);
      }

      if ($password = $this->makePassword()) {
         $user->password = $password;
      }

      $user->firstName = $request->input('firstName');
      $user->lastName = $request->input('lastName');
      $user->email = $request->input('email');
      $user->sex = $request->input('sex');
      $user->active = $request->input('status');

      if ($user->save() && $user->syncRoles($request->roles)) {
         $user = User::where('id', $user->id)->with('roles')->first();
         $user->notify(new AccountNotification($user, $password ? $this->plainTextPassword : false));

         return ['status' => 'ok', 'data' => $user];
      } else {
         return response()->json(['status' => 'error', 'errors' => trans('user.accountNotCreated')], 422);
      }
   }

   public function profileUpdate(Request $request) {
      $this->validate($request, [
         'firstName' => 'required|between:3,191|alpha_dash',
         'lastName' => 'required|between:3,191|alpha',
         'email' => 'required|email|unique:users,email,'.Auth::id(),
         'sex' => 'required',
      ], [], [
         'firstName' => trans('formLabels.firstName'),
         'lastName' => trans('formLabels.lastName'),
         'email' => trans('formLabels.email'),
         'sex' => trans('formLabels.sex'),
      ]);

      $user = Auth::user();

      $update = $user->update($request->only([
         'firstName',
         'lastName',
         'email',
         'sex'
      ]));

      if ($update) {
         return ['status' => 'ok', 'data' => $user, 'message' => trans('user.profileUpdated')];
      } else {
         return response()->json(['status' => 'error', 'errors' => trans('user.profileNotUpdated')], 422);
      }
   }

   public function changePassword(Request $request) {
      $validation = Validator::make($request->all(), [
         'currentPassword' => 'required|min:6',
         'newPassword' => 'required|min:6'
      ], [], [
         'currentPassword' => trans('formLabels.currentPassword'),
         'newPassword' => trans('formLabels.newPassword'),
      ]);

      $validation->after(function($validator) use($request) {
         if (!Hash::check($request->input('currentPassword'), Auth::user()->password)) {
            $validator->errors()->add('currentPassword', trans('user.currentPasswordIncorect'));
         }
      });

      if ($validation->fails()) {
         return response()->json(['status' => 'error', 'errors' => $validation->errors()], 422);
      }

      $updatePassword = Auth::user()->update([
         'password' => Hash::make($request->newPassword)
      ]);

      if ($updatePassword) {
         return ['status' => 'ok', 'message' => trans('user.passwordUpdated')];
      } else {
         return response()->json(['status' => 'error', 'errors' => trans('user.passwordNotUpdated')], 422);
      }
   }

   public function destroy(User $user) {
      $username = $user->getUsername();

      if ($user->delete()) {
         return ['status' => 'ok', 'message' => trans('user.accountDeleted', ['userName' => $username])];
      } else {
         return response()->json(['status' => 'error', 'errors' => trans('user.accountNotDeleted')], 422);
      }
   }

   private function makePassword() {
      if (request()->passwordType == 'change' || request()->passwordType == 'set') {
         $this->plainTextPassword = request()->password;
      } else if (request()->passwordType == 'auto') {
         $charset = 'abcdefghijkmnoprqstuvzxywABCDEFGHJKLMNPQRSTUVZXYW123456789';
         $this->plainTextPassword = substr(str_shuffle($charset), 0, 10);
      }
      return $this->plainTextPassword ? Hash::make($this->plainTextPassword) : false;
   }
}
