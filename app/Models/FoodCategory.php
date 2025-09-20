<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class FoodCategory extends Model
{

    protected $table = 'food_categories';
    protected $primaryKey = 'category_id'; 
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = ['category_name'];

    public function items()
    {
        return $this->hasMany(FoodItem::class, 'category_id', 'category_id'); 
    }
}
