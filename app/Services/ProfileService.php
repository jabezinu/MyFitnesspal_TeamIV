<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Carbon;

class ProfileService
{
    public static function updateCurrentWeightAndCalories(User $user, float $newWeightKg): void
    {
        $profile = $user->profile;
        if (! $profile) {
            // nothing to update
            return;
        }
        $profile->current_weight_kg = $newWeightKg;

        // Pull user data for calorie calculation
        $sex            = $profile->sex ?? 'male';
        $height_cm      = $profile->height_cm ?? 170;
        $age_years      = Carbon::parse($profile->dob)->age ?? 25;
        $activity_level = $profile->activity_level ?? 'sedentary';


        $weightGoal = $user->goals()
            ->where('category', 'weight')
            ->whereNotNull('weekly_change_kg')
            ->orderByDesc('is_primary')     // prefer primary weight goal if it has a weekly change
            ->orderByDesc('updated_at')     // otherwise prefer most recently updated
            ->first();


        $weekly_change_kg = $weightGoal->weekly_change_kg ?? 0.0;


        // Use CalorieService
        $calorieService = new CalorieService();
        $profile->daily_calorie_goal = $calorieService->dailyCalories(
            $sex,
            $height_cm,
            $newWeightKg,
            $age_years,
            $activity_level,
            $weekly_change_kg
        );

        $profile->save();
    }
}
