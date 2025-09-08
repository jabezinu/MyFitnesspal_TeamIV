<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Exercise;
use App\Models\Food;
use App\Models\QuickFoodEntry;
use App\Models\ExerciseEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportsController extends AdminBaseController
{
    // Active users in the last 30 days
    public function activeUsers()
    {
        $count = User::where('is_active', true)->count();
        return response()->json(['active_users' => $count],200);
    }

    // Average calories logged per day by all users
    public function avgCalories()
    {
        $avgCalories = QuickFoodEntry::where('status','approved')
            ->select(DB::raw('AVG(calories) as avg_calories'))
            ->first();

        return response()->json(['avg_calories' => $avgCalories->avg_calories ?? 0],200);
    }

    // Most commonly logged exercises
    public function commonExercises()
    {
        $exercises = ExerciseEntry::select('exercise_id', DB::raw('COUNT(*) as total'))
            ->groupBy('exercise_id')
            ->orderByDesc('total')
            ->take(10)
            ->with('exercise:id,name')
            ->get();

        return response()->json($exercises,200);
    }

    // User-generated foods
    public function userFoods()
    {
        $foods = Food::where('created_by_user', true)->get();
        return response()->json($foods,200);
    }

    // User-generated exercises
    public function userExercises()
    {
        $exercises = Exercise::where('created_by_user', true)->get();
        return response()->json($exercises,200);
    }

    // Incomplete entries (missing calories/nutrients)
    public function incompleteEntries()
    {
        $foods = Food::whereNull('calories')->orWhereNull('protein')->orWhereNull('carbs')->orWhereNull('fat')->get();
        $exercises = Exercise::whereNull('calories_burned')->get();

        return response()->json([
            'incomplete_foods' => $foods,
            'incomplete_exercises' => $exercises
        ],200);
    }

     public function systemUsage()
    {
        $activeUsers = User::where('is_active', true)->count();
        $totalFoods = FoodItem::count();
        $totalExercises = Exercise::count();

        return response()->json([
            'active_users' => $activeUsers,
            'total_foods' => $totalFoods,
            'total_exercises' => $totalExercises,
        ]);
    }

    public function weightTrends()
    {
        $weights = DB::table('weight_entries')
            ->select('entry_date', DB::raw('AVG(weight) as avg_weight'))
            ->groupBy('entry_date')
            ->get();

        return response()->json($weights);
    }

    public function foodExerciseEntries()
    {
        $foodsLogged = DB::table('food_entries')->count();
        $exercisesLogged = DB::table('exercise_entries')->count();

        return response()->json([
            'foods_logged' => $foodsLogged,
            'exercises_logged' => $exercisesLogged,
        ]);
    }
}
