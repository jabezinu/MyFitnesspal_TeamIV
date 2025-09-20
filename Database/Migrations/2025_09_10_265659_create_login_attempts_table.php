<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('login_attempts', function (Blueprint $table) {
            $table->id();
            $table->string('email')->index();              // attempted email
            $table->ipAddress('ip_address')->nullable();   // IP of attempt
            $table->boolean('success')->default(false);    // success or fail
            $table->timestamp('attempted_at')->useCurrent();
            $table->string('user_agent')->nullable();      // browser/device
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('login_attempts');
    }
};
