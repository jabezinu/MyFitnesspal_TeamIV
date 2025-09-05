<?php

// namespace App\Observers;

// use App\Models\UserProfile;
// use App\Services\CalorieService;
// use Carbon\Carbon;

// class UserProfileObserver
// {
//     protected $calorieService;

//     public function __construct(CalorieService $calorieService)
//     {
//         $this->calorieService = $calorieService;
//     }

//     public function saving(UserProfile $profile)
//     {
//         // Ensure required fields exist before calculating
//         if ($profile->sex && $profile->dob && $profile->height_cm && $profile->current_weight_kg && $profile->activity_level) {
//             $age = Carbon::parse($profile->dob)->age;

//             $profile->daily_calorie_goal = $this->calorieService->dailyCalories(
//                 $profile->sex,
//                 (float) $profile->height_cm,
//                 (float) $profile->current_weight_kg,
//                 (int) $age,
//                 $profile->activity_level,
//                 (float) ($profile->weekly_change_kg ?? 0.0)
//             );
//         }
//     }
// }
