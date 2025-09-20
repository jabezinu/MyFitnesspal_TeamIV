<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;  
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\QuickExercisesController;
use App\Http\Controllers\CardioExercisesController;
use App\Http\Controllers\ExerciseDatabaseController;
use App\Http\Controllers\StrengthExercisesController;

use App\Http\Controllers\Api\FoodDiaryController;
use App\Http\Controllers\Api\QuickFoodEntryController;
use App\Http\Controllers\Api\WaterEntryController;
use App\Http\Controllers\ReportsController as UserReportsController;
use App\Http\Controllers\Api\UserNotificationController;
use App\Http\Controllers\Api\UserSessionController;

// Admin UserController
// use App\Http\Controllers\Admin\AdminDashboardController;
// use App\Http\Controllers\Admin\AdminUserController;
// use App\Http\Controllers\Admin\AdminFoodCategoryController;
// use App\Http\Controllers\Admin\AdminFoodItemController;
// use App\Http\Controllers\Admin\AdminExerciseCategoryController;
// use App\Http\Controllers\Admin\AdminExerciseController;
// use App\Http\Controllers\Admin\AdminReportController;
// use App\Http\Controllers\Admin\AdminSettingsController;
// use App\Http\Controllers\Admin\AdminNotificationController;
// use App\Http\Controllers\Admin\AdminQuickFoodController;


// Authentication routes
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
    // profile routes
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    // goals route
    Route::get('/goals', [GoalController::class, 'index']);
    Route::post('/goals', [GoalController::class, 'store']);
    Route::put('/goals/{goal}', [GoalController::class, 'update']);
    Route::delete('/goals/{goal}', [GoalController::class, 'destroy']);
    // check-ins route
    Route::get('/check-ins', [CheckInController::class, 'index']);     
    Route::post('/check-ins', [CheckInController::class, 'store']);
    // exercise database routes
    Route::get('/exercises',[ExerciseDatabaseController::class, 'index']);
    Route::get('/exercises/mine',[ExerciseDatabaseController::class, 'myExercises']);
    Route::get('/exercises/search', [ExerciseDatabaseController::class, 'search']);
    Route::get('/exercises/{id}',[ExerciseDatabaseController::class, 'show']);
    Route::post('/exercises',[ExerciseDatabaseController::class, 'store']);
    Route::put('/exercises/{id}',[ExerciseDatabaseController::class, 'update']);
    Route::delete('/exercises/{id}',[ExerciseDatabaseController::class, 'destroy']);
    // Cardio exercises routes
    Route::get('/cardio-entries', [CardioExercisesController::class, 'index']);
    Route::post('/cardio-entries', [CardioExercisesController::class, 'store']);
    Route::get('/cardio-entries/{id}', [CardioExercisesController::class, 'show']);
    Route::put('/cardio-entries/{id}', [CardioExercisesController::class, 'update']);
    Route::delete('/cardio-entries/{id}', [CardioExercisesController::class, 'destroy']);
    // Strength exercises routes
    Route::get('/strength-entries', [StrengthExercisesController::class, 'index']);
    Route::post('/strength-entries', [StrengthExercisesController::class, 'store']);
    Route::get('/strength-entries/{id}', [StrengthExercisesController::class, 'show']);
    Route::put('/strength-entries/{id}', [StrengthExercisesController::class, 'update']);
    Route::delete('/strength-entries/{id}', [StrengthExercisesController::class, 'destroy']);
    // Quick exercises routes
    Route::get('/quick-entries', [QuickExercisesController::class, 'index']);
    Route::post('/quick-entries', [QuickExercisesController::class, 'store']);
    Route::get('/quick-entries/{id}', [QuickExercisesController::class, 'show']);
    Route::put('/quick-entries/{id}', [QuickExercisesController::class, 'update']);
    Route::delete('/quick-entries/{id}', [QuickExercisesController::class, 'destroy']);
    // Food Diary routes
    Route::get('/foods', [FoodDiaryController::class, 'searchFoods']);       // search food items
    Route::get('/diary', [FoodDiaryController::class, 'index']);             // get user diary
    Route::post('/diary', [FoodDiaryController::class, 'store']);            // add food to diary
    Route::delete('/diary/{id}', [FoodDiaryController::class, 'destroy']);   // delete food entry
    Route::get('/daily-summary', [FoodDiaryController::class, 'dailySummary']); // nutrition summary(food + quick foods)
    // Quick Food Routes
    Route::get('/quick-foods', [QuickFoodEntryController::class, 'index']);     // list quick foods
    Route::post('/quick-foods', [QuickFoodEntryController::class, 'store']);    // add quick entry
    Route::delete('/quick-foods/{id}', [QuickFoodEntryController::class, 'destroy']); // delete quick entry
    // Water entry routes
    Route::get('/water', [WaterEntryController::class, 'index']);
    Route::post('/water', [WaterEntryController::class, 'store']);
    Route::delete('/water/{id}', [WaterEntryController::class, 'destroy']);

    Route::get('/notifications', [UserNotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [UserNotificationController::class, 'unreadCount']);
    Route::put('/notifications/{id}/read', [UserNotificationController::class, 'markAsRead']);
    Route::put('/notifications/read-all', [UserNotificationController::class, 'markAllAsRead']);

    Route::get('/sessions', [UserSessionController::class, 'index']);
    Route::delete('/sessions/{sessionId}', [UserSessionController::class, 'destroy']);

        // Daily Report
    Route::get('/report/daily', [UserReportsController::class, 'dailyReport'])
        ->name('report.daily');
    // Weekly / Monthly Summary
    Route::get('/report/summary', [UserReportsController::class, 'summaryReport'])
        ->name('report.summary');
    // Weight Trend
    Route::get('/report/weight-trend', [UserReportsController::class, 'weightTrend'])
        ->name('report.weightTrend');
    // Compare Intake / Exercise with Goals
    Route::get('/report/goals-comparison', [UserReportsController::class, 'goalsComparison'])
        ->name('report.goalsComparison');



    Route::fallback(function () {
        return response()->json([
            'message' => 'API endpoint not found. Please check the documentation.'
        ], 404);
    });
});


