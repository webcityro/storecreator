<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSavedStatesTabel extends Migration {

   public function up() {
      Schema::create('saved_states', function (Blueprint $table) {
         $table->increments('id');
         $table->integer('userID')->unsigned()->index();
         $table->integer('storeID')->unsigned()->index();
         $table->integer('itemID')->unsigned();
         $table->integer('languageID')->unsigned();
         $table->string('type');
         $table->string('nameField')->nullable();
         $table->boolean('current');
         $table->longText('data');
         $table->timestamps();
      });
   }

   public function down() {
      Schema::dropIfExists('saved_states');
   }
}
