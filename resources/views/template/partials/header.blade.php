<div id="appHeader">
   <b-navbar :sticky="true" toggleable="md" id="header">
      @auth
         <a class="pill-left navbar-item" id="button-menu" @click="expendSideNavbar = !expendSideNavbar">
            <i :class="{fa: true, 'fa-outdent': expendSideNavbar, 'fa-indent': !expendSideNavbar, 'fa-lg': true}"></i>
         </a>
      @endif
      <b-navbar-brand href="{{ route('home') }}" class="navbar-item">StoreCreator</b-navbar-brand>
      <b-navbar-toggle target="mainHeader"></b-navbar-toggle>
      <b-collapse is-nav id="mainHeader">
      @auth
         <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="{{ Auth::user()->getUsername() }}" right class="dropdown authDropdown navbar-item">
               <b-dropdown-item href="{{ route('users.show') }}">{{ __('generic.yourProfile') }}</b-dropdown-item>
               <b-dropdown-divider></b-dropdown-divider>
               <b-dropdown-item href="{{ route('auth.logout') }}">{{ __('generic.logout') }}</b-dropdown-item>
            </b-nav-item-dropdown>
         </b-navbar-nav>
      @endauth
      </b-collapse>
   </b-navbar>
</div>


{{-- <header class="navbar sticky-top" id="header">
   <div class="navbar-header">
      @auth
         <a class="pill-left navbar-item" id="button-menu">
            <i class="fa fa-indent fa-lg"></i>
         </a>
      @endif
      <a href="{{ route('home') }}" class="navbar-brand navbar-item">StoreCreator</a>
   </div>
   @auth
      <ul class="nav pull-right" id="rightNav">


         <li class="dropdown authDropdown navbar-item">
            <a class="dropdown-toggle" id="authDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ Auth::user()->email }}</a>
            <div class="dropdown-menu pull-right" aria-labelledby="authDropdown">
               <a class="dropdown-item" href="{{ route('users.show') }}">{{ __('generic.yourProfile') }}</a>
               <div class="dropdown-divider"></div>
               <a class="dropdown-item" href="{{ route('auth.logout') }}">{{ __('generic.logout') }}</a>
            </div>
         </li>
      </ul>
   @endif
</header> --}}



         {{--  {% if persistentData.newData|length > 0 %}
            <li class="pull-left dropdown" id="persistent-items-new">
               <a class="dropdown-toggle lead prtsistentDataIcon" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="far fa-file"><span class="badge">{{ persistentData.newData|length }}</span></i></a>
               <ul class="dropdown-menu">
                  {% for persistDara in persistentData.newData %}
                      <li class="dropdown-item" data-id="{{ persistDara.id }}">
                        <a href="#" class="persistent-item">{{ persistDara.name }}</a>
                        <a href="#" class="persistent-item-delete"><i class="far fa-trash-alt"></i></a>
                      </li>
                  {% endfor %}
               </ul>
            </li>
         {% endif %}
         {% if persistentData.editData|length > 0 %}
            <li class="pull-left dropdown" id="persistent-items-edit">
               <a class="dropdown-toggle lead prtsistentDataIcon" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="far fa-edit"><span class="badge">{{ persistentData.editData|length }}</span></i></a>
               <ul class="dropdown-menu">
                  {% for persistDara in persistentData.editData %}
                      <li class="dropdown-item" data-id="{{ persistDara.id }}">
                        <a href="#" class="persistent-item">{{ persistDara.name }}</a>
                        <a href="#" class="persistent-item-delete"><i class="far fa-trash-alt"></i></a>
                      </li>
                  {% endfor %}
               </ul>
            </li>
         {% endif %} --}}
         {{-- <li class="pull-right dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ Auth::user()->email }} <span class="caret"></span></a>
            <ul id="userDropdown" class="dropdown-menu">
               <li><a href="#">{{ __('generic.yourProfile') }}</a></li>
               <li><a href="{{ route('auth.logout') }}">{{ __('generic.logout') }}</a></li>
            </ul>
         </li> --}}