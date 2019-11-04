const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/main.js', 'public/js/main.js')
    .js('resources/js/users/auth.js', 'public/js/users/auth.js')
    .js('resources/js/users/index.js', 'public/js/users/index.js')
    .js('resources/js/users/profile.js', 'public/js/users/profile.js')
    .sass('resources/sass/app.scss', 'public/css')
    .js(
        'resources/js/users/permissions/index.js',
        'public/js/users/permissions/index.js'
    )
    .js('resources/js/users/roles/index.js', 'public/js/users/roles/index.js')
    // .scripts(['resources/js/system/stores.js'], 'public/js/system/stores.js', 'public/js')
    .js('resources/js/system/stores.js', 'public/js/system/stores.js');

mix.copyDirectory('resources/images', 'public/images');
