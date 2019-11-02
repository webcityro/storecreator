<?php

namespace SC\Http\Controllers\Users;

use SC\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SC\Models\Users\User;
use SC\Models\Users\Role;
use SC\Models\System\Store;
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
      $this->middleware('permission:delete-users')->only('destroy');
   }

   public function index() {
      $users = new Filter(new User, ['id', 'userName', 'firstName', 'lastName', 'email', 'sex', 'active'], 10, ['roles', 'stores']);
      $stores = Auth::user()->hasRole('owner') ? Store::all() : Auth::user()->stores();

      return $users->get('users.index', 'users', ['roles' => Role::all(), 'stores' => $stores]);
   }

   public function store(Request $request) {
      $this->validation($request);

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
         'storeID' => $request->stores[0],
         'password' => $this->makePassword(),
         'active' => $request->input('status'),
      ]));

      if ($user && $user->syncRoles($request->roles) && $user->stores()->sync($request->stores)) {
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
      $this->validation($request, $user->id);

      $owner = Role::where('name', 'owner')->first();

      if (in_array($owner->id, $request->roles) && !Auth::user()->hasRole('owner')) {
         return response()->json(['status' => 'error', 'errors' => trans('user.onlyOwnerCanAddAnotherOwner')], 422);
      }

      if ($password = $this->makePassword()) {
         $user->password = $password;
      }

      $user->storeID = in_array($user->storeID, $request->stores) ? $user->storeID : $request->stores[0];
      $user->firstName = $request->input('firstName');
      $user->lastName = $request->input('lastName');
      $user->email = $request->input('email');
      $user->sex = $request->input('sex');
      $user->active = $request->input('status');

      if ($user->save() && $user->syncRoles($request->roles) && $user->stores()->sync($request->stores)) {
         $user = User::where('id', $user->id)->with('roles')->with('stores')->first();
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

      if ($user->stores()->detach() && $user->delete()) {
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

   private function validation(Request $request, $id = false) {
      $rules = [
         'firstName' => 'required|between:3,191|alpha_dash',
         'lastName' => 'required|between:3,191|alpha',
         'email' => 'required|email|max:191|unique:users,email'.($id ? ','.$id : ''),
         'password' => 'nullable|required_if:passwordType,set|min:6',
         'sex' => 'required',
         'status' => 'required',
         'stores' => 'required',
      ];

      if (!$id) {
         $rules['userName'] = 'required|between:4,25|alpha_dash|unique:users,userName';
      }

      $this->validate($request, $rules, [], [
         'firstName' => trans('formLabels.firstName'),
         'lastName' => trans('formLabels.lastName'),
         'userName' => trans('formLabels.userName'),
         'email' => trans('formLabels.email'),
         'password' => trans('formLabels.password'),
         'sex' => trans('formLabels.sex'),
         'status' => trans('formLabels.status'),
         'stores' => trans('generic.stores'),
      ]);
   }
}
