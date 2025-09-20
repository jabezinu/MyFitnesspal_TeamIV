<?php

namespace App\Models;

use App\Models\User;
use App\Models\ExerciseCatagories;
use App\Models\CardioExerciseEntries;
use App\Models\StrengthExerciseEntries;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExerciseDatabase extends Model
{
    use HasFactory;
    protected $primaryKey = 'exercise_id';

    protected $fillable = [
        'exercise_name', 'catagory_id', 'exercise_type', 'calories_per_minute',
        'description', 'instructions', 'muscle_groups', 'equipment_needed', 
        'difficulty_level', 'created_by_user_id', 'is_rejected','rejected_at','rejection_reason','is_verified',
        'is_public'];

    protected $casts = [
        'muscle_groups'=>'array',
        'is_verified'=>'boolean',
        'is_public'=>'boolean',
        'is_rejected' => 'boolean', 
        'rejected_at' => 'datetime'
    ];

    public function catagory(){
        return $this->belongsTo(ExerciseCatagories::class, 'catagory_id', 'catagory_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'created_by_user_id', 'id');
    }

    public function cardio(){
        return $this->hasMany(CardioExerciseEntries::class,'exercise_id', 'exercise_id');
    }

    public function strength(){
        return $this->hasMany(StrengthExerciseEntries::class,'exercise_id', 'exercise_id');
    }

    public function scopeNotRejected($query)
    {
        return $query->where('is_rejected', false);
    }

    public function scopeRejected($query)
    {
        return $query->where('is_rejected', true);
    }
}
