<?php

namespace SC\Models\System;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model {
   protected $fillable = ['storeID', 'code', 'key', 'value', 'serialize'];

   public    $timestamps = false;
}
