<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardioExerciseEntries extends Model
{
    use HasFactory;

    protected $primaryKey = 'entry_id';
    protected $fillable = [
        'user_id', 'exercise_id', 'entry_date', 'duration_minutes',
        'calories_burned', 'distance', 'distance_unit', 'intensity_level', 
        'notes'];
    
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function exercise(){
        return $this->belongsTo(ExerciseDatabase::class, 'exercise_id', 'exercise_id');
    }
}
