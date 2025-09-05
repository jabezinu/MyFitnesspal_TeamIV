<?php

namespace App\Services;

class CalorieService
{
    /**
     * Calculate daily calories using Mifflin-St Jeor and activity factor.
     * $sex: male|female|other|prefer_not_to_say (other -> use male coeff by default or neutral)
     * height_cm, weight_kg, age_years
     * activity_level: sedentary|lightly_active|active|very_active
     * weekly_change_kg: positive to gain, negative to lose
     */
    public function dailyCalories(
        string $sex,
        float $height_cm,
        float $weight_kg,
        int $age_years,
        string $activity_level,
        float $weekly_change_kg = 0.0
    ): int {
        // BMR
        // If sex unknown, default to average of male/female formulas
        $bmr_male   = 10*$weight_kg + 6.25*$height_cm - 5*$age_years + 5;
        $bmr_female = 10*$weight_kg + 6.25*$height_cm - 5*$age_years - 161;

        $bmr = match($sex) {
            'male' => $bmr_male,
            'female' => $bmr_female,
            default => ($bmr_male + $bmr_female)/2,
        };

        $multiplier = match($activity_level) {
            'sedentary'      => 1.2,
            'lightly_active' => 1.375,
            'active'         => 1.55,
            'very_active'    => 1.725,
            default          => 1.2,
        };

        $tdee = $bmr * $multiplier;
    
        // Energy for weekly change: 1 kg ~ 7700 kcal
        $delta_per_day = ($weekly_change_kg * 7700) / 7.0;

        return (int) round($tdee + $delta_per_day);
    }
}
