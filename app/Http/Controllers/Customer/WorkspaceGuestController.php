<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Inertia\Inertia;
use Inertia\Response;

class WorkspaceGuestController extends Controller
{
    public function index(Invitation $invitation): Response
    {
        abort_if($invitation->user_id !== request()->user()->id, 403);

        return Inertia::render('customer/workspace/guests', [
            'invitation' => $invitation,
            'guests' => [] // Nanti diisi dengan data dari tabel tamu
        ]);
    }
}
