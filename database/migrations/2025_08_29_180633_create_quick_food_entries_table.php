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
        Schema::create('quick_food_entries', function (Blueprint $table) {
            $table->id('quick_entry_id');
            $table->unsignedBigInteger('user_id');
            $table->string('food_name', 255);
            $table->enum('meal_type', ['breakfast', 'lunch', 'dinner', 'snack']);
            $table->decimal('calories', 7, 2);
            $table->date('entry_date');
            $table->text('notes')->nullable();
            $table->timestamps();
        

            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quick_food_entries');
    }
};
