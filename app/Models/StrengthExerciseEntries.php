<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StrengthExerciseEntries extends Model
{
    use HasFactory;
    protected $primaryKey = 'entry_id';
    protected $fillable = [
        'user_id', 'exercise_id', 'entry_date', 'sets', 'reps_per_set', 
        'weight_per_set', 'weight_unit', 'rest_time_seconds', 'calories_burned', 'notes'
    ];

    protected $casts = [
        'reps_per_set'=>'array',
        'weight_per_set'=>'array'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function exercise(){
        return $this->belongsTo(ExerciseDatabase::class, 'exercise_id', 'exercise_id');
    }
}
