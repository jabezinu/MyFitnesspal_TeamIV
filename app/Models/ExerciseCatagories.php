<?php

namespace App\Models;

use App\Models\ExerciseDatabase;
use Illuminate\Database\Eloquent\Model;

class ExerciseCatagories extends Model
{
    public function exercise(){
        return $this->hasMany(ExerciseDatabase::class, 'exercise_id', 'exercise_id');
    }
}
