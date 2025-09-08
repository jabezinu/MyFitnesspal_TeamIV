<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('registration_flows', function (Blueprint $table) {
            $table->uuid('id')->primary();       // flow_id used by the client
            $table->unsignedInteger('current_step')->default(1);
            $table->json('data')->nullable();    // accumulate answers
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('registration_flows');
    }
};
