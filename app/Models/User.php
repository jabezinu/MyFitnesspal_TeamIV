<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = ['password', 'remember_token'];

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function goals()
    {
        return $this->hasMany(UserGoal::class);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
    public function checkIns()
    {
        return $this->hasMany(CheckIn::class);
    }
}
