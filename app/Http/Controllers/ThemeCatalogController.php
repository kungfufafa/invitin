<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThemeCatalogController extends Controller
{
    public function index(Request $request)
    {
        $query = Theme::where('status', 'active');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'oldest':
                    $query->oldest();
                    break;
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'latest':
                default:
                    $query->latest();
                    break;
            }
        } else {
            $query->latest();
        }

        $themes = $query->paginate(8)->withQueryString();

        $categories = Theme::where('status', 'active')
            ->select('category')
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('themes/Index', [
            'themes' => $themes,
            'filters' => (object) $request->only(['category', 'sort']),
            'categories' => $categories
        ]);
    }

    public function show($slug)
    {
        $theme = Theme::where('slug', $slug)
            ->where('status', 'active')
            ->firstOrFail();

        return Inertia::render('themes/Show', [
            'theme' => $theme
        ]);
    }
}
