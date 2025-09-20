<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\FoodDiaryController;
use App\Http\Controllers\Api\QuickFoodEntryController;


Route::get('/', function () {
    return view('welcome');
});

