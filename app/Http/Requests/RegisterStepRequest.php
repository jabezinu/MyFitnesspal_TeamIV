<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterStepRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array {
        $step = (int) ($this->input('step') ?? 1);

        return match ($step) {
            1 => ['first_name' => 'required|string|max:100'],
            2 => [
                // up to 3 goals, must include one weight goal if "weight" part is chosen
                'goals' => 'required|array|min:1|max:3',
                'goals.*' => 'in:lose_weight,maintain_weight,gain_weight,gain_muscle,modify_my_diet,manage_stress',
            ],
            3 => [
                // reasons keyed by goal label
                // e.g. reasons.gain_weight = ['competitive_sport','general_fitness','under_weight', ...]
                'reasons' => 'nullable|array',
            ],
            4 => [
                'activity_level' => 'required|in:sedentary,lightly_active,active,very_active',
                'sex' => 'required|in:male,female,other,prefer_not_to_say',
                'dob' => 'required|date',
                'country' => 'required|string|max:100',
            ],
            5 => [
                'height_ft' => 'required|integer|min:0|max:8',
                'height_in' => 'required|integer|min:0|max:11',
                'current_weight_lbs' => 'required|numeric|min:50|max:1000',
                'goal_weight_lbs' => 'required|numeric|min:50|max:1000',
            ],
            6 => [
                'weekly_goal' => 'required|in:gain_0_5,gain_1,lose_0_5,lose_1,lose_1_5,lose_2,maintain',
            ],
            default => [],
        };
    }
}
