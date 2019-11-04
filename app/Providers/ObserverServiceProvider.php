<?php

namespace SC\Providers;

use Illuminate\Support\ServiceProvider;
use SC\Models\System\SavedState;
use SC\Observers\System\SavedStateObserver;

class ObserverServiceProvider extends ServiceProvider {

    public function boot() {
        SavedState::observe(SavedStateObserver::class);
    }

    public function register() {

    }
}
