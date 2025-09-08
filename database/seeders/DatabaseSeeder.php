<?php

namespace Database\Seeders;

use App\Models\CardioExerciseEntries;
use App\Models\ExerciseDatabase;
use App\Models\QuickExerciseEntries;
use App\Models\StrengthExerciseEntries;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // ExerciseDatabase::factory(10)->create();
        // CardioExerciseEntries::factory(5)->create();
        // StrengthExerciseEntries::factory(5)->create();
        QuickExerciseEntries::factory(5)->create();
    }
}
