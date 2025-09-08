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
        Schema::create('exercise_databases', function (Blueprint $table) {
            $table->id('exercise_id');
            $table->unsignedBigInteger('created_by_user_id');
            $table->unsignedBigInteger('catagory_id');
            
            $table->string('exercise_name');
            $table->enum('exercise_type', ['cardiovascular', 'strength','flexibility', 'sports','other']);
            $table->decimal('calories_per_minute',6,2);
            $table->text('description')->nullable();
            $table->text('instructions')->nullable();
            $table->json('muscle_groups');
            $table->string('equipment_needed')->nullable();
            $table->enum('difficulty_level', ['beginner', 'intermediate', 'advanced']);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_public')->default(false);

            $table->foreign('catagory_id')->references('catagory_id')->on('exercise_caragories')->onDelete('cascade');
            $table->foreign('created_by_user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercise_database');
    }
};
