<?php

namespace SC\Models\Users;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laratrust\Traits\LaratrustUserTrait;
use SC\Notifications\Users\ForgetPasswordNotification;

class User extends Authenticatable {
    use Notifiable;
    use LaratrustUserTrait;

    protected $fillable = [
        'userName',
        'firstName',
        'lastName',
        'email',
        'sex',
        'password',
        'lastLogin',
        'lastLogout',
        'active'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ],
    $appends = ['displayName'];

    public function getUsername() {
        return $this->userName.' ('.$this->email.')';
    }

    public function getDisplayNameAttribute() {
        return $this->attributes['displayName'] = $this->getUsername();
    }

    public function sendPasswordResetNotification($token) {
        $this->notify(new ForgetPasswordNotification($token, $this->getUsername()));
    }
}
