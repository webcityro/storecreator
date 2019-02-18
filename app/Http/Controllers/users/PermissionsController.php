<?php

namespace SC\Http\Controllers\Users;

use Illuminate\Http\Request;
use SC\Http\Controllers\Controller;
use SC\Models\Users\Permission;
use SC\Models\Users\Role;
use SC\Libs\Filter;

class PermissionsController extends Controller {

   function __construct() {
      $this->middleware('permission:create-acl')->only('store');
      $this->middleware('permission:update-acl')->only('update');
   }

   public function index() {
      $permissions = new Filter(new Permission, ['id', 'name', 'display_name'], 10);
      return $permissions->get('users.permissions.index', 'permissions');
   }

   public function store(Request $request) {
      $owner = Role::where('name', 'owner')->first();

      if ($request->type == 'basic') {
         $this->validate($request, [
            'displayName' => 'required|between:3,30',
            'slug' => 'required|between:3,35|alphadash|unique:permissions,name',
            'description' => 'sometimes|between:3,191',
         ], [], [
            'displayName' => __('formLabels.displayName'),
            'slug' => __('formLabels.slug'),
            'description' => __('formLabels.description'),
         ]);

         $permission = Permission::create([
            'name' => $request->slug,
            'display_name' => $request->displayName,
            'description' => $request->description,
         ]);

         if ($permission) {
            $owner->permissions()->attach($permission);

            return ['status' => 'ok', 'message' => __('permission.addSuccess'), 'data' => $permission];
         } else {
            return response()->json(['status' => 'error', 'message' => __('permission.addFailed')], 422);
         }
      } else if ($request->type == 'crud') {
         $this->validate($request, [
            'resource' => 'required|between:3,30',
            'resourceCRUD' => 'required',
         ], [], [
            'resource' => __('formLabels.displayName'),
            'resourceCRUD' => __('formLabels.slug'),
         ]);

         $alreadyExists = [];
         $added = [];
         $failed = [];

         foreach ($request->resourceCRUD as $action) {
            $actionDisplayName = ucfirst($action).' '.ucfirst($request->resource);
            $actionSlug = strtolower($action).'-'.preg_replace("/\s+/", '-', strtolower($request->resource));
            $actionDescription = __('permission.crudTableDesc', ['action' => strtoupper($action), 'resource' => ucfirst($request->resource)]);

            if (Permission::where('name', $actionSlug)->count()) {
               $alreadyExists[$action] = $actionSlug;
               continue;
            }

            $permission = Permission::create([
               'name' => $actionSlug,
               'display_name' => $actionDisplayName,
               'description' => $actionDescription,
            ]);

            if ($permission) {
               $added[$permission->id] = $permission;
            } else {
               $failed[$action] = $actionDisplayName;
            }
         }

         $owner->permissions()->attach(array_keys($added));

         if (count($failed) == 0) {
            return ['status' => 'ok', 'data' => ['added' => $added], 'message' => __('permission.allResourcesAdded')];
         } else if (count($alreadyExists)) {
            return response()->json(['status' => 'error', 'data' => ['added' => $added, 'alreadyExists' => $alreadyExists], 'errors' => ['resourcePerissions' => [__('permission.alreadyExists', ['slugs' => join(', ', $alreadyExists)])]]], 422);
         } else if (count($failed) < count($request->resourceCRUD) && !empty($failed)) {
            return response()->json(['status' => 'error', 'data' => ['added' => $added, 'failed' => $failed], 'errors' => ['resourcePerissions' => [__('permission.notAllAdded', ['names' => join(', ', $failed)])]]], 422);
         } else {
            return response()->json(['status' => 'error', 'message' => __('permission.resourceNotAdded')], 422);
         }
      }
   }

   public function update(Request $request, Permission $permission) {
      $this->validate($request, [
         'displayName' => 'required|between:3,30',
         'description' => 'sometimes|between:3,191',
      ], [], [
         'displayName' => __('formLabels.displayName'),
         'description' => __('formLabels.description'),
      ]);

      $permissionUpdated = $permission->update([
         'display_name' => $request->displayName,
         'description' => $request->description,
      ]);

      if ($permissionUpdated) {
         return ['status' => 'ok', 'message' => __('permission.updateSuccess'), 'data' => $permission];
      } else {
         return response()->json(['status' => 'error', 'message' => __('permission.updateFailed')], 422);
      }
   }
}
