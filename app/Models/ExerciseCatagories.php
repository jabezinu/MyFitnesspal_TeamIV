<?php

namespace App\Models;

use App\Models\ExerciseDatabase;
use Illuminate\Database\Eloquent\Model;

class ExerciseCatagories extends Model
{
    protected $table = 'exercise_caragories';
    protected $primaryKey = 'catagory_id';

    protected $fillable = [
        'catagory_name',
        'catagory_type',
        'description',
    ];

    const UPDATED_AT = null;

    public function exercise(){
        return $this->hasMany(ExerciseDatabase::class, 'exercise_id', 'exercise_id');
    }
}
