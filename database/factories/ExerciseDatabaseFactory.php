<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExerciseDatabase>
 */
class ExerciseDatabaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exercise_name'=> fake()->name(),
            'exercise_type'=> 'cardiovascular',
            'calories_per_minute'=> fake()->randomFloat(2,100,10000),
            'created_by_user_id'=>null,
            'muscle_groups'=>['chest', 'legs'],
            'equipment_needed'=>'no equipments',
            'difficulty_level'=>'beginner',
            'is_verified'=>fake()->randomElement([1]),
            'is_public'=>1
        ];
    }
}
