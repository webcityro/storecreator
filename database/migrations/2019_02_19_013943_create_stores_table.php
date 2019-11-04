<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoresTable extends Migration {

   public function up() {
      Schema::create('stores', function (Blueprint $table) {
         $table->increments('id');
         $table->string('name');
         $table->string('url');
         $table->string('apiPublic');
         $table->string('apiSecret');
         $table->timestamps();
      });

      Schema::create('storeables', function (Blueprint $table) {
         $table->integer('store_id')->unsigned();
         $table->integer('storeable_id')->unsigned();
         $table->string('storeable_type');
      });
   }

   public function down() {
      Schema::dropIfExists('stores');
      Schema::dropIfExists('storeables');
   }
}
