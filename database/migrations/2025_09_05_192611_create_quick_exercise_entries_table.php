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
        Schema::create('quick_exercise_entries', function (Blueprint $table) {
            $table->id('quick_entry_id');
            $table->unsignedBigInteger('user_id');

            $table->string('exercise_name');
            $table->enum('exercise_type',['cardiovascular', 'strength', 'other']);
            $table->integer('duration_minutes');
            $table->decimal('calories_burned', 7, 2);
            $table->date('entry_date');
            $table->text('notes')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quick_exercise_entries');
    }
};
