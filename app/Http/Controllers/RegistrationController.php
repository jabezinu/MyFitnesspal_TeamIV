<?php

// namespace App\Http\Controllers;

// use App\Http\Requests\RegisterStepRequest;
// use App\Http\Requests\RegisterCompleteRequest;
// use App\Models\RegistrationFlow;
// use App\Models\User;
// use App\Models\UserGoal;
// use App\Models\UserProfile;
// use App\Services\CalorieService;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Http\Request;
// use Illuminate\Support\Str;
// use Carbon\Carbon;

// class RegistrationController extends Controller
// {
//     public function start(Request $request)
//     {
//         $flow = RegistrationFlow::create([
//             'id' => (string) Str::uuid(),
//             'current_step' => 1,
//             'data' => [],
//         ]);
//         return response()->json(['flow_id' => $flow->id, 'current_step' => 1]);
//     }

//     public function saveStep(RegisterStepRequest $request, string $flowId)
//     {
//         $flow = RegistrationFlow::findOrFail($flowId);
//         $step = (int) $request->input('step');

//         $data = $flow->data ?? [];

//         switch ($step) {
//             case 1:
//                 $data['first_name'] = $request->string('first_name');
//                 break;

//             case 2:
//                 $goals = $request->input('goals'); // array
//                 $data['goals_selected'] = $goals;
//                 // Validate includes at least one weight goal if any of (lose_weight|maintain_weight|gain_weight) chosen
//                 $hasWeight = collect($goals)->contains(fn($g) => in_array($g, ['lose_weight', 'maintain_weight', 'gain_weight']));
//                 if (!$hasWeight) {
//                     // if your product strictly requires one weight goal, enforce here:
//                     // return response()->json(['message' => 'Please include at least one weight goal.'], 422);
//                 }
//                 break;

//             case 3:
//                 $data['goal_reasons'] = $request->input('reasons', []);
//                 break;

//             case 4:
//                 $data['activity_level'] = $request->string('activity_level');
//                 $data['sex'] = $request->string('sex');
//                 $data['dob'] = $request->date('dob')->toDateString();
//                 $data['country'] = $request->string('country');
//                 break;

//             case 5:
//                 // convert imperial to metric
//                 $height_ft = (int) $request->input('height_ft');
//                 $height_in = (int) $request->input('height_in');
//                 $total_in = ($height_ft * 12) + $height_in;
//                 $data['height_cm'] = round($total_in * 2.54, 2);

//                 $data['current_weight_kg'] = round(((float) $request->input('current_weight_lbs')) * 0.45359237, 2);
//                 $data['goal_weight_kg'] = round(((float) $request->input('goal_weight_lbs')) * 0.45359237, 2);
//                 break;

//             case 6:
//                 $weekly = $request->input('weekly_goal');
//                 // map weekly_goal to kg/week
//                 $map = [
//                     'gain_0_5' => 0.2268, // 0.5 lb
//                     'gain_1'   => 0.4536,
//                     'lose_0_5' => -0.2268,
//                     'lose_1'   => -0.4536,
//                     'lose_1_5' => -0.6804,
//                     'lose_2'   => -0.9072,
//                     'maintain' => 0.0,
//                 ];
//                 $data['weekly_change_kg'] = $map[$weekly] ?? 0.0;
//                 break;
//         }

//         $flow->update([
//             'data' => $data,
//             'current_step' => max($flow->current_step, $step + 1),
//         ]);

//         return response()->json([
//             'flow_id' => $flow->id,
//             'saved_step' => $step,
//             'next_step' => $flow->current_step,
//             'data' => $data,
//         ]);
//     }

//     public function complete(RegisterCompleteRequest $request, CalorieService $calorieService, string $flowId)
//     {
//         $flow = RegistrationFlow::findOrFail($flowId);
//         $data = $flow->data ?? [];

//         // Defensive checks
//         foreach (['first_name', 'sex', 'dob', 'country', 'height_cm', 'current_weight_kg', 'goal_weight_kg', 'activity_level', 'weekly_change_kg', 'goals_selected'] as $key) {
//             if (!array_key_exists($key, $data)) {
//                 return response()->json(['message' => "Missing data for $key. Complete previous steps."], 422);
//             }
//         }

//         return DB::transaction(function () use ($request, $data, $calorieService, $flow) {


//             $user = User::create([
//                 'first_name' => $data['first_name'],
//                 'last_name'  => $data['last_name'] ?? null,
//                 'username'   => $request->input('username'),
//                 'email'      => $request->input('email'),
//                 'password'   => Hash::make($request->input('password')),
//                 'role'       => 'user',
//                 'is_active'  => true,
//             ]);

//             // Age
//             $age = \Carbon\Carbon::parse($data['dob'])->age;

