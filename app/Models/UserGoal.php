<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserGoal extends Model
{
    protected $fillable = [
        'user_id','category','label','reasons','target_value','weekly_change_kg','is_primary','active'
    ];

    protected $casts = [
        'reasons' => 'array',
        'is_primary' => 'boolean',
        'active' => 'boolean',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
