<?php

use App\Models\Invitation;
use App\Models\Theme;
use App\Models\Transaction;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

test('customer dashboard renders invitation workspace data', function () {
    $user = User::factory()->create(['role' => 'customer']);
    $theme = Theme::factory()->create();
    $transaction = Transaction::factory()->create([
        'user_id' => $user->id,
        'theme_id' => $theme->id,
        'status' => 'paid',
    ]);
    Invitation::factory()->create([
        'user_id' => $user->id,
        'theme_id' => $theme->id,
        'transaction_id' => $transaction->id,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('customer.dashboard'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customer/dashboard')
            ->has('invitations', 1));
});

test('customer workspace pages render expected inertia components', function (string $routeName, string $component) {
    $user = User::factory()->create(['role' => 'customer']);
    $theme = Theme::factory()->create();
    $transaction = Transaction::factory()->create([
        'user_id' => $user->id,
        'theme_id' => $theme->id,
        'status' => 'paid',
    ]);
    $invitation = Invitation::factory()->create([
        'user_id' => $user->id,
        'theme_id' => $theme->id,
        'transaction_id' => $transaction->id,
    ]);

    $this->actingAs($user);

    $response = $this->get(route($routeName, $invitation));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component($component)
            ->where('invitation.id', $invitation->id));
})->with([
    'settings' => ['workspace.settings', 'customer/workspace/settings'],
    'content' => ['workspace.content', 'customer/workspace/content'],
    'guests' => ['workspace.guests', 'customer/workspace/guests'],
    'wishes' => ['workspace.wishes', 'customer/workspace/wishes'],
]);

test('customer facing pages keep the welcome themed shell', function () {
    $customerFiles = [
        resource_path('js/pages/customer/dashboard.tsx'),
        resource_path('js/layouts/workspace-layout.tsx'),
        resource_path('js/pages/customer/workspace/settings.tsx'),
        resource_path('js/pages/customer/workspace/content.tsx'),
        resource_path('js/pages/customer/workspace/guests.tsx'),
        resource_path('js/pages/customer/workspace/wishes.tsx'),
        resource_path('js/pages/checkout/Summary.tsx'),
        resource_path('js/pages/checkout/Success.tsx'),
        resource_path('js/pages/auth/login.tsx'),
        resource_path('js/pages/auth/register.tsx'),
        resource_path('js/layouts/auth/auth-simple-layout.tsx'),
        resource_path('js/components/passkey-verify.tsx'),
        resource_path('js/components/welcome-password-input.tsx'),
    ];

    foreach ($customerFiles as $customerFile) {
        $contents = file_get_contents($customerFile);

        expect($contents)
            ->not->toContain('@/layouts/app-layout')
            ->not->toContain('@/components/ui/');
    }

    $appShell = file_get_contents(resource_path('js/app.tsx'));

    expect($appShell)
        ->not->toContain('@/components/ui/')
        ->toContain("name.startsWith('customer/')")
        ->toContain("name.startsWith('checkout/')");
});

test('other customers cannot open a workspace page', function () {
    $owner = User::factory()->create(['role' => 'customer']);
    $otherCustomer = User::factory()->create(['role' => 'customer']);
    $invitation = Invitation::factory()->create(['user_id' => $owner->id]);

    $this->actingAs($otherCustomer);

    $response = $this->get(route('workspace.settings', $invitation));

    $response->assertForbidden();
});
