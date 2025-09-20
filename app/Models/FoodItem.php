<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


    
class FoodItem extends Model
{

    protected $table = 'food_items';
    protected $primaryKey = 'food_id'; 
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'food_name','brand','category_id',
        'serving_size','serving_unit',
        'calories_per_serving','protein_per_serving','carbs_per_serving','fat_per_serving',
        'fiber_per_serving','sugar_per_serving','sodium_per_serving','created_by_user_id'
    ];

    public function category()
    {
        return $this->belongsTo(FoodCategory::class, 'category_id', 'category_id'); 
    }

    public function diaryEntries()
    {
        return $this->hasMany(FoodDiaryEntry::class, 'food_id', 'food_id');
    }
}
