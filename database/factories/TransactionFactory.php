<?php

namespace Database\Factories;

use App\Models\Theme;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TransactionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'theme_id' => Theme::factory(),
            'amount' => 150000,
            'status' => 'pending',
            'payment_gateway_ref' => 'DUMMY_' . Str::random(10),
        ];
    }
}
