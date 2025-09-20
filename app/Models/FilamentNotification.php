<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\DatabaseNotification;

class FilamentNotification extends DatabaseNotification
{
    use HasFactory;

    protected $table = 'user_notifications'; // Set the custom table name

    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
    ];
}