<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class CheckIn extends Model
{
    protected $fillable = ['user_id', 'weight_kg', 'date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
