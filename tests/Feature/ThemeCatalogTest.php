<?php

use App\Models\Theme;

test('public can view themes catalog', function () {
    Theme::factory()->count(3)->create(['status' => 'active']);

    $response = $this->get(route('themes.index'));
    $response->assertOk();
});

test('public can view active theme details', function () {
    $theme = Theme::factory()->create(['status' => 'active']);

    $response = $this->get(route('themes.show', $theme->slug));
    $response->assertOk();
});

test('public cannot view inactive theme details', function () {
    $theme = Theme::factory()->create(['status' => 'inactive']);

    $response = $this->get(route('themes.show', $theme->slug));
    $response->assertNotFound();
});
