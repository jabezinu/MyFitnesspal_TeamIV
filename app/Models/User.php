<?php

namespace App\Models;

use App\Models\CheckIn;
use App\Models\UserGoal;
use App\Models\UserProfile;
use App\Models\ExerciseDatabase;
use Laravel\Sanctum\HasApiTokens;
use App\Models\QuickExerciseEntries;
use App\Models\StrengthExerciseEntries;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
    public function exercises(){
        return $this->hasMany(ExerciseDatabase::class, 'created_by_user_id', 'id');
    }
    public function cardio(){
        return $this->hasMany(CardioExerciseEntries::class);
    }
    public function strength(){
        return $this->hasMany(StrengthExerciseEntries::class);
    }
    public function quick(){
        return $this->hasMany(QuickExerciseEntries::class);
    }
}
