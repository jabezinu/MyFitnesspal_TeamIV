<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminBaseController extends Controller
{
    public function __construct()
    {
        // Apply auth + admin middleware to all child controllers
        $this->middleware(['auth:sanctum', 'admin']);
    }
}
