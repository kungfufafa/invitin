<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\Request;

class PublicInvitationController extends Controller
{
    public function show(Invitation $invitation)
    {
        // Hanya yang statusnya published yang bisa dilihat publik, 
        // KECUALI jika user yang login adalah pemiliknya (untuk keperluan preview)
        $isOwner = auth()->check() && auth()->user()->id === $invitation->user_id;

        if ($invitation->status !== 'published' && !$isOwner) {
            abort(404, 'Undangan belum dipublikasikan atau tidak ditemukan.');
        }

        return view('invitation', [
            'invitation' => $invitation,
            'data' => $invitation->data_json ?? []
        ]);
    }
}
