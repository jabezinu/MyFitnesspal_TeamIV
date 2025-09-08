<?php

// namespace App\Http\Controllers;

// use App\Models\UserGoal;
// use Illuminate\Http\Request;

// class GoalController extends Controller
// {
//     /**
//      * Map symbolic weekly goal to kg/week
//      */
//     private function mapWeeklyGoalToKg(string $weeklyGoal): float
//     {
//         $map = [
//             'gain_0_5' => 0.2268,   // 0.5 lb → kg
//             'gain_1'   => 0.4536,
//             'lose_0_5' => -0.2268,
//             'lose_1'   => -0.4536,
//             'lose_1_5' => -0.6804,
//             'lose_2'   => -0.9072,
//             'maintain' => 0.0,
//         ];

//         return $map[$weeklyGoal] ?? 0.0;
//     }

//     /**
//      * Convert lbs to kg
//      */
//     private function lbsToKg($lbs)
//     {
//         return round($lbs * 0.45359237, 2);
//     }

//     public function index(Request $request)
//     {
//         return $request->user()->goals()->get();
//     }

//     public function store(Request $request)
//     {
//         $validated = $request->validate([
//             'category' => 'required|in:weight,fitness,nutrition,stress',
//             'label' => 'required|string|max:80',
//             'reasons' => 'nullable|array',
//             'target_value' => 'nullable|numeric', // input in lbs
//             'weekly_goal' => 'nullable|string|in:gain_0_5,gain_1,lose_0_5,lose_1,lose_1_5,lose_2,maintain',
//             'is_primary' => 'boolean',
//         ]);

//         $user = $request->user();

//         // Convert target_value from lbs → kg
//         if (!empty($validated['target_value'])) {
//             $validated['target_value'] = $this->lbsToKg($validated['target_value']);
//         }

//         // Map symbolic weekly_goal to kg
//         if (!empty($validated['weekly_goal'])) {
//             $validated['weekly_change_kg'] = $this->mapWeeklyGoalToKg($validated['weekly_goal']);
//             unset($validated['weekly_goal']);
//         }

//         // Enforce weight consistency for weight goals
//         if (($validated['category'] ?? null) === 'weight') {
//             $current = $user->profile->current_weight_kg ?? null;
//             $goal    = $validated['target_value'] ?? null;
//             $weekly  = $validated['weekly_change_kg'] ?? null;

//             if ($current && $goal && $weekly !== null) {
//                 if ($current > $goal && $weekly > 0) {
//                     return response()->json([
//                         'error' => 'Invalid goal: cannot aim to gain weight when your goal is below your current weight.'
//                     ], 422);
//                 }
//                 if ($current < $goal && $weekly < 0) {
//                     return response()->json([
//                         'error' => 'Invalid goal: cannot aim to lose weight when your goal is above your current weight.'
//                     ], 422);
//                 }
//             }
//         }

//         // Create the goal
//         $goal = $user->goals()->create($validated);

//         // Ensure single primary goal
//         if ($validated['is_primary'] ?? false) {
//             $user->goals()->where('id', '!=', $goal->id)->update(['is_primary' => false]);
//         }

//         return response()->json($goal, 201);
//     }

//     public function update(Request $request, UserGoal $goal)
//     {
//         abort_if($goal->user_id !== $request->user()->id, 403);

//         $validated = $request->validate([
//             'reasons' => 'nullable|array',
//             'target_value' => 'nullable|numeric', // input in lbs
//             'weekly_goal' => 'nullable|string|in:gain_0_5,gain_1,lose_0_5,lose_1,lose_1_5,lose_2,maintain',
//             'is_primary' => 'boolean',
//             'active' => 'boolean',
//         ]);

//         $user = $request->user();

//         // Convert target_value from lbs → kg
//         if (!empty($validated['target_value'])) {
//             $validated['target_value'] = $this->lbsToKg($validated['target_value']);
//         }

