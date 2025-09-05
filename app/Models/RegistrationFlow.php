<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class RegistrationFlow extends Model
{
    use HasUuids;

    protected $fillable = ['current_step','data'];
    protected $casts = ['data' => 'array'];
    public $incrementing = false;
    protected $keyType = 'string';
}
