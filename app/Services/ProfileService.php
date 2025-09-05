<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Carbon;

class ProfileService
{
    public static function updateCurrentWeightAndCalories(User $user, float $newWeightKg): void
    {
        $profile = $user->profile;

        $profile->current_weight_kg = $newWeightKg;

        // Pull user data for calorie calculation
        $sex            = $profile->sex ?? 'male';
        $height_cm      = $profile->height_cm ?? 170;
        $age_years      = Carbon::parse($profile->dob)->age ?? 25;
        $activity_level = $profile->activity_level ?? 'sedentary';

        // Get active weekly change from user’s *primary goal* (if exists)
        $weekly_change_kg = optional(
            $user->goals()->where('is_primary', true)->first()
        )->weekly_change_kg ?? 0.0;

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
