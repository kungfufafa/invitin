<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $invitations = $request->user()->invitations()->with('theme')->latest()->get();
        return Inertia::render('customer/dashboard', [
            'invitations' => $invitations
        ]);
    }
}
