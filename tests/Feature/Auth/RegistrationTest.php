<?php

use App\Models\Theme;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('new users continue to checkout after registering from an order', function () {
    $theme = Theme::factory()->create();
    $this->withSession([
        'url.intended' => route('checkout.create', $theme->slug, false),
    ]);

    $response = $this->post(route('register.store'), [
        'name' => 'Order Customer',
        'email' => 'order@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('checkout.create', $theme->slug, false));
});
