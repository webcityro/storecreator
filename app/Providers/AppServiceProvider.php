<?php

namespace SC\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use SC\Models\System\Language;
use App;

class AppServiceProvider extends ServiceProvider {

   public function boot() {
      Schema::defaultStringLength(191);
      App::setLocale(Language::find(config('settings.system.languageID'))->code);
   }

   public function register() {
      //
   }
}
