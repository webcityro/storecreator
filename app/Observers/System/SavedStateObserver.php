<?php

namespace SC\Observers\System;

use SC\Models\System\SavedState;
use Auth;

class SavedStateObserver {
    public function creating(SavedState $savedState) {
      $savedState->storeID = Auth::user()->store()->id;
    }
}
