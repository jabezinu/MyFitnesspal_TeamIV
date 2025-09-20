<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuickFoodEntry extends Model
{

    protected $table = 'quick_food_entries';
    protected $primaryKey = 'quick_entry_id'; 
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id','food_name','meal_type','calories','entry_date','notes','status'
    ];

    public function user() { // relationship to User model
        return $this->belongsTo(User::class);
    }
}
