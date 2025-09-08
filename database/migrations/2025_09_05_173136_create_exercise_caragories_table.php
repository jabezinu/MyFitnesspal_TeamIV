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
        Schema::create('exercise_caragories', function (Blueprint $table) {
            $table->id('catagory_id');
            $table->string('catagory_name');
            $table->enum('catagory_type',['cardiovascular', 'strength','flexibility', 'sports','other']);
            $table->text('description')->nullable();
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercise_caragories');
    }
};
