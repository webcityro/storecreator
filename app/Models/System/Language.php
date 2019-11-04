<?php

namespace SC\Models\System;

use Illuminate\Database\Eloquent\Model;

class Language extends Model {
   protected $fillable = ['name', 'code', 'image', 'sortOrder', 'active'];

   public    $timestamps = false;
}
