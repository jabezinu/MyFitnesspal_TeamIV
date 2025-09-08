<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuickExerciseEntries>
 */
class QuickExerciseEntriesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'exercise_name' => $this->faker->words(2, true), // e.g., "Jumping Jacks"
            'exercise_type' => $this->faker->randomElement(['cardiovascular', 'strength', 'other']),
            'duration_minutes' => $this->faker->numberBetween(5, 60),
            'calories_burned' => $this->faker->randomFloat(2, 50, 600),
            'entry_date' => $this->faker->date(),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
