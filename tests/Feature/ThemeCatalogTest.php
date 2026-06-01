<?php

use App\Models\Theme;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

test('public can view themes catalog', function () {
    Theme::factory()->count(3)->create(['status' => 'active']);

    $response = $this->get(route('themes.index'));
    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('themes/Index')
            ->has('themes.data', 3));
});

test('public can view active theme details', function () {
    $theme = Theme::factory()->create(['status' => 'active']);

    $response = $this->get(route('themes.show', $theme->slug));
    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('themes/Show')
            ->where('theme.id', $theme->id));
});

test('public cannot view inactive theme details', function () {
    $theme = Theme::factory()->create(['status' => 'inactive']);

    $response = $this->get(route('themes.show', $theme->slug));
    $response->assertNotFound();
});
