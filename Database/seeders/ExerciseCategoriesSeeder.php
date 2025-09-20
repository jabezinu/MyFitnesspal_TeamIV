<?php
// database/seeders/ExerciseCategoriesSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ExerciseCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            // Cardiovascular Exercises (15 categories)
            ['catagory_name' => 'Running', 'catagory_type' => 'cardiovascular', 'description' => 'Various running exercises and drills'],
            ['catagory_name' => 'Cycling', 'catagory_type' => 'cardiovascular', 'description' => 'Indoor and outdoor cycling exercises'],
            ['catagory_name' => 'Swimming', 'catagory_type' => 'cardiovascular', 'description' => 'Swimming strokes and water exercises'],
            ['catagory_name' => 'HIIT Cardio', 'catagory_type' => 'cardiovascular', 'description' => 'High-Intensity Interval Training for cardio'],
            ['catagory_name' => 'Jump Rope', 'catagory_type' => 'cardiovascular', 'description' => 'Jump rope exercises and variations'],
            ['catagory_name' => 'Rowing', 'catagory_type' => 'cardiovascular', 'description' => 'Rowing machine exercises'],
            ['catagory_name' => 'Elliptical', 'catagory_type' => 'cardiovascular', 'description' => 'Elliptical trainer workouts'],
            ['catagory_name' => 'Stair Climbing', 'catagory_type' => 'cardiovascular', 'description' => 'Stair climbing machine exercises'],
            ['catagory_name' => 'Hiking', 'catagory_type' => 'cardiovascular', 'description' => 'Hiking and trail walking exercises'],
            ['catagory_name' => 'Dancing', 'catagory_type' => 'cardiovascular', 'description' => 'Dance-based cardio exercises'],
            ['catagory_name' => 'Kickboxing', 'catagory_type' => 'cardiovascular', 'description' => 'Cardio kickboxing exercises'],
            ['catagory_name' => 'Stair Running', 'catagory_type' => 'cardiovascular', 'description' => 'Running up and down stairs'],
            ['catagory_name' => 'Circuit Training', 'catagory_type' => 'cardiovascular', 'description' => 'Cardio-focused circuit training'],
            ['catagory_name' => 'Cross Trainer', 'catagory_type' => 'cardiovascular', 'description' => 'Cross trainer machine workouts'],
            ['catagory_name' => 'Step Aerobics', 'catagory_type' => 'cardiovascular', 'description' => 'Step aerobics exercises'],
            
            // Strength Exercises (20 categories)
            ['catagory_name' => 'Chest Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the pectoral muscles'],
            ['catagory_name' => 'Back Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the back muscles'],
            ['catagory_name' => 'Shoulder Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the deltoid muscles'],
            ['catagory_name' => 'Leg Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the lower body muscles'],
            ['catagory_name' => 'Quadriceps Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises focusing on quadriceps'],
            ['catagory_name' => 'Hamstring Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises focusing on hamstrings'],
            ['catagory_name' => 'Glute Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the gluteal muscles'],
            ['catagory_name' => 'Calf Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the calf muscles'],
            ['catagory_name' => 'Bicep Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the biceps'],
            ['catagory_name' => 'Tricep Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the triceps'],
            ['catagory_name' => 'Forearm Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the forearm muscles'],
            ['catagory_name' => 'Core Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the abdominal and core muscles'],
            ['catagory_name' => 'Abdominal Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises specifically for abs'],
            ['catagory_name' => 'Oblique Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises targeting the oblique muscles'],
            ['catagory_name' => 'Compound Movements', 'catagory_type' => 'strength', 'description' => 'Exercises that work multiple muscle groups'],
            ['catagory_name' => 'Bodyweight Exercises', 'catagory_type' => 'strength', 'description' => 'Exercises using only body weight'],
            ['catagory_name' => 'Powerlifting', 'catagory_type' => 'strength', 'description' => 'Powerlifting specific exercises'],
            ['catagory_name' => 'Olympic Lifts', 'catagory_type' => 'strength', 'description' => 'Olympic weightlifting exercises'],
            ['catagory_name' => 'Strongman Exercises', 'catagory_type' => 'strength', 'description' => 'Strongman training exercises'],
            ['catagory_name' => 'Functional Strength', 'catagory_type' => 'strength', 'description' => 'Functional strength training exercises'],
            
            // Flexibility Exercises (10 categories)
            ['catagory_name' => 'Static Stretching', 'catagory_type' => 'flexibility', 'description' => 'Holding stretches for extended periods'],
            ['catagory_name' => 'Dynamic Stretching', 'catagory_type' => 'flexibility', 'description' => 'Moving through stretches actively'],
            ['catagory_name' => 'Yoga', 'catagory_type' => 'flexibility', 'description' => 'Yoga poses and sequences'],
            ['catagory_name' => 'Pilates', 'catagory_type' => 'flexibility', 'description' => 'Pilates exercises for core strength and flexibility'],
            ['catagory_name' => 'Mobility Drills', 'catagory_type' => 'flexibility', 'description' => 'Exercises to improve joint mobility'],
            ['catagory_name' => 'PNF Stretching', 'catagory_type' => 'flexibility', 'description' => 'Proprioceptive Neuromuscular Facilitation'],
            ['catagory_name' => 'Active Isolated Stretching', 'catagory_type' => 'flexibility', 'description' => 'Active isolated stretching techniques'],
            ['catagory_name' => 'Ballistic Stretching', 'catagory_type' => 'flexibility', 'description' => 'Bouncing stretching movements'],
            ['catagory_name' => 'Partner Stretching', 'catagory_type' => 'flexibility', 'description' => 'Stretching with a partner assistance'],
            ['catagory_name' => 'Myofascial Release', 'catagory_type' => 'flexibility', 'description' => 'Foam rolling and self-myofascial release'],
            
            // Sports Exercises (15 categories)
            ['catagory_name' => 'Basketball', 'catagory_type' => 'sports', 'description' => 'Basketball drills and exercises'],
            ['catagory_name' => 'Soccer', 'catagory_type' => 'sports', 'description' => 'Soccer drills and exercises'],
            ['catagory_name' => 'Football', 'catagory_type' => 'sports', 'description' => 'Football drills and exercises'],
            ['catagory_name' => 'Tennis', 'catagory_type' => 'sports', 'description' => 'Tennis drills and exercises'],
            ['catagory_name' => 'Baseball', 'catagory_type' => 'sports', 'description' => 'Baseball drills and exercises'],
            ['catagory_name' => 'Volleyball', 'catagory_type' => 'sports', 'description' => 'Volleyball drills and exercises'],
            ['catagory_name' => 'Boxing', 'catagory_type' => 'sports', 'description' => 'Boxing drills and exercises'],
            ['catagory_name' => 'Martial Arts', 'catagory_type' => 'sports', 'description' => 'Martial arts drills and exercises'],
            ['catagory_name' => 'Swimming Sports', 'catagory_type' => 'sports', 'description' => 'Competitive swimming exercises'],
            ['catagory_name' => 'Track and Field', 'catagory_type' => 'sports', 'description' => 'Track and field exercises'],
            ['catagory_name' => 'Gymnastics', 'catagory_type' => 'sports', 'description' => 'Gymnastics exercises and drills'],
            ['catagory_name' => 'CrossFit', 'catagory_type' => 'sports', 'description' => 'CrossFit workouts and exercises'],
            ['catagory_name' => 'Rock Climbing', 'catagory_type' => 'sports', 'description' => 'Rock climbing exercises and training'],
            ['catagory_name' => 'Snow Sports', 'catagory_type' => 'sports', 'description' => 'Skiing and snowboarding exercises'],
            ['catagory_name' => 'Water Sports', 'catagory_type' => 'sports', 'description' => 'Water-based sports exercises'],
            
            // Other Exercises (15 categories)
            ['catagory_name' => 'Rehabilitation', 'catagory_type' => 'other', 'description' => 'Exercises for injury recovery and prevention'],
            ['catagory_name' => 'Balance Training', 'catagory_type' => 'other', 'description' => 'Exercises to improve balance and stability'],
            ['catagory_name' => 'Plyometrics', 'catagory_type' => 'other', 'description' => 'Explosive movements to develop power'],
            ['catagory_name' => 'Calisthenics', 'catagory_type' => 'other', 'description' => 'Bodyweight strength training exercises'],
            ['catagory_name' => 'Isometric Exercises', 'catagory_type' => 'other', 'description' => 'Static position strength exercises'],
            ['catagory_name' => 'Resistance Band', 'catagory_type' => 'other', 'description' => 'Exercises using resistance bands'],
            ['catagory_name' => 'Kettlebell', 'catagory_type' => 'other', 'description' => 'Kettlebell exercises and workouts'],
            ['catagory_name' => 'Suspension Training', 'catagory_type' => 'other', 'description' => 'TRX and suspension training exercises'],
            ['catagory_name' => 'Medicine Ball', 'catagory_type' => 'other', 'description' => 'Exercises using medicine balls'],
            ['catagory_name' => 'Battle Ropes', 'catagory_type' => 'other', 'description' => 'Battle rope exercises and workouts'],
            ['catagory_name' => 'Sandbag Training', 'catagory_type' => 'other', 'description' => 'Exercises using sandbags'],
            ['catagory_name' => 'Prenatal Exercises', 'catagory_type' => 'other', 'description' => 'Exercises for pregnant women'],
            ['catagory_name' => 'Postnatal Exercises', 'catagory_type' => 'other', 'description' => 'Exercises after pregnancy'],
            ['catagory_name' => 'Senior Fitness', 'catagory_type' => 'other', 'description' => 'Exercises for older adults'],
            ['catagory_name' => 'Kids Fitness', 'catagory_type' => 'other', 'description' => 'Exercises designed for children'],
        ];

        foreach ($categories as $category) {
            DB::table('exercise_caragories')->insert([
                'catagory_name' => $category['catagory_name'],
                'catagory_type' => $category['catagory_type'],
                'description' => $category['description'],
                'created_at' => Carbon::now(),
            ]);
        }
    }
}