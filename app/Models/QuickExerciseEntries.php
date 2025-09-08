<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuickExerciseEntries extends Model
{
    use HasFactory;
    protected $primaryKey = 'quick_entry_id';
    protected $fillable = [
        'user_id', 'exercise_name', 'exercise_type',
        'duration_minutes', 'calories_burned', 'entry_date', 'notes'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
