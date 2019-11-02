<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use SC\Models\System\Store;

class LaratrustSeeder extends Seeder {
    protected $store;

    function __construct() {
        $this->store = Store::first();
    }

    public function run() {
        $this->command->info('Truncating User, Role and Permission tables');
        $this->truncateLaratrustTables();

        $config = config('laratrust_seeder.role_structure');
        $userPermission = config('laratrust_seeder.permission_structure');
        $mapPermission = collect(config('laratrust_seeder.permissions_map'));

        foreach ($config as $key => $modules) {
            // Create a new role
            $role = \SC\Models\Users\Role::create([
                'name' => $key,
                'display_name' => ucwords(str_replace("_", " ", $key)),
                'description' => ucwords(str_replace("_", " ", $key))
            ]);

            $this->command->info('Creating Role '. strtoupper($key));

            // Reading role permission modules
            foreach ($modules as $module => $value) {
                $permissions = explode(',', $value);

                foreach ($permissions as $p => $perm) {
                    $permissionValue = $mapPermission->get($perm);

                    $permission = \SC\Models\Users\Permission::firstOrCreate([
                        'name' => $permissionValue . '-' . $module,
                        'display_name' => ucfirst($permissionValue) . ' ' . ucfirst($module),
                        'description' => ucfirst($permissionValue) . ' ' . ucfirst($module),
                    ]);

                    $this->command->info('Creating Permission to '.$permissionValue.' for '. $module);

                    if (!$role->hasPermission($permission->name)) {
                        $role->attachPermission($permission);
                    } else {
                        $this->command->info($key . ': ' . $p . ' ' . $permissionValue . ' already exist');
                    }
                }
            }

            $this->command->info("Creating '{$key}' user");
            // Create default user for each role
            $user = \SC\Models\Users\User::create([
                'storeID' => $this->store->id,
                'firstName' => ucwords(str_replace("_", " ", $key)),
                'lastName' => ucwords(str_replace("_", " ", $key)),
                'userName' => $key,
                'email' => $key.'@app.com',
                'sex' => 'male',
                'password' => bcrypt('password'),
                'active' => true,
            ]);
            $user->attachRole($role);
        }

        // creating user with permissions
        if (!empty($userPermission)) {
            foreach ($userPermission as $key => $modules) {
                foreach ($modules as $module => $value) {
                    $permissions = explode(',', $value);
                    // Create default user for each permission set
                    $user = \SC\Models\Users\User::create([
                        'storeID' => $this->store->id,
                        'firstName' => ucwords(str_replace("_", " ", $key)),
                        'lastName' => ucwords(str_replace("_", " ", $key)),
                        'userName' => $key,
                        'email' => $key.'@app.com',
                        'sex' => 'male',
                        'password' => bcrypt('password'),
                        'active' => true,
                    ]);
                    foreach ($permissions as $p => $perm) {
                        $permissionValue = $mapPermission->get($perm);

                        $permission = \SC\Models\Users\Permission::firstOrCreate([
                            'name' => $permissionValue . '-' . $module,
                            'display_name' => ucfirst($permissionValue) . ' ' . ucfirst($module),
                            'description' => ucfirst($permissionValue) . ' ' . ucfirst($module),
                        ]);

                        $this->command->info('Creating Permission to '.$permissionValue.' for '. $module);

                        if (!$user->hasPermission($permission->name)) {
                            $user->attachPermission($permission);
                        } else {
                            $this->command->info($key . ': ' . $p . ' ' . $permissionValue . ' already exist');
                        }
                    }
                }
            }
        }
    }

    /**
     * Truncates all the laratrust tables and the users table
     * @return    void
     */
    public function truncateLaratrustTables()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        DB::table('permission_role')->truncate();
        DB::table('permission_user')->truncate();
        DB::table('role_user')->truncate();
        \SC\Models\Users\User::truncate();
        \SC\Models\Users\Role::truncate();
        \SC\Models\Users\Permission::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