//             // Daily calories
//             $daily = $calorieService->dailyCalories(
//                 $data['sex'],
//                 (float) $data['height_cm'],
//                 (float) $data['current_weight_kg'],
//                 (int) $age,
//                 $data['activity_level'],
//                 (float) $data['weekly_change_kg']
//             );

//             $profile = UserProfile::create([
//                 'user_id' => $user->id,
//                 'sex' => $data['sex'],
//                 'dob' => $data['dob'],
//                 'country' => $data['country'],
//                 'height_cm' => $data['height_cm'],
//                 'current_weight_kg' => $data['current_weight_kg'],
//                 'goal_weight_kg' => $data['goal_weight_kg'],
//                 'activity_level' => $data['activity_level'],
//                 'workouts_per_week' => $data['workouts_per_week'] ?? null,
//                 'minutes_per_workout' => $data['minutes_per_workout'] ?? null,
//                 'email_opt_in' => (bool) ($request->boolean('email_opt_in', false)),
//                 'timezone' => 'UTC',
//                 'daily_calorie_goal' => $daily,
//             ]);

//             // Save selected goals
//             $selected = $data['goals_selected']; // e.g. ['gain_weight','gain_muscle','manage_stress']
//             // Map each label to a category
//             $categoryMap = [
//                 'lose_weight'     => 'weight',
//                 'maintain_weight' => 'weight',
//                 'gain_weight'     => 'weight',
//                 'gain_muscle'     => 'fitness',
//                 'modify_my_diet'  => 'nutrition',
//                 'manage_stress'   => 'stress',
//             ];

//             foreach ($selected as $idx => $label) {
//                 UserGoal::create([
//                     'user_id' => $user->id,
//                     'category' => $categoryMap[$label] ?? 'weight',
//                     'label' => $label,
//                     'reasons' => $data['goal_reasons'][$label] ?? [],
//                     'weekly_change_kg' => in_array($label, ['lose_weight', 'gain_weight', 'maintain_weight'])
//                         ? $data['weekly_change_kg'] : null,
//                     'is_primary' => $idx === 0,
//                     'active' => true,
//                 ]);
//             }

//             // Issue token
//             $token = $user->createToken('auth')->plainTextToken;

//             // Cleanup flow
//             $flow->delete();

//             return response()->json([
//                 'user' => [
//                     'id' => $user->id,
//                     'email' => $user->email,
//                     'username' => $user->username,
//                     'first_name' => $user->first_name,
//                     'last_name' => $user->last_name,
//                 ],
//                 'profile' => $profile,
//                 'goals' => $user->goals()->get(),
//                 'daily_calorie_goal' => $profile->daily_calorie_goal,
//                 'token' => $token,
//             ], 201);
//         });
//     }
// }















namespace App\Http\Controllers;

use App\Http\Requests\RegisterStepRequest;
use App\Http\Requests\RegisterCompleteRequest;
use App\Models\RegistrationFlow;
use App\Models\User;
use App\Models\UserGoal;
use App\Models\UserProfile;
use App\Services\CalorieService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

class RegistrationController extends Controller
{
    /**
     * Start registration flow
     */
    public function start(Request $request)
    {
        $flow = RegistrationFlow::create([
            'id' => (string) Str::uuid(),
            'current_step' => 1,
            'data' => [],
        ]);

        return response()->json([
            'message' => 'Registration flow started successfully.',
            'flow_id' => $flow->id,
            'current_step' => 1
        ]);
    }

