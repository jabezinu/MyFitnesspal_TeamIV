<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\FoodItem;
use App\Models\Exercise;
use App\Models\ExerciseDashboard;
use Illuminate\Http\Request;

class AdminDashboardController extends AdminBaseController
{
    public function index()
    {
        $totalUsers = User::count();
        $pendingFoods = FoodItem::where('status', 'pending')->count();
        $pendingExercises = ExerciseDatabase::where('status', 'pending')->count();

        return response()->json([
            'total_users' => $totalUsers,
            'pending_foods' => $pendingFoods,
            'pending_exercises' => $pendingExercises,
            'message' => 'Admin Dashboard Overview'
        ]);
    }
}
