<?php

use Illuminate\Database\Seeder;
use SC\Models\System\Store;
use SC\Models\System\Language;

class SettingsSeeder extends Seeder {

   public function run() {
      Store::first()->settings()->createMany([
         [
            'code' => 'system',
            'key' => 'languageID',
            'value' => Language::where('code', 'en')->first()->id,
         ], [
            'code' => 'system',
            'key' => 'itemsPerPage',
            'value' => '10',
         ], [
            'code' => 'email',
            'key' => 'reply',
            'value' => 'support@app.com',
         ], [
            'code' => 'email',
            'key' => 'noreply',
            'value' => 'no-reply@app.com',
         ],
      ]);
   }
}
