<?php

namespace SC\Notifications\Users;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ForgetPasswordNotification extends Notification {
    use Queueable;

    protected $token, $userName;

    public function __construct($token, $userName) {
        $this->token = $token;
        $this->userName = $userName;
    }

    public function via($notifiable) {
        return ['mail'];
    }

    public function toMail($notifiable) {
        return (new MailMessage)
            ->subject(__('auth.resetPasswordEmailSubject'))
            ->greeting(trans('generic.hello').', '.$this->userName)
            ->line(__('auth.resetPasswordEmailLine1'))
            ->action(__('auth.resetPassword'), url(config('app.url').route('auth.password.reset', ['token' => $this->token], false)))
            ->line(__('auth.resetPasswordEmailLine2'));
    }

    public function toArray($notifiable) {
        return [];
    }
}
