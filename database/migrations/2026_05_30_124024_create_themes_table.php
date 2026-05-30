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
        Schema::create('themes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category')->nullable();
            $table->string('style')->nullable();
            $table->integer('price')->default(0);
            $table->integer('discount_price')->nullable();
            $table->string('status')->default('active');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