//         // Map symbolic weekly_goal to kg
//         if (!empty($validated['weekly_goal'])) {
//             $validated['weekly_change_kg'] = $this->mapWeeklyGoalToKg($validated['weekly_goal']);
//             unset($validated['weekly_goal']);
//         }

//         // Enforce weight consistency for weight goals
//         if ($goal->category === 'weight') {
//             $current = $user->profile->current_weight_kg ?? null;
//             $target  = $validated['target_value'] ?? $goal->target_value;
//             $weekly  = $validated['weekly_change_kg'] ?? $goal->weekly_change_kg;

//             if ($current && $target && $weekly !== null) {
//                 if ($current > $target && $weekly > 0) {
//                     return response()->json([
//                         'error' => 'Invalid update: cannot gain weight when your goal is lower than current.'
//                     ], 422);
//                 }
//                 if ($current < $target && $weekly < 0) {
//                     return response()->json([
//                         'error' => 'Invalid update: cannot lose weight when your goal is higher than current.'
//                     ], 422);
//                 }
//             }
//         }

//         // Update the goal
//         $goal->update($validated);

//         // Ensure single primary goal
//         if (($validated['is_primary'] ?? null) === true) {
//             $user->goals()->where('id', '!=', $goal->id)->update(['is_primary' => false]);
//         }

//         return response()->json($goal);
//     }

//     public function destroy(Request $request, UserGoal $goal)
//     {
//         abort_if($goal->user_id !== $request->user()->id, 403);
//         $goal->delete();

//         return response()->json(['message' => 'Deleted']);
//     }
// }









namespace App\Http\Controllers;

use App\Models\UserGoal;
use Illuminate\Http\Request;
use App\Services\ProfileService;

class GoalController extends Controller
{
    /**
     * Map symbolic weekly goal to kg/week
     */
    private function mapWeeklyGoalToKg(string $weeklyGoal): float
    {
        $map = [
            'gain_0_5' => 0.2268,   // 0.5 lb → kg
            'gain_1'   => 0.4536,
            'lose_0_5' => -0.2268,
            'lose_1'   => -0.4536,
            'lose_1_5' => -0.6804,
            'lose_2'   => -0.9072,
            'maintain' => 0.0,
        ];

        return $map[$weeklyGoal] ?? 0.0;
    }

    /**
     * Convert lbs to kg (kept rounding consistent with other places)
     */
    private function lbsToKg($lbs)
    {
        return round($lbs * 0.45359237, 2);
    }

    public function index(Request $request)
    {
        return $request->user()->goals()->get();
    }

    public function store(Request $request)
    {
        // unchanged validation fields (kept your original names)
        $validated = $request->validate([
            'category' => 'required|in:weight,fitness,nutrition,stress',
            'label' => 'required|string|max:80',
            'reasons' => 'nullable|array',
            'target_value' => 'nullable|numeric', // input in lbs
            'weekly_goal' => 'nullable|string|in:gain_0_5,gain_1,lose_0_5,lose_1,lose_1_5,lose_2,maintain',
            'is_primary' => 'boolean',
        ]);

        $user = $request->user();

        // Convert target_value from lbs → kg if provided (no variable renames)
        if (!empty($validated['target_value'])) {
            $validated['target_value'] = $this->lbsToKg($validated['target_value']);
        }

        // Map symbolic weekly_goal → weekly_change_kg (keeps 'weekly_goal' request param)
        if (!empty($validated['weekly_goal'])) {
            $validated['weekly_change_kg'] = $this->mapWeeklyGoalToKg($validated['weekly_goal']);
            unset($validated['weekly_goal']);
        }

        // Weight consistency checks (unchanged logic)
        if (($validated['category'] ?? null) === 'weight') {
            $current = $user->profile->current_weight_kg ?? null;
            $goal    = $user->profile->goal_weight_kg ?? null;
            $weekly  = $validated['weekly_change_kg'] ?? null;

            if ($current && $goal && $weekly !== null) {
                if ($current > $goal && $weekly > 0) {
                    return response()->json([
                        'error' => 'Invalid goal: cannot aim to gain weight when your goal is below your current weight.'
                    ], 422);
                }
                if ($current < $goal && $weekly < 0) {
                    return response()->json([
                        'error' => 'Invalid goal: cannot aim to lose weight when your goal is above your current weight.'
                    ], 422);
                }
            }
        }

        // Create the goal
        $goal = $user->goals()->create($validated);

        // Ensure single primary goal (unchanged)
        if ($validated['is_primary'] ?? false) {
            $user->goals()->where('id', '!=', $goal->id)->update(['is_primary' => false]);
        }

        // --- CHANGED: Recalculate profile calories when any weight goal is created with weekly change.
        // Rationale: weekly_change_kg should affect daily calorie goal even when goal is not primary.
        if ($goal->category === 'weight' && !is_null($goal->weekly_change_kg)) {
            ProfileService::updateCurrentWeightAndCalories($user, $user->profile->current_weight_kg);
        }

        return response()->json($goal, 201);
    }

