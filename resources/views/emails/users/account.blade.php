@component('mail::message', ['greeting' => !empty($greeting) ? $greeting : '', 'level' => !empty($level) ? $level : ''])
<p>{{ $lead }}</p>

<table>
<tr><th style="text-align: left">@lang('formLabels.firstName')</th><td>{{ $user->firstName }}</td></tr>
<tr><th style="text-align: left">@lang('formLabels.lastName')</th><td>{{ $user->lastName }}</td></tr>
<tr><th style="text-align: left">@lang('formLabels.userName')</th><td>{{ $user->userName }}</td></tr>
@if (!empty($password))
    <tr><th style="text-align: left">@lang('formLabels.password')</th><td>{{ $password }}</td></tr>
@endif
<tr><th style="text-align: left">@lang('formLabels.email')</th><td>{{ $user->email }}</td></tr>
<tr><th style="text-align: left">@lang('formLabels.sex')</th><td>@lang('formLabels.sex'.ucfirst($user->sex))</td></tr>
</table>

<p>@lang('user.rolesAttribuedToYou')</p>

@if ($user->roles->count())
<ul>
@foreach ($user->roles as $r)
<li><strong>{{ $r->display_name }}</strong> <em>({{ $r->description }})</em></li>
@endforeach
</ul>
@else
<p>@lang('user.youHaveNoRores')</p>
@endif

@endcomponent