//     // Admin routes
// Route::middleware(['auth:sanctum','admin'])->prefix('admin')->group(function() {
//     // Dashboard
//     Route::get('/dashboard', [AdminDashboardController::class, 'index']);
//     // Users
//     Route::get('/users', [AdminUserController::class, 'index']);
//     Route::post('/users', [AdminUserController::class, 'store']);
//     Route::get('/users/{id}', [AdminUserController::class, 'show']);
//     Route::put('/users/{id}', [AdminUserController::class, 'update']);
//     Route::delete('/users/{id}', [AdminUserController::class, 'destroy']);
//     Route::get('/users/{id}/goals', [AdminUserController::class, 'goals']);
//     Route::get('/users/{id}/checkins', [AdminUserController::class, 'checkins']);
//     Route::patch('/users/{userId}/toggle-status', [AdminUserController::class, 'toggleStatus']);
//     Route::get('/users/{id}/stats', [AdminUserController::class, 'stats']);

//     // Food Categories
//     Route::get('/food-categories', [AdminFoodCategoryController::class, 'index']);
//     Route::post('/food-categories', [AdminFoodCategoryController::class, 'store']);
//     Route::put('/food-categories/{id}', [AdminFoodCategoryController::class, 'update']);
//     Route::delete('/food-categories/{id}', [AdminFoodCategoryController::class, 'destroy']);