    public function update(Request $request, UserGoal $goal)
    {
        abort_if($goal->user_id !== $request->user()->id, 403);

        $validated = $request->validate([
            'reasons' => 'nullable|array',
            'target_value' => 'nullable|numeric', // input in lbs
            'weekly_goal' => 'nullable|string|in:gain_0_5,gain_1,lose_0_5,lose_1,lose_1_5,lose_2,maintain',
            'is_primary' => 'boolean',
            'active' => 'boolean',
        ]);

        $user = $request->user();

        // Convert target_value from lbs → kg
        if (!empty($validated['target_value'])) {
            $validated['target_value'] = $this->lbsToKg($validated['target_value']);
        }

        // Map symbolic weekly_goal → weekly_change_kg
        if (!empty($validated['weekly_goal'])) {
            $validated['weekly_change_kg'] = $this->mapWeeklyGoalToKg($validated['weekly_goal']);
            unset($validated['weekly_goal']);
        }

        // Weight consistency checks (unchanged logic)
        if ($goal->category === 'weight') {
            $current = $user->profile->current_weight_kg ?? null;
            $target  = $user->profile->goal_weight_kg ?? null;
            $weekly  = $validated['weekly_change_kg'] ?? $goal->weekly_change_kg;

            if ($current && $target && $weekly !== null) {
                if ($current > $target && $weekly > 0) {
                    return response()->json([
                        'error' => 'Invalid update: cannot gain weight when your goal is lower than current.'
                    ], 422);
                }
                if ($current < $target && $weekly < 0) {
                    return response()->json([
                        'error' => 'Invalid update: cannot lose weight when your goal is higher than current.'
                    ], 422);
                }
            }
        }

        // Update the goal record
        $goal->update($validated);

        // Ensure single primary goal if requested
        if (($validated['is_primary'] ?? null) === true) {
            $user->goals()->where('id', '!=', $goal->id)->update(['is_primary' => false]);
        }

        // --- CHANGED: whenever *a weight goal* is updated we recalculate profile calories.
        // Rationale: weekly_change_kg (or changing the primary flag) can change the effective weekly change used by the app.
        if ($goal->category === 'weight') {
            ProfileService::updateCurrentWeightAndCalories($user, $user->profile->current_weight_kg);
        }

        return response()->json($goal);
    }

    public function destroy(Request $request, UserGoal $goal)
    {
        try {
            // Check ownership
            if ($goal->user_id !== $request->user()->id) {
                return response()->json([
                    'error' => 'You are not allowed to delete this goal.'
                ], 403);
            }

            $user = $request->user();
            $wasWeight = $goal->category === 'weight' && !is_null($goal->weekly_change_kg);

            $goal->delete();

            // If we deleted a weight goal (which might have been used for calories), recalc using remaining goals
            if ($wasWeight) {
                ProfileService::updateCurrentWeightAndCalories($user, $user->profile->current_weight_kg);
            }

            return response()->json([
                'message' => 'Goal deleted successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An unexpected error occurred: ' . $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }
}