    /**
     * Save a registration step
     */
    public function saveStep(RegisterStepRequest $request, string $flowId)
    {
        try {
            $flow = RegistrationFlow::findOrFail($flowId);
            $step = (int) $request->input('step');
            $data = $flow->data ?? [];

            switch ($step) {
                case 1:
                    $data['first_name'] = $request->string('first_name');
                    break;

                case 2:
                    $data['goals_selected'] = $request->input('goals', []);
                    break;

                case 3:
                    $data['goal_reasons'] = $request->input('reasons', []);
                    break;

                case 4:
                    $data['activity_level'] = $request->string('activity_level');
                    $data['sex'] = $request->string('sex');
                    $data['dob'] = $request->date('dob')->toDateString();
                    $data['country'] = $request->string('country');
                    break;

                case 5:
                    // Convert height to cm
                    $height_ft = (int) $request->input('height_ft', 0);
                    $height_in = (int) $request->input('height_in', 0);
                    $data['height_cm'] = round(($height_ft * 12 + $height_in) * 2.54, 2);

                    // Weight conversion: use kg if provided, else convert lbs
                    $current_weight = $request->input('current_weight_kg');
                    if ($current_weight) {
                        $data['current_weight_kg'] = (float) $current_weight;
                    } else {
                        $current_weight_lbs = $request->input('current_weight_lbs', 0);
                        $data['current_weight_kg'] = round($current_weight_lbs * 0.45359237, 2);
                    }

                    $goal_weight = $request->input('goal_weight_kg');
                    if ($goal_weight) {
                        $data['goal_weight_kg'] = (float) $goal_weight;
                    } else {
                        $goal_weight_lbs = $request->input('goal_weight_lbs', 0);
                        $data['goal_weight_kg'] = round($goal_weight_lbs * 0.45359237, 2);
                    }
                    break;

                case 6:
                    $weekly = $request->input('weekly_goal');
                    $map = [
                        'gain_0_5' => 0.2268,
                        'gain_1'   => 0.4536,
                        'lose_0_5' => -0.2268,
                        'lose_1'   => -0.4536,
                        'lose_1_5' => -0.6804,
                        'lose_2'   => -0.9072,
                        'maintain' => 0.0,
                    ];
                    $data['weekly_change_kg'] = $map[$weekly] ?? 0.0;
                    break;
            }

            $flow->update([
                'data' => $data,
                'current_step' => max($flow->current_step, $step + 1),
            ]);

            return response()->json([
                'message' => "Step $step saved successfully.",
                'flow_id' => $flow->id,
                'saved_step' => $step,
                'next_step' => $flow->current_step,
                'data' => $data,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to save step: ' . $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Complete registration
     */
    public function complete(RegisterCompleteRequest $request, CalorieService $calorieService, string $flowId)
    {
        try {
            $flow = RegistrationFlow::findOrFail($flowId);
            $data = $flow->data ?? [];

            $requiredKeys = [
                'first_name', 'sex', 'dob', 'country', 
                'height_cm', 'current_weight_kg', 'goal_weight_kg',
                'activity_level', 'weekly_change_kg', 'goals_selected'
            ];

            foreach ($requiredKeys as $key) {
                if (!array_key_exists($key, $data)) {
                    return response()->json([
                        'error' => "Missing data for $key. Please complete previous steps."
                    ], 422);
                }
            }

            return DB::transaction(function () use ($request, $data, $calorieService, $flow) {

                $user = User::create([
                    'first_name' => $data['first_name'],
                    'last_name'  => $data['last_name'] ?? null,
                    'username'   => $request->input('username'),
                    'email'      => $request->input('email'),
                    'password'   => Hash::make($request->input('password')),
                    'role'       => 'user',
                    'is_active'  => true,
                ]);

                $age = Carbon::parse($data['dob'])->age;

                // Calculate daily calories
                $daily = $calorieService->dailyCalories(
                    $data['sex'],
                    (float) $data['height_cm'],
                    (float) $data['current_weight_kg'],
                    (int) $age,
                    $data['activity_level'],
                    (float) $data['weekly_change_kg']
                );

                $profile = UserProfile::create([
                    'user_id' => $user->id,
                    'sex' => $data['sex'],
                    'dob' => $data['dob'],
                    'country' => $data['country'],
                    'height_cm' => $data['height_cm'],
                    'current_weight_kg' => $data['current_weight_kg'],
                    'goal_weight_kg' => $data['goal_weight_kg'],
                    'activity_level' => $data['activity_level'],
                    'workouts_per_week' => $data['workouts_per_week'] ?? null,
                    'minutes_per_workout' => $data['minutes_per_workout'] ?? null,
                    'email_opt_in' => (bool) ($request->boolean('email_opt_in', false)),
                    'timezone' => 'UTC',
                    'daily_calorie_goal' => $daily,
                ]);

                $categoryMap = [
                    'lose_weight'     => 'weight',
                    'maintain_weight' => 'weight',
                    'gain_weight'     => 'weight',
                    'gain_muscle'     => 'fitness',
                    'modify_my_diet'  => 'nutrition',
                    'manage_stress'   => 'stress',
                ];

                foreach ($data['goals_selected'] as $idx => $label) {
                    UserGoal::create([
                        'user_id' => $user->id,
                        'category' => $categoryMap[$label] ?? 'weight',
                        'label' => $label,
                        'reasons' => $data['goal_reasons'][$label] ?? [],
                        'weekly_change_kg' => in_array($label, ['lose_weight', 'gain_weight', 'maintain_weight'])
                            ? $data['weekly_change_kg'] : null,
                        'is_primary' => $idx === 0,
                        'active' => true,
                    ]);
                }

                $token = $user->createToken('auth')->plainTextToken;
                $flow->delete();

                return response()->json([
                    'message' => 'Registration completed successfully.',
                    'user' => $user->only(['id','email','username','first_name','last_name']),
                    'profile' => $profile,
                    'goals' => $user->goals()->get(),
                    'daily_calorie_goal' => $profile->daily_calorie_goal,
                    'token' => $token,
                ], 201);
            });

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Registration failed: ' . $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }
}
