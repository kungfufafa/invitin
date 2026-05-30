<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class WorkspaceSettingsController extends Controller
{
    public function edit(Invitation $invitation): Response
    {
        // Pastikan hanya pemilik yang bisa akses
        abort_if($invitation->user_id !== request()->user()->id, 403);

        return Inertia::render('customer/workspace/settings', [
            'invitation' => $invitation
        ]);
    }

    public function update(Request $request, Invitation $invitation)
    {
        abort_if($invitation->user_id !== $request->user()->id, 403);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:invitations,slug,' . $invitation->id,
        ]);

        $invitation->update([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['slug']),
        ]);

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }

    public function publish(Request $request, Invitation $invitation)
    {
        abort_if($invitation->user_id !== $request->user()->id, 403);

        $invitation->update([
            'status' => 'published'
        ]);

        return redirect()->back()->with('success', 'Undangan berhasil dipublikasikan!');
    }
}
