<?php

use Illuminate\Database\Seeder;
use SC\Models\System\Language;

class LanguagesSeeder extends Seeder {
   public function run() {
      Language::insert([
         [
            'name' => 'Englesh',
            'code' => 'en',
            'image' => 'EN_us.gif',
            'sortOrder' => 1,
            'active' => true,
         ], [
            'name' => 'Romana',
            'code' => 'ro',
            'image' => 'RO_ro.gif',
            'sortOrder' => 2,
            'active' => true,
         ]
      ]);
   }
}
