<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CardioExerciseEntries as Cardio;
use App\Models\StrengthExerciseEntries as Strength;
use App\Models\QuickExerciseEntries as QuickExercise;
use App\Models\FoodDiaryEntry as FoodDiary;
use App\Models\QuickFoodEntry as QuickFood;
use App\Models\CheckIn;
use App\Models\UserGoal;
use App\Models\UserProfile;
use App\Models\WaterEntry;
use Carbon\Carbon;
use DB;

class ReportsController extends Controller
{
    /**
     * Daily report for a specific date
     */
    public function dailyReport(Request $request)
    {
        $userId = auth()->id();
        $date = $request->query('date', Carbon::today()->toDateString());
        
        // Get user profile for calorie goals
        $profile = UserProfile::where('user_id', $userId)->first();
        
        // Food
        $foodDiary = FoodDiary::where('user_id', $userId)
            ->whereDate('entry_date', $date)
            ->get();
        $quickFood = QuickFood::where('user_id', $userId)
            ->whereDate('entry_date', $date)
            ->get();

        $foodSummary = [
            'calories' => $foodDiary->sum('calories_consumed') + $quickFood->sum('calories'),
            'protein' => $foodDiary->sum('protein_consumed'),
            'carbs' => $foodDiary->sum('carbs_consumed'),
            'fat' => $foodDiary->sum('fat_consumed'),
            'fiber' => $foodDiary->sum('fiber_consumed'),
            'goal_calories' => $profile->daily_calorie_goal ?? null,
        ];

        // Exercise
        $cardio = Cardio::where('user_id', $userId)->whereDate('entry_date', $date)->get();
        $strength = Strength::where('user_id', $userId)->whereDate('entry_date', $date)->get();
        $quickExercise = QuickExercise::where('user_id', $userId)->whereDate('entry_date', $date)->get();

        $exerciseSummary = [
            'calories_burned' => $cardio->sum('calories_burned') + $strength->sum('calories_burned') + $quickExercise->sum('calories_burned'),
            'cardio_minutes' => $cardio->sum('duration_minutes'),
            'strength_sets' => $strength->sum('sets'),
            'quick_exercise_minutes' => $quickExercise->sum('duration_minutes'),
            'cardio' => $cardio,
            'strength' => $strength,
            'quick_exercises' => $quickExercise
        ];

        // Weight
        $weightEntry = CheckIn::where('user_id', $userId)->whereDate('date', $date)->first();
        
        // Water
        $water = WaterEntry::where('user_id', $userId)->whereDate('entry_date', $date)->sum('amount');

        // Calculate net calories
        $netCalories = $foodSummary['calories'] - $exerciseSummary['calories_burned'];

        return response()->json([
            'date' => $date,
            'weight_kg' => $weightEntry?->weight_kg ?? null,
            'food' => $foodSummary,
            'food_entries' => [
                'food_diary' => $foodDiary,
                'quick_food_entries' => $quickFood
            ],
            'exercise' => $exerciseSummary,
            'water_ml' => $water,
            'net_calories' => $netCalories,
            'calorie_goal_status' => $profile ? [
                'remaining' => max(0, ($profile->daily_calorie_goal - $netCalories)),
                'percentage' => $profile->daily_calorie_goal > 0 ? 
                    round(($netCalories / $profile->daily_calorie_goal) * 100, 2) : 0
            ] : null
        ]);
    }

