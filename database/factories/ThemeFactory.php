<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ThemeFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(2, true);
        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'category' => fake()->randomElement(['wedding', 'birthday', 'event']),
            'style' => fake()->randomElement(['elegant', 'minimalist', 'floral', 'modern']),
            'price' => fake()->randomElement([149000, 299000, 599000]),
            'status' => 'active',
            'is_featured' => fake()->boolean(20),
        ];
    }
}
