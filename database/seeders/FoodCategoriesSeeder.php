<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FoodCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('food_categories')->insert([
            ['category_name' => 'Breakfast Foods', 'created_at' => now(), 'updated_at' => now()],
            ['category_name' => 'Lunch & Dinner (Main Dishes)', 'created_at' => now(), 'updated_at' => now()],
            ['category_name' => 'Vegetables & Salads', 'created_at' => now(), 'updated_at' => now()],
            ['category_name' => 'Fruits', 'created_at' => now(), 'updated_at' => now()],
            ['category_name' => 'Snacks & Street Foods', 'created_at' => now(), 'updated_at' => now()],
            ['category_name' => 'Drinks & Beverages', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
