<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\ExerciseDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CardioExerciseEntries>
 */
class CardioExerciseEntriesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1, // or use existing users in seeder
            'exercise_id' => ExerciseDatabase::factory(), // or predefined IDs
            'entry_date' => $this->faker->date(),
            'duration_minutes' => $this->faker->numberBetween(5, 90),
            'calories_burned' => $this->faker->randomFloat(2, 50, 1000),
            'distance' => $this->faker->randomFloat(2, 0.5, 15),
            'distance_unit' => $this->faker->randomElement(['km', 'miles', 'meters']),
            'intensity_level' => $this->faker->randomElement(['low', 'moderate', 'high']),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
