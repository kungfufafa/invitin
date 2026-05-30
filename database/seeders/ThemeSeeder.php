<?php

namespace Database\Seeders;

use App\Models\Theme;
use App\Models\ThemeVersion;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        $themes = Theme::factory(10)->create();

        foreach ($themes as $theme) {
            ThemeVersion::factory()->create([
                'theme_id' => $theme->id,
                'renderer_key' => 'theme_' . str_replace('-', '_', $theme->slug),
            ]);
        }
    }
}
