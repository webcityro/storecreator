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

	Route::get('/auth/logout', 'Auth\AuthController@getLogout')->name('auth.logout');
});


Route::get('/js/auth.js', function () {
	header('Content-Type: text/javascript');
	echo 'window.authData = '.(auth()->check() ? '{data: ' . json_encode(auth()->user()) . ', roles: ' . json_encode(auth()->user()->roles) . ', permissions: ' . json_encode(auth()->user()->allPermissions()) . '};' : 'false;');
	exit();
})->name('assets.auth');

// Localization
Route::get('/js/lang.js', function () {
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
	echo('window.i18n = ' . json_encode($strings) . ';');
	exit();
})->name('assets.lang');