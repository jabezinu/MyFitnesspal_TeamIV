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
        Schema::create('strength_exercise_entries', function (Blueprint $table) {
            $table->id('entry_id');
            $table->unsignedBigInteger('user_id')->nullable(false);
            $table->unsignedBigInteger('exercise_id')->nullable(false);

            $table->date('entry_date');
            $table->integer('sets');
            $table->json('reps_per_set');
            $table->json('weight_per_set');
            $table->enum('weight_unit', allowed: ['kg', 'lbs']);
            $table->integer('rest_time_seconds');
            $table->decimal('calories_burned', 7,2);
            $table->text('notes')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('exercise_id')->references('exercise_id')->on('exercise_databases')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('strength_exercise_entries');
    }
};
