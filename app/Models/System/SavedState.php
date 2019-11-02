<?php

namespace SC\Models\System;

use Illuminate\Database\Eloquent\Model;

class SavedState extends Model {
   protected $fillable = ['userID', 'storeID', 'itemID', 'languageID', 'type', 'nameField', 'current', 'data'];
}
