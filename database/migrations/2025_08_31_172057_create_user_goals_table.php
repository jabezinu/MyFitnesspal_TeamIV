<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_goals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // category: weight|fitness|nutrition|stress  (your flow needs these)
            $table->enum('category', ['weight','fitness','nutrition','stress']);
            // free-form labels for high-level choices: lose_weight, maintain_weight, gain_weight, gain_muscle,
            // modify_my_diet, manage_stress
            $table->string('label', 80);
            $table->json('reasons')->nullable(); // arrays from multi-select questions
            $table->decimal('target_value', 10, 2)->nullable();
            $table->decimal('weekly_change_kg', 5, 3)->nullable(); // +ve gain, -ve loss
            $table->boolean('is_primary')->default(false);
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->index(['user_id','category']);
        });
    }
    public function down(): void {
        Schema::dropIfExists('user_goals');
    }
};
