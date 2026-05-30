<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ThemeController extends Controller
{
    public function index()
    {
        $themes = Theme::with('versions')->latest()->paginate(10);
        return Inertia::render('admin/themes/Index', [
            'themes' => $themes
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/themes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'style' => 'nullable|string|max:255',
            'price' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive',
            'is_featured' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(4);

        Theme::create($validated);

        return redirect()->route('admin.themes.index')->with('success', 'Theme created successfully.');
    }

    public function edit(Theme $theme)
    {
        return Inertia::render('admin/themes/Edit', [
            'theme' => $theme
        ]);
    }

    public function update(Request $request, Theme $theme)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'style' => 'nullable|string|max:255',
            'price' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive',
            'is_featured' => 'boolean',
        ]);

        $theme->update($validated);

        return redirect()->route('admin.themes.index')->with('success', 'Theme updated successfully.');
    }

    public function destroy(Theme $theme)
    {
        $theme->delete();
        return redirect()->route('admin.themes.index')->with('success', 'Theme deleted successfully.');
    }
}
