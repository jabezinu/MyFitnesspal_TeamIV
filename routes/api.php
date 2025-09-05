<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GoalController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Registration flow (no auth required until complete)
Route::prefix('register')->group(function () {
    Route::post('/start', [RegistrationController::class, 'start']); // returns flow_id
    Route::post('/{flowId}/step', [RegistrationController::class, 'saveStep']); // body: { step: N, ... }
    Route::post('/{flowId}/complete', [RegistrationController::class, 'complete']); // email/password/username/agree_terms
});

// Authenticated user endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);

    Route::get('/goals', [GoalController::class, 'index']);
    Route::post('/goals', [GoalController::class, 'store']);
    Route::put('/goals/{goal}', [GoalController::class, 'update']);
    Route::delete('/goals/{goal}', [GoalController::class, 'destroy']);


    Route::get('/check-ins', [CheckInController::class, 'index']);
    Route::post('/check-ins', [CheckInController::class, 'store']);
});
