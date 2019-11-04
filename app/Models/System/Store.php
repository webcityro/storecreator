<?php

namespace SC\Models\System;

use Illuminate\Database\Eloquent\Model;

class Store extends Model {
   protected $fillable = ['name', 'url', 'apiPublic', 'apiSecret'];

   public function settings() {
      return $this->morphedByMany('SC\Models\System\Setting', 'storeable');
   }

   public function users() {
      return $this->morphedByMany('SC\Models\Users\user', 'storeable');
   }
}
