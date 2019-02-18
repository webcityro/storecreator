@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url'), 'greeting' => !empty($greeting) ? $greeting : '', 'level' => !empty($level) ? $level : ''])
            {{ config('app.name') }}
        @endcomponent
    @endslot

    {{-- Body --}}
    {{ $slot }}

    {{-- Subcopy --}}
    @isset($subcopy)
        @slot('subcopy')
            @component('mail::subcopy')
                {{ $subcopy }}
            @endcomponent
        @endslot
    @endisset

    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
            &copy; Copyright <a href="{{ config('app.url') }}">{{ config('app.name') }}</a>
            2019 {{ date('Y') > 2019 ? ' - '.date('Y') : '' }} @lang('generic.allRightsReserved')
        @endcomponent
    @endslot
@endcomponent
