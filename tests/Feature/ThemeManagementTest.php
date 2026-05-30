<?php

use App\Models\Theme;
use App\Models\User;

test('admin can view themes index', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);

    Theme::factory()->count(3)->create();

    $response = $this->get(route('admin.themes.index'));
    $response->assertOk();
});

test('customer cannot view themes index', function () {
    $customer = User::factory()->create(['role' => 'customer']);
    $this->actingAs($customer);

    $response = $this->get(route('admin.themes.index'));
    $response->assertForbidden();
});

test('admin can create theme', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);

    $response = $this->post(route('admin.themes.store'), [
        'name' => 'New Theme',
        'category' => 'wedding',
        'style' => 'elegant',
        'price' => 150000,
        'status' => 'active',
        'is_featured' => false,
    ]);

    $response->assertRedirect(route('admin.themes.index'));
    $this->assertDatabaseHas('themes', ['name' => 'New Theme']);
});
