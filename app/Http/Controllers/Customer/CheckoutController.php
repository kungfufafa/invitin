<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Theme;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function create(Theme $theme): Response
    {
        return Inertia::render('checkout/Summary', [
            'invitationCount' => auth()->user()?->invitations()->count() ?? 0,
            'theme' => $theme,
        ]);
    }

    public function store(Request $request, Theme $theme): RedirectResponse
    {
        // 1. Create a transaction (simulating payment)
        $transaction = Transaction::create([
            'user_id' => $request->user()->id,
            'theme_id' => $theme->id,
            'amount' => $theme->price,
            'status' => 'paid', // Auto paid for dummy
            'payment_gateway_ref' => 'DUMMY_'.Str::random(10),
        ]);

        // 2. Generate the invitation workspace
        $title = 'The Wedding of ... & ...';

        $invitation = Invitation::create([
            'user_id' => $request->user()->id,
            'theme_id' => $theme->id,
            'transaction_id' => $transaction->id,
            'title' => $title,
            'slug' => Str::slug($request->user()->name.'-'.$theme->slug).'-'.Str::lower(Str::random(6)),
            'status' => 'draft',
            'data_json' => [
                'basic' => [
                    'title' => $title,
                    'main_date' => null,
                ],
                'couple' => [
                    [
                        'role' => 'groom',
                        'full_name' => '',
                        'nickname' => '',
                    ],
                    [
                        'role' => 'bride',
                        'full_name' => '',
                        'nickname' => '',
                    ],
                ],
            ],
        ]);

        return redirect()->route('checkout.success', $invitation->id);
    }

    public function success(Invitation $invitation): Response
    {
        // Ensure the logged in user owns this invitation
        if ($invitation->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('checkout/Success', [
            'invitation' => $invitation->load('theme'),
        ]);
    }
}
