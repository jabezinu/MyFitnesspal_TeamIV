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
        Schema::create('food_diary_entries', function (Blueprint $table) {
            $table->id('entry_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('food_id')->nullable();
            $table->enum('meal_type', ['breakfast', 'lunch', 'dinner', 'snack']);
            $table->decimal('serving_amount', 6, 2);
            $table->date('entry_date');
            $table->decimal('calories_consumed', 7, 2)->nullable();
            $table->decimal('protein_consumed', 6, 2)->nullable();
            $table->decimal('carbs_consumed', 6, 2)->nullable();
            $table->decimal('fat_consumed', 6, 2)->nullable();
            $table->decimal('fiber_consumed', 6, 2)->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('food_id')->references('food_id')->on('food_items')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food_diary_entries');
    }
};