    /**
     * Weekly / Monthly summary
     */
    public function summaryReport(Request $request)
    {
        $userId = auth()->id();
        $start = Carbon::parse($request->query('start_date'));
        $end = Carbon::parse($request->query('end_date'));
        
        // Get user profile for goals
        $profile = UserProfile::where('user_id', $userId)->first();
        $weightGoal = UserGoal::where('user_id', $userId)
            ->where('category', 'weight')
            ->where('active', true)
            ->first();

        // Food
        $foodDiary = FoodDiary::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->get();
        $quickFood = QuickFood::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->get();

        // Exercise
        $cardio = Cardio::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->get();
        $strength = Strength::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->get();
        $quickExercise = QuickExercise::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->get();

        // Weight
        $weightEntries = CheckIn::where('user_id', $userId)
            ->whereBetween('date', [$start, $end])
            ->get();
            
        // Water
        $waterEntries = WaterEntry::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->get();

        // Calculate days in period
        $days = $start->diffInDays($end) + 1;
        
        $totalCaloriesConsumed = $foodDiary->sum('calories_consumed') + $quickFood->sum('calories');
        $totalCaloriesBurned = $cardio->sum('calories_burned') + $strength->sum('calories_burned') + $quickExercise->sum('calories_burned');
        $averageDailyCalories = $days > 0 ? $totalCaloriesConsumed / $days : 0;

        $summary = [
            'period_days' => $days,
            'total_calories_consumed' => $totalCaloriesConsumed,
            'total_calories_burned' => $totalCaloriesBurned,
            'average_daily_calories_consumed' => round($averageDailyCalories, 2),
            'average_daily_calories_burned' => $days > 0 ? round($totalCaloriesBurned / $days, 2) : 0,
            'net_calories' => $totalCaloriesConsumed - $totalCaloriesBurned,
            'average_daily_weight_kg' => $weightEntries->avg('weight_kg'),
            'weight_change_kg' => $this->calculateWeightChange($weightEntries),
            'total_water_ml' => $waterEntries->sum('amount'),
            'average_daily_water_ml' => $days > 0 ? round($waterEntries->sum('amount') / $days, 2) : 0,
            'exercise_summary' => [
                'cardio_minutes' => $cardio->sum('duration_minutes'),
                'strength_sets' => $strength->sum('sets'),
                'quick_exercise_minutes' => $quickExercise->sum('duration_minutes'),
                'total_exercise_minutes' => $cardio->sum('duration_minutes') + $quickExercise->sum('duration_minutes')
            ],
            'macros' => [
                'protein' => $foodDiary->sum('protein_consumed'),
                'carbs' => $foodDiary->sum('carbs_consumed'),
                'fat' => $foodDiary->sum('fat_consumed'),
                'fiber' => $foodDiary->sum('fiber_consumed')
            ],
            'goal_comparison' => $this->calculateGoalComparison(
                $profile, 
                $weightGoal, 
                $weightEntries, 
                $averageDailyCalories,
                $totalCaloriesBurned,
                $days
            )
        ];

        return response()->json(array_merge([
            'start_date' => $start->toDateString(),
            'end_date' => $end->toDateString()
        ], $summary));
    }

    /**
     * Weight Trend
     */
    public function weightTrend(Request $request)
    {
        $userId = auth()->id();
        $start = Carbon::parse($request->query('start_date'));
        $end = Carbon::parse($request->query('end_date'));

        $weights = CheckIn::where('user_id', $userId)
            ->whereBetween('date', [$start, $end])
            ->orderBy('date')
            ->get(['date', 'weight_kg']);

        return response()->json([
            'weight_trend' => $weights,
            'start_date' => $start->toDateString(),
            'end_date' => $end->toDateString()
        ]);
    }

    /**
     * Compare actual intake and exercise with goals
     */
    public function goalsComparison(Request $request)
    {
        $userId = auth()->id();
        $start = Carbon::parse($request->query('start_date'));
        $end = Carbon::parse($request->query('end_date'));

        $profile = UserProfile::where('user_id', $userId)->first();
        $weightGoal = UserGoal::where('user_id', $userId)
            ->where('category', 'weight')
            ->where('active', true)
            ->first();

        // Get weight entries for the period
        $weightEntries = CheckIn::where('user_id', $userId)
            ->whereBetween('date', [$start, $end])
            ->orderBy('date')
            ->get();

        // Calculate calories
        $totalCaloriesConsumed = FoodDiary::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->sum('calories_consumed') +
            QuickFood::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->sum('calories');

        $totalCaloriesBurned = Cardio::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->sum('calories_burned') +
            Strength::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->sum('calories_burned') +
            QuickExercise::where('user_id', $userId)
            ->whereBetween('entry_date', [$start, $end])
            ->sum('calories_burned');

        $days = $start->diffInDays($end) + 1;
        $averageDailyCaloriesConsumed = $days > 0 ? $totalCaloriesConsumed / $days : 0;

        // Calculate weight change
        $weightChange = $this->calculateWeightChange($weightEntries);
        $latestWeight = $weightEntries->last() ? $weightEntries->last()->weight_kg : null;

        return response()->json([
            'period' => $start->toDateString() . ' to ' . $end->toDateString(),
            'days' => $days,
            'calorie_goal' => $profile?->daily_calorie_goal,
            'total_calories_consumed' => $totalCaloriesConsumed,
            'average_daily_calories_consumed' => round($averageDailyCaloriesConsumed, 2),
            'total_calories_burned' => $totalCaloriesBurned,
            'average_daily_calories_burned' => $days > 0 ? round($totalCaloriesBurned / $days, 2) : 0,
            'net_calories' => $totalCaloriesConsumed - $totalCaloriesBurned,
            'weight_goal_kg' => $weightGoal?->target_value,
            'current_weight_kg' => $latestWeight,
            'weight_change_kg' => $weightChange,
            'goal_progress' => [
                'calories' => $profile?->daily_calorie_goal ? 
                    round(($averageDailyCaloriesConsumed / $profile->daily_calorie_goal) * 100, 2) . '%' : null,
                'weight' => $this->calculateWeightGoalProgress($profile, $weightGoal, $weightChange)
            ]
        ]);
    }

