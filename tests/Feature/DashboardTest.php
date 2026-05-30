<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users are redirected based on role', function () {
    $user = User::factory()->create(['role' => 'customer']);
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('customer.dashboard'));

    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('admin.dashboard'));
});

test('admin can visit admin dashboard', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);

    $response = $this->get(route('admin.dashboard'));
    $response->assertOk();
});

test('customer cannot visit admin dashboard', function () {
    $user = User::factory()->create(['role' => 'customer']);
    $this->actingAs($user);

    $response = $this->get(route('admin.dashboard'));
    $response->assertForbidden();
});

test('customer can visit customer dashboard', function () {
    $user = User::factory()->create(['role' => 'customer']);
    $this->actingAs($user);

    $response = $this->get(route('customer.dashboard'));
    $response->assertOk();
});