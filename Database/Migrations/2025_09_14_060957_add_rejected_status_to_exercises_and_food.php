<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('exercise_databases', function (Blueprint $table) {
            $table->boolean('is_rejected')->default(false);
            $table->text('rejection_reason')->nullable();
            $table->timestamp('rejected_at')->nullable();
        });
        
        Schema::table('food_items', function (Blueprint $table) {
            $table->boolean('is_rejected')->default(false);
            $table->text('rejection_reason')->nullable();
            $table->timestamp('rejected_at')->nullable();
        });
    }

    public function down()
    {
        // Reverse the changes
    }
};
