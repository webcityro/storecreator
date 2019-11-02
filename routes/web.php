<?php


Route::middleware(['guest'])->group(function () {
   Route::get('/auth/login', 'Auth\AuthController@getLogin')->name('auth.login');
   Route::post('/auth/login', 'Auth\AuthController@postLogin');

   Route::post('/auth/password/forget', 'Auth\ForgetPasswordController@sendResetLinkEmail')->name('auth.password.forget');
   Route::get('/auth/password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('auth.password.reset');
   Route::post('/auth/password/reset/{token}', 'Auth\ResetPasswordController@reset');
});

Route::middleware(['auth'])->group(function () {
   Route::get('/', 'HomeController@index')->name('home');

   Route::resource('/users', 'Users\UserController', ['except' => ['create', 'show', 'edit']])->middleware('permission:read-users');
   Route::put('/users/change_password', 'Users\UserController@changePassword')->name('users.changePassword');
   Route::get('/profile/{user?}', 'Users\UserController@show')->name('users.show');
   Route::put('/profile/update', 'Users\UserController@updateProfile')->name('profile.update');

   Route::resource('/users/permissions', 'Users\PermissionsController', ['except' => ['create', 'show', 'edit', 'destroy']])->middleware('permission:read-acl');
   Route::resource('/users/roles', 'Users\RolesController', ['except' => ['create', 'show', 'edit', 'destroy']])->middleware('permission:read-acl');

   Route::resource('/system/stores', 'System\StoresController', ['except' => ['create', 'show', 'edit']])->middleware('permission:read-stores');
   Route::put('/system/stores/activate/{store}', 'System\StoresController@activate')->middleware('permission:read-stores')->name('stores.activate');

   Route::get('/auth/logout', 'Auth\AuthController@getLogout')->name('auth.logout');

   Route::prefix('/ajax')->name('ajax.')->group(function () {
      Route::post('/saved_states/save/{id?}', 'System\AjaxController@saveCurrentState')->name('saveState.save');
      Route::post('/saved_states/current/{savedState?}', 'System\AjaxController@setCurrentState')->name('saveState.setCurrent');
   });

   Route::prefix('/test')->name('test.')->group(function () {
      Route::get('/form', 'Test\FormTestsController@index')->name('form');
      Route::get('/form/all_categories', 'Test\FormTestsController@getCategories')->name('getCategories');
      Route::get('/form/all_products', 'Test\FormTestsController@getProduct')->name('getProducts');
      Route::get('/form/get_total', 'Test\FormTestsController@getTotal')->name('getTotal');
      Route::get('/form/all_products', 'Test\FormTestsController@getProduct')->name('getProducts');
      Route::post('/form', 'Test\FormTestsController@store')->name('form.store');
   });
});

Route::prefix('/ajax')->name('ajax.')->group(function () {
   Route::get('system/stores/first', 'System\StoresController@getFirst')->name('stores.getFirst');
});

// Localization
Route::get('/js/global.js', function () {
   $savedState = auth()->check() ? auth()->user()->savedStates() : false;
   // $strings = Cache::rememberForever('lang.js', function () {
      $lang = config('app.locale');

      $files   = glob(resource_path('lang/' . $lang . '/*.php'));
      $strings = [];

      foreach ($files as $file) {
         $name           = basename($file, '.php');
         $strings[$name] = require $file;
      }

      // return $strings;
   // });

   header('Content-Type: text/javascript');
   echo 'window.languages = { all: '.SC\Models\System\Language::orderBy('sortOrder', 'asc')->get()->toJson()." };\n\r\n\r";

   echo 'window.authData = '.(auth()->check() ? '{
      data: ' . json_encode(auth()->user()) . ',
      roles: ' . json_encode(auth()->user()->roles) . ',
      permissions: ' . json_encode(auth()->user()->allPermissions()) . ',
      stores: ' . auth()->user()->stores()->with('settings')->with('users')->get()->toJson() . '
   };' : 'false;')."\n\r\n\r";

   echo('window.i18n = ' . json_encode($strings) . ';')."\n\r\n\r";

   echo 'window.saveStates = '.($savedState ? ($savedState->exists() ? $savedState->get() : 'false') : 'false').';';
   exit();
})->name('assets.global');
