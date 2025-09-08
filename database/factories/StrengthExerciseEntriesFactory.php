<?php

namespace Database\Factories;

use App\Models\ExerciseDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StrengthExerciseEntries>
 */
class StrengthExerciseEntriesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sets = $this->faker->numberBetween(2, 5);

        return [
            'user_id' => 1,
            'exercise_id' => ExerciseDatabase::factory(),
            'entry_date' => $this->faker->date(),
            'sets' => $sets,
            'reps_per_set' => array_fill(0, $sets, $this->faker->numberBetween(6, 15)),
            'weight_per_set' => array_fill(0, $sets, $this->faker->randomFloat(1, 5, 100)),
            'weight_unit' => $this->faker->randomElement(['kg', 'lbs']),
            'rest_time_seconds' => $this->faker->numberBetween(30, 120),
            'calories_burned' => $this->faker->randomFloat(2, 50, 400),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
