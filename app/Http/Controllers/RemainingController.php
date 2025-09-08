<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProfile;
use App\Models\FoodLog;
use App\Models\ExerciseLog;

class RemainingController extends Controller
{
    /**
     * Get calorie overview for the logged-in user
     */
    public function calorieOverview(Request $request)
    {
        $user = $request->user();

        // Fetch daily calorie goal
        $profile = $user->profile;
        if (!$profile) {
            return response()->json([
                'error' => 'User profile not found.'
            ], 404);
        }

        $goal = $profile->daily_calorie_goal ?? 0;

        // Fetch calories consumed from food today
        $foodCalories = FoodLog::where('user_id', $user->id)
            ->whereDate('created_at', now())
            ->sum('calories');

        // Fetch calories burned from exercise today
        $exerciseCalories = ExerciseLog::where('user_id', $user->id)
            ->whereDate('created_at', now())
            ->sum('calories');

        // Calculate remaining calories
        $remaining = $goal - $foodCalories + $exerciseCalories;

        return response()->json([
            'goal' => $goal,
            'food' => $foodCalories,
            'exercise' => $exerciseCalories,
            'remaining' => $remaining
        ]);
    }
}
