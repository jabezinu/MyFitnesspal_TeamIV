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
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Filament\Models\Contracts\FilamentUser;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, Notifiable, HasFactory;

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

    public function userSessions()
    {
        return $this->hasMany(UserSession::class);
    }

    public function createSessionRecord($tokenId, $tokenName = 'auth')
    {
        // This assumes you have a 'user_sessions' relationship defined
        return $this->userSessions()->create([
            'session_id' => $tokenId, // This is the ID of the token in the 'personal_access_tokens' table
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'created_at' => now(),
            'expires_at' => now()->addWeeks(2), // Match Sanctum's expiration if you set one
            'is_active' => true,
        ]);
    }

    public function getNameAttribute(): string
    {
        if ($this->first_name && $this->last_name) {
            return trim("{$this->first_name} {$this->last_name}");
        }
        
        if ($this->username) {
            return $this->username;
        }
        
        return $this->email;
    }

    // Keep this method as well for Filament v3
    // public function getFilamentName(): string
    // {
    //     return $this->name; // Use the accessor we just created
    // }
    
    // public function getFilamentName(): string
    // {
    //     if ($this->first_name && $this->last_name) {
    //         return "{$this->first_name} {$this->last_name}";
    //     }
        
    //     if ($this->username) {
    //         return $this->username;
    //     }
        
    //     return $this->email;
    // }

    public function canAccessPanel(\Filament\Panel $panel): bool
    {
        return $this->role === 'admin';
    }
}
