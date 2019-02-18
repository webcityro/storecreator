<footer id="footer">
   <a href="#">{{ config('app.name') }}</a>
   &copy; 2019 {{ date('Y') > 2019 ? ' - '.date('Y') : '' }} @lang('generic.allRightsReserved')<br>
   @lang('generic.version') {{ config('app.version') }}
</footer>