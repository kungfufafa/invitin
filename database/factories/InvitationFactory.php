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
        $groomName = $this->faker->firstNameMale();
        $brideName = $this->faker->firstNameFemale();

        return [
            'user_id' => User::factory(),
            'theme_id' => Theme::factory(),
            'transaction_id' => Transaction::factory(),
            'title' => 'The Wedding of '.$groomName.' & '.$brideName,
            'slug' => $this->faker->unique()->slug(3),
            'status' => 'draft',
            'custom_domain' => null,
            'data_json' => [
                'basic' => [
                    'title' => 'The Wedding of '.$groomName.' & '.$brideName,
                    'main_date' => $this->faker->date(),
                ],
                'couple' => [
                    [
                        'role' => 'groom',
                        'full_name' => $groomName.' '.$this->faker->lastName(),
                        'nickname' => $groomName,
                    ],
                    [
                        'role' => 'bride',
                        'full_name' => $brideName.' '.$this->faker->lastName(),
                        'nickname' => $brideName,
                    ],
                ],
            ],
        ];
    }
}
