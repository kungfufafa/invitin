<?php

use App\Models\Invitation;
use App\Models\Theme;
use App\Models\Transaction;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

test('authenticated user can view checkout summary', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $theme = Theme::factory()->create();

    $response = $this->get(route('checkout.create', $theme->slug));
    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('checkout/Summary')
            ->where('invitationCount', 0)
            ->where('theme.id', $theme->id));
});

test('unauthenticated user is sent to login with checkout intent', function () {
    $theme = Theme::factory()->create();

    $response = $this->get(route('checkout.create', $theme->slug));

    $response
        ->assertRedirect(route('login'))
        ->assertSessionHas('url.intended', route('checkout.create', $theme->slug));

    $this->get(route('login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('auth/login')
            ->where('orderIntent.name', $theme->name)
            ->where('orderIntent.price', $theme->price)
            ->where('orderIntent.checkout_url', route('checkout.create', $theme->slug, false)));

    $this->get(route('register'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('auth/register')
            ->where('orderIntent.name', $theme->name)
            ->where('orderIntent.price', $theme->price)
            ->where('orderIntent.checkout_url', route('checkout.create', $theme->slug, false)));
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
    expect($invitation->title)->toBe('The Wedding of ... & ...')
        ->and($invitation->slug)->not->toBeEmpty();

    $response->assertRedirect(route('checkout.success', $invitation->id));
});

test('existing customer can buy the same theme again', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $theme = Theme::factory()->create();

    $this->post(route('checkout.store', $theme->slug));

    $this->get(route('checkout.create', $theme->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('checkout/Summary')
            ->where('invitationCount', 1)
            ->where('theme.id', $theme->id));

    $this->post(route('checkout.store', $theme->slug))
        ->assertRedirect();

    expect(Invitation::query()->where('user_id', $user->id)->count())->toBe(2)
        ->and(Transaction::query()->where('user_id', $user->id)->count())->toBe(2);
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
