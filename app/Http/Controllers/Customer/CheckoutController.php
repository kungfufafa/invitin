<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use App\Models\Transaction;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function create(Theme $theme)
    {
        return Inertia::render('checkout/Summary', [
            'theme' => $theme
        ]);
    }

    public function store(Request $request, Theme $theme)
    {
        // 1. Create a transaction (simulating payment)
        $transaction = Transaction::create([
            'user_id' => $request->user()->id,
            'theme_id' => $theme->id,
            'amount' => $theme->price,
            'status' => 'paid', // Auto paid for dummy
            'payment_gateway_ref' => 'DUMMY_' . Str::random(10),
        ]);

        // 2. Generate the invitation workspace
        $invitation = Invitation::create([
            'user_id' => $request->user()->id,
            'theme_id' => $theme->id,
            'transaction_id' => $transaction->id,
            'status' => 'draft',
            'data_json' => [
                'bride' => '...',
                'groom' => '...',
                'date' => null,
                'venue' => '...',
            ],
        ]);

        return redirect()->route('checkout.success', $invitation->id);
    }

    public function success(Invitation $invitation)
    {
        // Ensure the logged in user owns this invitation
        if ($invitation->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('checkout/Success', [
            'invitation' => $invitation->load('theme')
        ]);
    }
}
