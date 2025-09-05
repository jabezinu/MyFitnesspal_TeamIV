<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array {
        return [
            'first_name' => 'nullable|string|max:100',
            'last_name'  => 'nullable|string|max:100',
            'sex' => 'nullable|in:male,female,other,prefer_not_to_say',
            'dob' => 'nullable|date',
            'country' => 'nullable|string|max:100',
            'region' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'height_cm' => 'nullable|numeric|min:100|max:250',
            'current_weight_kg' => 'nullable|numeric|min:20|max:400',
            'goal_weight_kg' => 'nullable|numeric|min:20|max:400',
            'activity_level' => 'nullable|in:sedentary,lightly_active,active,very_active',
            'workouts_per_week' => 'nullable|integer|min:0|max:14',
            'minutes_per_workout' => 'nullable|integer|min:0|max:300',
            'email_opt_in' => 'nullable|boolean',
            'timezone' => 'nullable|string|max:50',
            'page_title' => 'nullable|string|max:120',
            'about_me' => 'nullable|string',
            'topics' => 'nullable|string',
            'previous_attempts' => 'nullable|string',
            'join_reason' => 'nullable|string',
            'family_info' => 'nullable|string',
            'why_get_in_shape' => 'nullable|string',
            'inspirations' => 'nullable|string',
            'avatar_url' => 'nullable|url',
        ];
    }

    public function withValidator($validator)
{
    $validator->after(function ($validator) {
        $current = $this->input('current_weight_kg');
        $goal = $this->input('goal_weight_kg');
        $weekly = $this->input('weekly_change_kg');

        if ($current && $goal && $weekly) {
            // case: trying to gain while goal < current
            if ($current > $goal && $weekly > 0) {
                $validator->errors()->add('weekly_change_kg',
                    'Invalid goal: you cannot aim to gain weight if your goal is lower than your current weight.'
                );
            }

            // case: trying to lose while goal > current
            if ($current < $goal && $weekly < 0) {
                $validator->errors()->add('weekly_change_kg',
                    'Invalid goal: you cannot aim to lose weight if your goal is higher than your current weight.'
                );
            }
        }
    });
}

}

