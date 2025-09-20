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
        Schema::create('water_entries', function (Blueprint $table) {
            $table->id('entry_id');
            $table->unsignedBigInteger('user_id');
            $table->decimal('amount', 8, 2); // e.g. 250 ml, 0.25 L
            $table->string('unit')->default('ml'); // ml or L
            $table->date('entry_date')->default(now());
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('water_entries');
    }
};
