<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id','sex','dob','country','region','city','postal_code',
        'height_cm','current_weight_kg','goal_weight_kg',
        'activity_level','workouts_per_week','minutes_per_workout',
        'email_opt_in','timezone','water_goal_ml',
        'page_title','about_me','topics','previous_attempts','join_reason',
        'family_info','why_get_in_shape','inspirations','avatar_url',
        'daily_calorie_goal',
    ];

    protected $casts = [
        'dob' => 'date',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
