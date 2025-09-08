<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\UserGoal;
use App\Services\ProfileService;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user()->load('profile'));
    }

    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();

        $user->fill($request->only(['first_name', 'last_name']))->save();

        $user->profile->fill($request->validated());
        $user->profile->save();

        $weeklyKg = null;
        if ($request->filled('weekly_goal')) {
            $map = [
                'gain_0_5' => 0.2268,
                'gain_1'   => 0.4536,
                'lose_0_5' => -0.2268,
                'lose_1'   => -0.4536,
                'lose_1_5' => -0.6804,
                'lose_2'   => -0.9072,
                'maintain' => 0.0,
            ];
            $weeklyKg = $map[$request->input('weekly_goal')] ?? null;
        } elseif ($request->filled('weekly_change_kg')) {
            $weeklyKg = (float) $request->input('weekly_change_kg');
        }

        if (!is_null($weeklyKg)) {
            // If the user already has a weight goal, update it; otherwise create one.
            $weightGoal = $user->goals()->where('category', 'weight')->first();

            if ($weightGoal) {
                $weightGoal->weekly_change_kg = $weeklyKg;
                $weightGoal->save();
            } else {
                // Create a simple weight goal because user expressed a weekly target.
                // Make it primary so it will be used by default (and unset other primaries).
                $label = $weeklyKg == 0 ? 'maintain_weight' : ($weeklyKg > 0 ? 'gain_weight' : 'lose_weight');

                // Make sure only one primary exists
                $user->goals()->where('is_primary', true)->update(['is_primary' => false]);

                UserGoal::create([
                    'user_id' => $user->id,
                    'category' => 'weight',
                    'label' => $label,
                    'reasons' => [],
                    'weekly_change_kg' => $weeklyKg,
                    'is_primary' => true,
                    'active' => true,
                ]);
            }
        }

        //Always recalculate profile calories on profile update because weight or profile fields changed.
        ProfileService::updateCurrentWeightAndCalories($user, $user->profile->current_weight_kg);

        return response()->json($user->load('profile'));
    }
}
