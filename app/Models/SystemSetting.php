<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use App\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    use HasFactory;

    protected $table = 'system_settings';

    protected $fillable = [
        'user_id',
        'setting_key',
        'setting_value',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        // 'setting_value' => 'array', // Use this if you want to store JSON in the setting_value field
    ];

    /**
     * Get the user that owns the setting.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
