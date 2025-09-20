<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WaterEntry extends Model
{
      protected $table = 'water_entries';
      protected $primaryKey = 'entry_id';

    protected $fillable = [
        'user_id', 'amount', 'unit', 'entry_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
