<?php

namespace SC\Notifications\Users;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class AccountNotification extends Notification {
    use Queueable;

    protected $user,
              $password,
              $added;

    public function __construct($user, $password = false, $added = false) {
        $this->user = $user;
        $this->password = $password;
        $this->added = $added;
    }

    public function via($notifiable) {
        return ['mail'];
    }

    public function toMail($notifiable) {
        return (new MailMessage)
                    ->subject($this->added ? trans('user.newAccountTitle') : trans('user.accountUpdatedByAdmin'))
                    ->greeting(trans('generic.hello').', '.$this->user->getUsername())
                    ->markdown('emails.users.account', [
                        'greeting' => trans('generic.hello').', '.$this->user->getUsername(),
                        'user' => $this->user,
                        'password' => $this->password,
                        'lead' => $this->added ? trans('user.accountCreatedForYou') : trans('user.accountUpdatedByAdminLead')
                    ]);
    }

    public function toArray($notifiable) {
        return [];
    }
}
