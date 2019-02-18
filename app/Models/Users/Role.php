<?php

namespace SC\Models\Users;

use Laratrust\LaratrustRole;

class Role extends LaratrustRole {
   protected $fillable = ['name', 'display_name', 'description'];
}
