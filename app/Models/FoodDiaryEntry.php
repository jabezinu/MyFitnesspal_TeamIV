<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class FoodDiaryEntry extends Model
{
    protected $table = 'food_diary_entries';
    protected $primaryKey = 'entry_id'; 
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'food_id',
        'meal_type',
        'serving_amount', 
        'entry_date',
        'calories_consumed',
        'protein_consumed',
        'carbs_consumed',
        'fat_consumed',
        'fiber_consumed',
    ];

  
     public function foodItem()
    {
        return $this->belongsTo(FoodItem::class, 'food_id', 'food_id');
    }

    public function user() { // relationship to User model
        return $this->belongsTo(User::class);
    }
}
