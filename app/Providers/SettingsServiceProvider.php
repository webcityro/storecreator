<?php

namespace SC\Providers;

use Illuminate\Support\ServiceProvider;
use SC\Models\System\Store;
use Auth;

class SettingsServiceProvider extends ServiceProvider {
    public function boot() {
        $store = Auth::guest() ? Store::first() : Store::where('id', Auth::user()->storeID)->first();

        config()->set(['store.id' => $store->id]);
        config()->set(['store.name' => $store->name]);
        config()->set(['store.apiPublic' => $store->apiPublic]);
        config()->set(['store.apiSecret' => $store->apiSecret]);

        foreach ($store->settings()->get() as $setting) {
            config()->set(['settings.'.$setting->code.'.'.$setting->key => $setting->serialize ? json_decode($setting->value, true) : $setting->value]);
        }
    }

    public function register() {

    }
}
