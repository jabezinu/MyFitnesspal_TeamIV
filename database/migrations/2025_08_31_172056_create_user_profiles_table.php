<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();

            $table->enum('sex', ['male','female','other','prefer_not_to_say'])->nullable();
            $table->date('dob')->nullable();

            $table->string('country', 100)->nullable();
            $table->string('region', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('postal_code', 20)->nullable();

            $table->decimal('height_cm', 5, 2)->nullable();
            $table->decimal('current_weight_kg', 6, 2)->nullable();
            $table->decimal('goal_weight_kg', 6, 2)->nullable();

            $table->enum('activity_level', ['sedentary','lightly_active','active','very_active'])->nullable();
            $table->unsignedInteger('workouts_per_week')->nullable();
            $table->unsignedInteger('minutes_per_workout')->nullable();

            $table->boolean('email_opt_in')->default(false);
            $table->string('timezone', 50)->default('UTC');
            $table->unsignedInteger('water_goal_ml')->default(2000);

            $table->string('page_title', 120)->nullable();
            $table->text('about_me')->nullable();
            $table->text('topics')->nullable();
            $table->text('previous_attempts')->nullable();
            $table->text('join_reason')->nullable();
            $table->text('family_info')->nullable();
            $table->text('why_get_in_shape')->nullable();
            $table->text('inspirations')->nullable();

            $table->string('avatar_url', 255)->nullable();

            $table->integer('daily_calorie_goal')->nullable(); // computed at the end
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('user_profiles');
    }
};
