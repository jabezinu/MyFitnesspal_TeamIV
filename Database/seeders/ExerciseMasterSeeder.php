<?php
// database/seeders/ExerciseMasterSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExerciseMasterSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ExerciseCategoriesSeeder::class,
            ExerciseDatabaseSeeder::class,
        ]);
    }
}