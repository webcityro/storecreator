<?php

use Illuminate\Database\Seeder;
use SC\Models\System\Store;

class StoresSeeder extends Seeder {
   public function run() {
      $store = new Store;

      $store->name = 'default';
      $store->url = config('app.url');
      $store->apiPublic = md5('public');
      $store->apiSecret = md5('secret');
      $store->save();
   }
}