    /**
     * Helper method to calculate weight change
     */
    private function calculateWeightChange($weightEntries)
    {
        if ($weightEntries->count() < 2) {
            return null;
        }

        $firstWeight = $weightEntries->first()->weight_kg;
        $lastWeight = $weightEntries->last()->weight_kg;

        return round($lastWeight - $firstWeight, 2);
    }

    /**
     * Helper method to calculate weight goal progress
     */
    private function calculateWeightGoalProgress($profile, $weightGoal, $weightChange)
    {
        if (!$profile || !$weightGoal || !$weightGoal->target_value || $weightChange === null) {
            return null;
        }

        $currentWeight = $profile->current_weight_kg;
        $targetWeight = $weightGoal->target_value;
        $neededChange = $targetWeight - $currentWeight;

        if ($neededChange == 0) {
            return "100%"; // Goal already achieved
        }

        $progress = abs($weightChange) / abs($neededChange) * 100;
        return round(min($progress, 100), 2) . '%';
    }

    /**
     * Helper method to calculate goal comparison
     */
    private function calculateGoalComparison($profile, $weightGoal, $weightEntries, $averageDailyCalories, $totalCaloriesBurned, $days)
    {
        if (!$profile) {
            return null;
        }

        $weightChange = $this->calculateWeightChange($weightEntries);
        $calorieGoal = $profile->daily_calorie_goal;

        $comparison = [
            'calories' => [
                'goal' => $calorieGoal,
                'actual' => round($averageDailyCalories, 2),
                'difference' => $calorieGoal ? round($averageDailyCalories - $calorieGoal, 2) : null,
                'met_goal' => $calorieGoal ? $averageDailyCalories <= $calorieGoal : null
            ],
            'exercise' => [
                'total_burned' => $totalCaloriesBurned,
                'daily_average_burned' => $days > 0 ? round($totalCaloriesBurned / $days, 2) : 0
            ]
        ];

        if ($weightGoal && $weightGoal->target_value) {
            $comparison['weight'] = [
                'goal' => $weightGoal->target_value,
                'current' => $weightEntries->last() ? $weightEntries->last()->weight_kg : null,
                'change' => $weightChange,
                'progress' => $this->calculateWeightGoalProgress($profile, $weightGoal, $weightChange)
            ];
        }

        return $comparison;
    }
}





// namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\CardioExerciseEntries as Cardio;
// use App\Models\StrengthExerciseEntries as Strength;
// use App\Models\QuickExerciseEntries as QuickExercise;
// use App\Models\FoodDiaryEntry as FoodDiary;
// use App\Models\QuickFoodEntry as QuickFood;
// use App\Models\CheckIn;
// use App\Models\UserGoal;
// use App\Models\UserProfile;
// use Carbon\Carbon;
// use DB;

// class ReportsController extends Controller
// {
//     /**
//      * Daily report for a specific date
//      */
//     public function dailyReport(Request $request)
//     {
//         $userId = auth()->id();
//         $date = $request->query('date', Carbon::today()->toDateString());

//         // Food
//         $foodDiary = FoodDiary::where('user_id', $userId)
//             ->whereDate('entry_date', $date)
//             ->get();
//         $quickFood = QuickFood::where('user_id', $userId)
//             ->whereDate('entry_date', $date)
//             ->get();

//         $foodSummary = [
//             'calories' => $foodDiary->sum('calories_consumed') + $quickFood->sum('calories'),
//             'protein' => $foodDiary->sum('protein_consumed'),
//             'carbs' => $foodDiary->sum('carbs_consumed'),
//             'fat' => $foodDiary->sum('fat_consumed'),
//             'fiber' => $foodDiary->sum('fiber_consumed'),
//         ];

//         // Exercise
//         $cardio = Cardio::where('user_id', $userId)->whereDate('entry_date', $date)->get();
//         $strength = Strength::where('user_id', $userId)->whereDate('entry_date', $date)->get();
//         $quickExercise = QuickExercise::where('user_id', $userId)->whereDate('entry_date', $date)->get();

//         $exerciseSummary = [
//             'calories_burned' => $cardio->sum('calories_burned') + $strength->sum('calories_burned') + $quickExercise->sum('calories_burned'),
//             'cardio' => $cardio,
//             'strength' => $strength,
//             'quick_exercises' => $quickExercise
//         ];

//         // Weight
//         $weightEntry = CheckIn::where('user_id', $userId)->whereDate('date', $date)->first();

