<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <!-- CSRF Token -->
      <meta name="csrf-token" content="{{ csrf_token() }}">

      <title>@yield('title') - {{ config('app.name') }}</title>

      <!-- Scripts -->
      <script src="{{ asset('js/laroute.js') }}"></script>
      <script src="{{ asset('js/global.js') }}"></script>
      <script src="{{ asset('js/app.js') }}"></script>

      <!-- Styles -->
      <link href="{{ asset('css/app.css') }}" rel="stylesheet">

      @yield('head')
   </head>
   <body>
      <div id="app">
         <div id="appFlash">
            <b-alert class="text-center" :variant="type == 'error' ? 'danger' : type" :show="show">@{{ message }}</b-alert>
         </div>
         <div id="container">
            @include('template.partials.header')
            @auth
               <div id="column-left" :class="{active: expendSideNavbar}">
                  <sc-side-navigation></sc-side-navigation>
               </div>
            @endauth

            <div id="content">
               @yield('content')
            </div>
            @include('template.partials.footer')
         </div>
      </div>
      <script src="{{ asset('js/main.js') }}"></script>

      @foreach (['success', 'info', 'warning', 'error'] as $key)
         @if (Session::has($key))
            <script>
               flashMessage('{{ $key }}', '{{ Session::get($key) }}');
            </script>
         @endif
      @endforeach

      @yield('bodyEnd')
   </body>
</html>