//     // Quick Foods
//     Route::get('/quick-foods', [AdminQuickFoodController::class, 'index']);
//     Route::get('/quick-foods/pending', [AdminQuickFoodController::class, 'pending']);
//     Route::get('/quick-foods/{id}', [AdminQuickFoodController::class, 'show']);
//     Route::post('/quick-foods/{id}/approve', [AdminQuickFoodController::class, 'approve']);
//     Route::post('/quick-foods/{id}/reject', [AdminQuickFoodController::class, 'reject']);
//     // Food Items
//     Route::get('/food-items', [AdminFoodItemController::class, 'index']);
//     Route::get('/food-items/pending', [AdminFoodItemController::class, 'pending']);
//     Route::get('/food-items/{id}', [AdminFoodItemController::class, 'show']);
//     Route::post('/food-items', [AdminFoodItemController::class, 'store']);
//     Route::put('/food-items/{id}', [AdminFoodItemController::class, 'update']);
//     Route::delete('/food-items/{id}', [AdminFoodItemController::class, 'destroy']);
    
//     // Exercise Categories
//     Route::get('/exercise-categories', [AdminExerciseCategoryController::class, 'index']);
//     Route::post('/exercise-categories', [AdminExerciseCategoryController::class, 'store']);
//     Route::put('/exercise-categories/{id}', [AdminExerciseCategoryController::class, 'update']);
//     Route::delete('/exercise-categories/{id}', [AdminExerciseCategoryController::class, 'destroy']);

//     // Exercises
//     Route::get('/exercises', [AdminExerciseController::class, 'index']);
//     Route::get('/exercises/pending', [AdminExerciseController::class, 'pending']);
//     Route::get('/exercises/rejected', [AdminExerciseController::class, 'rejected']);
//     Route::get('/exercises/{id}', [AdminExerciseController::class, 'show']);
//     Route::post('/exercises', [AdminExerciseController::class, 'store']);
//     Route::put('/exercises/{id}', [AdminExerciseController::class, 'update']);
//     Route::delete('/exercises/{id}', [AdminExerciseController::class, 'destroy']);
//     Route::put('/exercises/{id}/approve', [AdminExerciseController::class, 'approve']);
//     Route::put('/exercises/{id}/reject', [AdminExerciseController::class, 'reject']);
//     Route::post('/exercises/{id}/restore', [AdminExerciseController::class, 'restore']);

//     // Reports
//     Route::get('/reports/users', [AdminReportController::class, 'users']);
//     Route::get('/reports/foods', [AdminReportController::class, 'food']);
//     Route::get('/reports/exercises', [AdminReportController::class, 'exercises']);
//     Route::get('/reports/system-usage', [AdminReportController::class, 'systemUsage']);
//     Route::get('/reports/user-progress/{user_id}', [AdminReportController::class, 'userProgress']);
//     Route::get('/reports/overview', [AdminReportController::class, 'overview']);

//     // Settings
//     // Route::get('/settings', [AdminSettingsController::class, 'index']);
//     // Route::get('/settings/{key}', [AdminSettingsController::class, 'show']);
//     // Route::post('/settings', [AdminSettingsController::class, 'store']);
//     // Route::put('/settings/{key}', [AdminSettingsController::class, 'update']);
//     // Route::delete('/settings/{key}', [AdminSettingsController::class, 'destroy']);
//     // Route::get('/settings/group/{group}', [AdminSettingsController::class, 'byGroup']);
//     // Route::get('/settings/groups', [AdminSettingsController::class, 'groups']);

//     // Notifications
//     Route::get('/notifications', [AdminNotificationController::class, 'index']);
//     Route::post('/notifications', [AdminNotificationController::class, 'store']);
//     // Route::put('/notifications/{id}/read', [AdminNotificationController::class, 'markRead']);
//     // Route::put('/notifications/{userId}/read-all', [AdminNotificationController::class, 'markAllRead']);
//     Route::delete('/notifications/{id}', [AdminNotificationController::class, 'destroy']);
//     Route::get('/notifications/stats', [AdminNotificationController::class, 'stats']);

//     Route::fallback(function () {
//         return response()->json([
//             'message' => 'API endpoint not found. Please check the documentation.'
//         ], 404);
//     });

// });