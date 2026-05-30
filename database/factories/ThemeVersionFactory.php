<?php

namespace Database\Factories;

use App\Models\Theme;
use Illuminate\Database\Eloquent\Factories\Factory;

class ThemeVersionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'theme_id' => Theme::factory(),
            'version' => 'v1.0.0',
            'schema_json' => [
                'basic' => ['title' => 'Default Title'],
                'cover' => ['headline' => 'Default Headline']
            ],
            'renderer_key' => fake()->word(),
            'is_active' => true,
        ];
    }
}
