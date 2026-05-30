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
        Schema::create('theme_versions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('theme_id')->constrained()->cascadeOnDelete();
            $table->string('version');
            $table->json('schema_json')->nullable();
            $table->string('renderer_key')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theme_versions');
    }
};