//         return response()->json([
//             'date' => $date,
//             'weight_kg' => $weightEntry?->weight_kg ?? null,
//             'food' => $foodSummary,
//             'food_entries' => [
//                 'food_diary' => $foodDiary,
//                 'quick_food_entries' => $quickFood
//             ],
//             'exercise' => $exerciseSummary
//         ]);
//     }

//     /**
//      * Weekly / Monthly summary
//      */
//     public function summaryReport(Request $request)
//     {
//         $userId = auth()->id();
//         $start = Carbon::parse($request->query('start_date'));
//         $end = Carbon::parse($request->query('end_date'));

//         // Food
//         $foodDiary = FoodDiary::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->get();
//         $quickFood = QuickFood::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->get();

//         // Exercise
//         $cardio = Cardio::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->get();
//         $strength = Strength::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->get();
//         $quickExercise = QuickExercise::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->get();

//         // Weight
//         $weightEntries = CheckIn::where('user_id', $userId)->whereBetween('date', [$start, $end])->get();

//         $summary = [
//             'total_calories_consumed' => $foodDiary->sum('calories_consumed') + $quickFood->sum('calories'),
//             'total_calories_burned' => $cardio->sum('calories_burned') + $strength->sum('calories_burned') + $quickExercise->sum('calories_burned'),
//             'average_daily_weight_kg' => $weightEntries->avg('weight_kg'),
//             'exercise_summary' => [
//                 'cardio_minutes' => $cardio->sum('duration_minutes'),
//                 'strength_sets' => $strength->sum('sets'),
//                 'quick_exercise_minutes' => $quickExercise->sum('duration_minutes')
//             ],
//             'macros' => [
//                 'protein' => $foodDiary->sum('protein_consumed'),
//                 'carbs' => $foodDiary->sum('carbs_consumed'),
//                 'fat' => $foodDiary->sum('fat_consumed'),
//                 'fiber' => $foodDiary->sum('fiber_consumed')
//             ]
//         ];

//         return response()->json(array_merge([
//             'start_date' => $start->toDateString(),
//             'end_date' => $end->toDateString()
//         ], $summary));
//     }

//     /**
//      * Weight Trend
//      */
//     public function weightTrend(Request $request)
//     {
//         $userId = auth()->id();
//         $start = Carbon::parse($request->query('start_date'));
//         $end = Carbon::parse($request->query('end_date'));

//         $weights = CheckIn::where('user_id', $userId)
//             ->whereBetween('date', [$start, $end])
//             ->orderBy('date')
//             ->get(['date', 'weight_kg']);

//         return response()->json([
//             'weight_trend' => $weights
//         ]);
//     }

//     /**
//      * Compare actual intake and exercise with goals
//      */
//     public function goalsComparison(Request $request)
//     {
//         $userId = auth()->id();
//         $start = Carbon::parse($request->query('start_date'));
//         $end = Carbon::parse($request->query('end_date'));

//         $profile = UserProfile::where('user_id', $userId)->first();
//         $goal = UserGoal::where('user_id', $userId)->first();

//         $totalCaloriesConsumed = FoodDiary::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->sum('calories_consumed') +
//             QuickFood::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->sum('calories');

//         $totalCaloriesBurned = Cardio::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->sum('calories_burned') +
//             Strength::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->sum('calories_burned') +
//             QuickExercise::where('user_id', $userId)->whereBetween('entry_date', [$start, $end])->sum('calories_burned');

//         $latestWeight = CheckIn::where('user_id', $userId)->whereBetween('date', [$start, $end])
//             ->latest('date')->first()?->weight ?? null;

//         $weightChange = $latestWeight ? $latestWeight - $profile->current_weight_kg : null;

//         return response()->json([
//             'period' => $start->toDateString() . ' to ' . $end->toDateString(),
//             // 'calorie_goal' => $profile?->daily_calorie_goal,
//             'average_daily_calories_consumed' => $totalCaloriesConsumed / $start->diffInDays($end) + 1,
//             'calories_burned' => $totalCaloriesBurned,
//             'weight_goal_kg' => $goal?->target_value,
//             'current_weight_kg' => $latestWeight,
//             'weight_change_kg' => $weightChange,
//             'goal_progress' => [
//                 // 'calories' => $profile?->daily_calorie_goal ? round(($totalCaloriesConsumed / ($profile->daily_calorie_goal * ($start->diffInDays($end) + 1))) * 100, 2) . '%' : null,
//                 'weight' => $goal?->target_value && $weightChange ? round(abs($weightChange) / abs($goal->target_value - $profile->current_weight_kg) * 100, 2) . '%' : null
//             ]
//         ]);
//     }
// }
