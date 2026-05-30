<?php

use App\Models\Theme;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Invitation;

test('authenticated user can view checkout summary', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $theme = Theme::factory()->create();

    $response = $this->get(route('checkout.create', $theme->slug));
    $response->assertOk();
});

test('unauthenticated user cannot view checkout summary', function () {
    $theme = Theme::factory()->create();

    $response = $this->get(route('checkout.create', $theme->slug));
    $response->assertRedirect(route('login'));
});

test('authenticated user can complete checkout and generate invitation', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $theme = Theme::factory()->create();

    $response = $this->post(route('checkout.store', $theme->slug));

    $this->assertDatabaseHas('transactions', [
        'user_id' => $user->id,
        'theme_id' => $theme->id,
        'status' => 'paid',
    ]);

    $this->assertDatabaseHas('invitations', [
        'user_id' => $user->id,
        'theme_id' => $theme->id,
        'status' => 'draft',
    ]);

    $invitation = Invitation::first();
    $response->assertRedirect(route('checkout.success', $invitation->id));
});

test('user cannot view success page for another users invitation', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $this->actingAs($user2);
    
    $theme = Theme::factory()->create();
    $transaction = Transaction::factory()->create(['user_id' => $user1->id, 'theme_id' => $theme->id]);
    $invitation = Invitation::factory()->create(['user_id' => $user1->id, 'theme_id' => $theme->id, 'transaction_id' => $transaction->id]);

    $response = $this->get(route('checkout.success', $invitation->id));
    $response->assertForbidden();
});
