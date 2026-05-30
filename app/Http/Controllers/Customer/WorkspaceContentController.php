<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkspaceContentController extends Controller
{
    public function edit(Invitation $invitation): Response
    {
        abort_if($invitation->user_id !== request()->user()->id, 403);

        return Inertia::render('customer/workspace/content', [
            'invitation' => $invitation
        ]);
    }

    public function update(Request $request, Invitation $invitation)
    {
        abort_if($invitation->user_id !== $request->user()->id, 403);

        $validated = $request->validate([
            'data_json' => 'required|array',
        ]);

        $invitation->update([
            'data_json' => $validated['data_json'],
        ]);

        return redirect()->back()->with('success', 'Konten undangan berhasil disimpan.');
    }
}
