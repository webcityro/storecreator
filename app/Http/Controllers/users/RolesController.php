<?php

namespace SC\Http\Controllers\Users;

use Illuminate\Http\Request;
use SC\Http\Controllers\Controller;
use SC\Models\Users\Permission;
use SC\Models\Users\Role;
use SC\Libs\Filter;

class RolesController extends Controller {

   function __construct() {
      $this->middleware('permission:create-acl')->only('store');
      $this->middleware('permission:update-acl')->only('update');
   }

   public function index() {
      $roles = new Filter(new Role, ['id', 'name', 'display_name'], 10, ['permissions', 'users']);
      return $roles->get('users.roles.index', 'roles', ['permissions' => Permission::all()]);
   }

   public function store(Request $request) {
      $this->validate($request, [
         'displayName' => 'required|between:3,30',
         'slug' => 'required|between:3,35|alphadash|unique:roles,name',
         'description' => 'sometimes|nullable|between:3,191',
         'permissions' => 'required',
      ], [], [
         'displayName' => __('formLabels.displayName'),
         'slug' => __('formLabels.slug'),
         'description' => __('formLabels.description'),
         'permission' => __('permission.title'),
      ]);

      $role = Role::create([
         'name' => $request->slug,
         'display_name' => $request->displayName,
         'description' => $request->description,
      ]);

      if ($role && $role->syncPermissions($request->permissions)) {
         $role = Role::where('id', $role->id)->with('permissions')->first();
         return ['status' => 'ok', 'message' => __('role.addSuccess'), 'data' => $role];
      } else {
         return response()->json(['status' => 'error', 'message' => __('role.addFailed')], 422);
      }
   }

   public function update(Request $request, Role $role) {
      $this->validate($request, [
         'displayName' => 'required|between:3,30',
         'description' => 'sometimes|nullable|between:3,191',
         'permissions' => 'required',
      ], [], [
         'displayName' => __('formLabels.displayName'),
         'description' => __('formLabels.description'),
         'permission' => __('permission.title'),
      ]);

      if ($role->name == 'owner' && !Auth::user()->hasRole('owner')) {
         return response()->json(['status' => 'error', 'errors' => trans('user.onlyOwnerCanEditOwner')], 422);
      }

      $updatedRole = $role->update([
         'display_name' => $request->displayName,
         'description' => $request->description,
      ]);

      if ($updatedRole && $role->syncPermissions($request->permissions)) {
         $role = Role::where('id', $role->id)->with('permissions')->first();
         return ['status' => 'ok', 'message' => __('role.updateSuccess'), 'data' => $role];
      } else {
         return response()->json(['status' => 'error', 'message' => __('role.updateFailed')], 422);
      }
   }
}
