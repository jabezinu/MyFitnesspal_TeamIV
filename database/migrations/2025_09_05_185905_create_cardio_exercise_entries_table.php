<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cardio_exercise_entries', function (Blueprint $table) {
            $table->id('entry_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('exercise_id');

            $table->date('entry_date');
            $table->integer('duration_minutes');
            $table->decimal('calories_burned', 7,2);
            $table->decimal('distance',8,2);
            $table->enum('distance_unit', ['km', 'miles', 'meters']);
            $table->enum('intensity_level',['low', 'moderate', 'high']);
            $table->text('notes')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('exercise_id')->references('exercise_id')->on('exercise_database')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cardio_exercise_entries');
    }
};
