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
        Schema::create('food_items', function (Blueprint $table) {
            $table->id('food_id');
            $table->string('food_name', 255);
            $table->string('brand', 255)->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('serving_size', 100)->nullable();
            $table->string('serving_unit', 50)->nullable();
            $table->decimal('calories_per_serving', 7, 2);
            $table->decimal('protein_per_serving', 6, 2)->nullable();
            $table->decimal('carbs_per_serving', 6, 2)->nullable();
            $table->decimal('fat_per_serving', 6, 2)->nullable();
            $table->decimal('fiber_per_serving', 6, 2)->nullable();
            $table->decimal('sugar_per_serving', 6, 2)->nullable();
            $table->decimal('sodium_per_serving', 8, 2)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_public')->default(false);
            $table->unsignedBigInteger('created_by_user_id')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('category_id')->references('category_id')->on('food_categories')->nullOnDelete();
            $table->foreign('created_by_user_id')->references('id')->on('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food_items');
    }
};
