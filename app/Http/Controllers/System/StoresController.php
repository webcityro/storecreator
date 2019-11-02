<?php

namespace SC\Http\Controllers\System;

use Auth;
use Hash;
use Validator;
use SC\Models\Users\User;
use SC\Models\System\Store;
use Illuminate\Http\Request;
use SC\Models\System\Language;
use SC\Http\Controllers\Controller;

class StoresController extends Controller {
   function __construct() {
      $this->middleware('role:owner')->only('store');
      $this->middleware('role:owner')->only('update');
      $this->middleware('role:owner')->only('destroy');
   }

   public function index() {
      return view('system.stores.index', ['languages' => Language::orderBy('sortOrder', 'ASC')->get()]);
   }

   public function getFirst() {
      return response()->json(Store::first());
   }

   public function store(Request $request) {
      $this->validation($request);

      $newStore = Store::create([
         'name' => $request->store['name'],
         'url' => $request->store['url'],
         'apiPublic' => $request->store['apiPublic'],
         'apiSecret' => $request->store['apiSecret'],
      ]);

      if ($newStore) {
         $settings = [];

         foreach ($request->settings as $code => $setting) {
            foreach ($setting as $key => $value) {
               $settings[] = ['code' => $code, 'key' => $key, 'value' => is_array($value) ? json_encode($value) : $value, 'serialize' => is_array($value)];
            }
         }

         if ($newStore->settings()->createMany($settings) && $newStore->users()->sync(User::whereRoleIs('owner')->get())) {
            return ['status' => 'ok', 'message' => __('store.createSuccess'), 'data' => ['store' => Store::where('id', $newStore->id)->with('settings')->with('users')->first()->toJson()]];
         } else {
            return response()->json(['status' => 'error', 'errors' => __('store.createSettingsFailed'), 'data' => ['store' => $newStore->with('users')->toJson()]], 422);
         }
      } else {
         return response()->json(['status' => 'error', 'errors' => __('store.createFailed')], 422);
      }
   }

   public function update(Request $request, Store $store) {
      $this->validation($request, $store->id);

      $updateStore = $store->update([
         'name' => $request->store['name'],
         'url' => $request->store['url'],
         'apiPublic' => $request->store['apiPublic'],
         'apiSecret' => $request->store['apiSecret'],
      ]);

      if ($updateStore) {
         foreach ($request->settings as $code => $setting) {
            foreach ($setting as $key => $value) {
               $store->settings()->updateOrCreate([
                  'code' => $code,
                  'key' => $key,
               ], [
                  'value' => is_array($value) ? json_encode($value) : $value,
                  'serialize' => is_array($value)
               ]);
            }
         }
         return ['status' => 'ok', 'message' => __('store.updatedSuccess'), 'data' => ['store' => Store::where('id', $store->id)->with('settings')->with('users')->first()->toJson()]];
      } else {
         return response()->json(['status' => 'error', 'errors' => __('store.updateFailed')], 422);
      }
   }

   public function activate(Store $store) {
      if ((Auth::user()->stores()->where('id', $store->id)->exists() || Auth::user()->hasRole('owner')) && Auth::user()->update(['storeID' => $store->id])) {
         return ['status' => 'ok', 'message' => __('store.activateSuccess'), 'data' => $store];
      } else {
         return response()->json(['status' => 'error', 'errors' => __('store.activateFailed')], 422);
      }
   }

   public function destroy(Request $request, Store $store) {
      if ($store->id == Auth::user()->storeID) {
         return response()->json(['status' => 'error', 'errors' => __('store.cantDeleteActiveStore')], 422);
      }

      $validation = Validator::make($request->all(), [
         'action' => 'required',
         'password' => 'required|min:6'
      ], [
         'action.required' => __('store.noDeleteActionSelected'),
         'password.required' => __('store.noDeletePassword'),
      ]);

      $validation->after(function($validator) use($request) {
         if (!Hash::check($request->password, Auth::user()->password)) {
            $validator->errors()->add('password', trans('store.passwordIncorect'));
         }
      });

      if ($validation->fails()) {
         return response()->json(['status' => 'error', 'errors' => $validation->errors()], 422);
      }

      if ($request->action == 'evrythink') {
         $store->users()->delete();
      } else if ($request->action == 'justTheStore') {
         $store->users()->detach();
      }

      if ($store->delete()) {
         return ['status' => 'ok', 'message' => __('store.successDelete')];
      }

      return response()->json(['status' => 'error', 'errors' => __('store.failedDelete')], 422);
   }

   private function validation(Request $request, $id = false) {
      $this->validate($request, [
         'store.name' => 'required|between:3,191|unique:stores,name'.($id ? ','.$id : ''),
         'store.url' => 'required|between:3,191|unique:stores,url'.($id ? ','.$id : ''),
         'store.apiPublic' => 'required|size:32|unique:stores,apiPublic'.($id ? ','.$id : ''),
         'store.apiSecret' => 'required|size:32|unique:stores,apiSecret'.($id ? ','.$id : ''),
         'settings.system.languageID' => 'required',
         'settings.system.itemsPerPage' => 'required|numeric',
         'settings.email.reply' => 'required|email|max:191',
         'settings.email.noreply' => 'required|email|max:191',
      ], [], [
         'store.name' => __('formLabels.name'),
         'store.url' => __('formLabels.url'),
         'store.apiPublic' => __('formLabels.apiPublic'),
         'store.apiSecret' => __('formLabels.apiSecret'),
         'settings.system.languageID' => __('formLabels.language'),
         'settings.system.itemsPerPage' => __('formLabels.itemsPerPage'),
         'settings.email.reply' => __('formLabels.reply'),
         'settings.email.noreply' => __('formLabels.noreply'),
      ]);
   }
}
