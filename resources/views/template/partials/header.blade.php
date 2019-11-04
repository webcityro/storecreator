<div id="appHeader">
   <b-navbar :sticky="true" toggleable="md" id="header">
      @auth
         <a class="pill-left navbar-item" id="button-menu" @click="expendSideNavbar = !expendSideNavbar">
            <i :class="{fa: true, 'fa-outdent': expendSideNavbar, 'fa-indent': !expendSideNavbar, 'fa-lg': true}"></i>
         </a>
      @endif
      <b-navbar-brand href="{{ route('home') }}" class="navbar-item">StoreCreator</b-navbar-brand>
      <div class="navbar-item">@lang('generic.store'): @{{ currentStore.name }}</div>
      <b-navbar-toggle target="mainHeader"></b-navbar-toggle>
      <b-collapse is-nav id="mainHeader">
      @auth
         <b-navbar-nav class="ml-auto">
            <sc-saved-state-dropdown type="new" icon="far fa-file"></sc-saved-state-dropdown>
            <sc-saved-state-dropdown type="edit" icon="fas fa-save"></sc-saved-state-dropdown>
            <b-nav-item-dropdown text="{{ Auth::user()->getUsername() }}" right class="dropdown authDropdown navbar-item right">
               <b-dropdown-item href="{{ route('users.show') }}">{{ __('generic.yourProfile') }}</b-dropdown-item>
               <b-dropdown-divider></b-dropdown-divider>
               <b-dropdown-item href="{{ route('auth.logout') }}">{{ __('generic.logout') }}</b-dropdown-item>
            </b-nav-item-dropdown>
         </b-navbar-nav>
      @endauth
      </b-collapse>
   </b-navbar>
</div>