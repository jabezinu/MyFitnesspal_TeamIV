<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\FoodItem;
use App\Models\FoodDiaryEntry;
use App\Models\CheckIn;
use App\Models\ExerciseDatabase;
use App\Models\CardioExerciseEntries;
use App\Models\StrengthExerciseEntries;
use App\Models\QuickExerciseEntries;
use App\Models\QuickFoodEntry;
use App\Models\WaterEntry;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    // User engagement & stats
    public function users(Request $request)
    {
        try {
            $period = $request->get('period', 'month'); // day, week, month, year
            
            $totalUsers = User::count();
            $activeUsers = User::where('is_active', true)->count();
            $inactiveUsers = User::where('is_active', false)->count();
            
            // New users by period
            $newUsersQuery = User::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'));
            
            switch ($period) {
                case 'day':
                    $newUsers = $newUsersQuery->whereDate('created_at', Carbon::today())->get();
                    break;
                case 'week':
                    $newUsers = $newUsersQuery->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                        ->groupBy('date')->get();
                    break;
                case 'month':
                    $newUsers = $newUsersQuery->whereMonth('created_at', Carbon::now()->month)
                        ->whereYear('created_at', Carbon::now()->year)
                        ->groupBy('date')->get();
                    break;
                case 'year':
                    $newUsers = $newUsersQuery->whereYear('created_at', Carbon::now()->year)
                        ->groupBy(DB::raw('MONTH(created_at)'))
                        ->get();
                    break;
                default:
                    $newUsers = $newUsersQuery->groupBy('date')->orderBy('date', 'desc')->limit(30)->get();
            }

            return response()->json([
                'total_users' => $totalUsers,
                'active_users' => $activeUsers,
                'inactive_users' => $inactiveUsers,
                'new_users' => $newUsers,
                'period' => $period
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch user statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    // Most popular exercises
    public function exercises(Request $request)
    {
        try {
            $limit = $request->get('limit', 10);
            
            // Get popular cardio exercises
            $cardioExercises = CardioExerciseEntries::select(
                'exercise_id', 
                DB::raw('COUNT(*) as performed_count'),
                DB::raw('SUM(duration_minutes) as total_minutes'),
                DB::raw('SUM(calories_burned) as total_calories')
            )
            ->groupBy('exercise_id');
            
            // Get popular strength exercises
            $strengthExercises = StrengthExerciseEntries::select(
                'exercise_id', 
                DB::raw('COUNT(*) as performed_count'),
                DB::raw('SUM(sets) as total_sets'),
                DB::raw('SUM(calories_burned) as total_calories')
            )
            ->groupBy('exercise_id');
            
            // Combine both types of exercises
            $popularExercises = ExerciseDatabase::select(
                'exercise_databases.exercise_id',
                'exercise_databases.exercise_name',
                'exercise_databases.exercise_type',
                DB::raw('COALESCE(cardio.performed_count, 0) + COALESCE(strength.performed_count, 0) as total_count'),
                DB::raw('COALESCE(cardio.total_minutes, 0) as total_minutes'),
                DB::raw('COALESCE(cardio.total_calories, 0) + COALESCE(strength.total_calories, 0) as total_calories'),
                DB::raw('COALESCE(strength.total_sets, 0) as total_sets')
            )
            ->leftJoinSub($cardioExercises, 'cardio', function($join) {
                $join->on('exercise_databases.exercise_id', '=', 'cardio.exercise_id');
            })
            ->leftJoinSub($strengthExercises, 'strength', function($join) {
                $join->on('exercise_databases.exercise_id', '=', 'strength.exercise_id');
            })
            ->where(function($query) {
                $query->whereNotNull('cardio.exercise_id')
                    ->orWhereNotNull('strength.exercise_id');
            })
            ->orderByDesc('total_count')
            ->limit($limit)
            ->get();
            
            return response()->json($popularExercises);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch exercise statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    //  Most popular food
    public function food(Request $request)
    {
        try {
            $limit = $request->get('limit', 10);
            
            // Get popular foods from diary entries
            $popularFoods = FoodItem::select(
                'food_items.food_id',
                'food_items.food_name',
                'food_items.brand',
                DB::raw('COUNT(food_diary_entries.entry_id) as consumed_count'),
                DB::raw('SUM(food_diary_entries.serving_amount) as total_servings'),
                DB::raw('SUM(food_diary_entries.calories_consumed) as total_calories')
            )
            ->join('food_diary_entries', 'food_items.food_id', '=', 'food_diary_entries.food_id')
            ->groupBy('food_items.food_id', 'food_items.food_name', 'food_items.brand')
            ->orderByDesc('consumed_count')
            ->limit($limit)
            ->get();
            
            return response()->json($popularFoods);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch food statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    // System usage (login attempts / active sessions)
    public function systemUsage(Request $request)
    {
        try {
            $period = $request->get('period', 'week');
            
            // Get date range based on period
            $endDate = Carbon::now();
            switch ($period) {
                case 'day':
                    $startDate = Carbon::today();
                    break;
                case 'week':
                    $startDate = Carbon::now()->startOfWeek();
                    break;
                case 'month':
                    $startDate = Carbon::now()->startOfMonth();
                    break;
                case 'year':
                    $startDate = Carbon::now()->startOfYear();
                    break;
                default:
                    $startDate = Carbon::now()->subDays(7);
            }
            
            // Check if login_attempts table exists
            $loginAttemptsExists = DB::getSchemaBuilder()->hasTable('login_attempts');
            $userSessionsExists = DB::getSchemaBuilder()->hasTable('user_sessions');
            
            $loginStats = [];
            $sessionStats = [];
            
            if ($loginAttemptsExists) {
                $loginStats = DB::table('login_attempts')
                    ->select(
                        DB::raw('COUNT(*) as total_attempts'),
                        DB::raw('SUM(CASE WHEN success = true THEN 1 ELSE 0 END) as successful_attempts'),
                        DB::raw('SUM(CASE WHEN success = false THEN 1 ELSE 0 END) as failed_attempts')
                    )
                    ->whereBetween('attempted_at', [$startDate, $endDate])
                    ->first();
            }
            
            if ($userSessionsExists) {
                $sessionStats = DB::table('user_sessions')
                    ->select(DB::raw('COUNT(*) as active_sessions'))
                    ->where('is_active', true)
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->first();
            }
            
            return response()->json([
                'period' => $period,
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
                'login_attempts' => $loginStats,
                'active_sessions' => $sessionStats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch system usage statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    // 5️⃣ User progress: weight & activity summary
    public function userProgress($user_id)
    {
        try {
            $user = User::with('profile', 'goals')->findOrFail($user_id);
            
            // Weight trend
            $weightTrend = CheckIn::where('user_id', $user_id)
                ->orderBy('date')
                ->get(['date', 'weight_kg']);
            
            // Exercise calories
            $cardioCalories = CardioExerciseEntries::where('user_id', $user_id)->sum('calories_burned');
            $strengthCalories = StrengthExerciseEntries::where('user_id', $user_id)->sum('calories_burned');
            $quickCalories = QuickExerciseEntries::where('user_id', $user_id)->sum('calories_burned');
            
            // Food intake
            $foodCalories = FoodDiaryEntry::where('user_id', $user_id)->sum('calories_consumed');
            $quickFoodCalories = QuickFoodEntry::where('user_id', $user_id)->sum('calories');
            
            // Water intake
            $waterIntake = WaterEntry::where('user_id', $user_id)->sum('amount');
            
            // Weekly averages
            $startOfWeek = Carbon::now()->startOfWeek();
            $endOfWeek = Carbon::now()->endOfWeek();
            
            $weeklyExercise = CardioExerciseEntries::where('user_id', $user_id)
                ->whereBetween('entry_date', [$startOfWeek, $endOfWeek])
                ->select(
                    DB::raw('SUM(calories_burned) as calories_burned'),
                    DB::raw('SUM(duration_minutes) as minutes')
                )->first();
            
            $weeklyFood = FoodDiaryEntry::where('user_id', $user_id)
                ->whereBetween('entry_date', [$startOfWeek, $endOfWeek])
                ->select(DB::raw('SUM(calories_consumed) as calories_consumed'))
                ->first();
            
            $weeklyQuickFood = QuickFoodEntry::where('user_id', $user_id)
                ->whereBetween('entry_date', [$startOfWeek, $endOfWeek])
                ->select(DB::raw('SUM(calories) as calories_consumed'))
                ->first();
            
            $weeklyFoodCalories = ($weeklyFood->calories_consumed ?? 0) + ($weeklyQuickFood->calories_consumed ?? 0);
            
            return response()->json([
                'user' => $user->only('id', 'first_name', 'last_name', 'email', 'username'),
                'profile' => $user->profile,
                'goals' => $user->goals,
                'weight_trend' => $weightTrend,
                'exercise_summary' => [
                    'total_calories_burned' => $cardioCalories + $strengthCalories + $quickCalories,
                    'cardio_calories' => $cardioCalories,
                    'strength_calories' => $strengthCalories,
                    'quick_exercise_calories' => $quickCalories,
                ],
                'nutrition_summary' => [
                    'total_calories_consumed' => $foodCalories + $quickFoodCalories,
                    'food_diary_calories' => $foodCalories,
                    'quick_food_calories' => $quickFoodCalories,
                    'water_intake_ml' => $waterIntake,
                ],
                'weekly_summary' => [
                    'exercise_calories_burned' => $weeklyExercise->calories_burned ?? 0,
                    'exercise_minutes' => $weeklyExercise->minutes ?? 0,
                    'calories_consumed' => $weeklyFoodCalories,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch user progress: ' . $e->getMessage()
            ], 500);
        }
    }
    
    // 6️⃣ General system overview
    public function overview(Request $request)
    {
        try {
            $period = $request->get('period', 'month');
            
            // User statistics
            $userStats = [
                'total' => User::count(),
                'active' => User::where('is_active', true)->count(),
                'new_this_week' => User::where('created_at', '>=', Carbon::now()->startOfWeek())->count(),
                'new_this_month' => User::where('created_at', '>=', Carbon::now()->startOfMonth())->count(),
            ];
            
            // Content statistics
            $contentStats = [
                'food_items' => FoodItem::count(),
                'exercises' => ExerciseDatabase::count(),
                'pending_food_items' => FoodItem::where('is_verified', false)->count(),
                'pending_exercises' => ExerciseDatabase::where('is_verified', false)->count(),
            ];
            
            // Activity statistics
            $activityStats = [
                'food_entries' => FoodDiaryEntry::count(),
                'cardio_entries' => CardioExerciseEntries::count(),
                'strength_entries' => StrengthExerciseEntries::count(),
                'quick_exercise_entries' => QuickExerciseEntries::count(),
                'check_ins' => CheckIn::count(),
            ];
            
            // Recent activity
            $recentActivity = [
                'new_users' => User::orderBy('created_at', 'desc')->limit(5)->get(),
                'recent_checkins' => CheckIn::with('user')->orderBy('date', 'desc')->limit(10)->get(),
            ];
            
            return response()->json([
                'period' => $period,
                'user_statistics' => $userStats,
                'content_statistics' => $contentStats,
                'activity_statistics' => $activityStats,
                'recent_activity' => $recentActivity,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch system overview: ' . $e->getMessage()
            ], 500);
        }
    }
}