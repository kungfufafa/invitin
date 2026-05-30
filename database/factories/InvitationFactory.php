<?php

namespace Database\Factories;

use App\Models\Theme;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvitationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'theme_id' => Theme::factory(),
            'transaction_id' => Transaction::factory(),
            'status' => 'draft',
            'custom_domain' => null,
            'data_json' => [
                'bride' => $this->faker->firstNameFemale(),
                'groom' => $this->faker->firstNameMale(),
                'date' => $this->faker->date(),
                'venue' => $this->faker->company(),
            ],
        ];
    }
}
