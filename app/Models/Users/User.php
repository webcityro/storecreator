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
        'storeID',
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

    public function stores() {
        return $this->morphToMany('SC\Models\System\Store', 'storeable');
    }

    public function store() {
        return $this->stores()->where('id', $this->storeID)->first();
    }

    public function savedStates() {
        return $this->hasMany('SC\Models\System\SavedState', 'userID')->where('storeID', $this->storeID);
    }
}
