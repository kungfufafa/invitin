<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invitations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('theme_id')->constrained('themes')->cascadeOnDelete();
            $table->foreignUuid('transaction_id')->constrained('transactions')->cascadeOnDelete();
            $table->string('status')->default('draft'); // draft, published
            $table->string('custom_domain')->nullable()->unique();
            $table->json('data_json')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
