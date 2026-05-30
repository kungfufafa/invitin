<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ThemeCatalogController;
use App\Http\Controllers\Customer\CheckoutController;
use App\Http\Controllers\PublicInvitationController;
use App\Http\Controllers\Customer\WorkspaceSettingsController;
use App\Http\Controllers\Customer\WorkspaceContentController;
use App\Http\Controllers\Customer\WorkspaceGuestController;
use App\Http\Controllers\Customer\WorkspaceWishController;

Route::get('/', function () {
    $featuredThemes = \App\Models\Theme::where('status', 'active')->latest()->take(8)->get();
    return Inertia::render('welcome', [
        'featuredThemes' => $featuredThemes
    ]);
})->name('home');

Route::get('/themes', [ThemeCatalogController::class, 'index'])->name('themes.index');
Route::get('/themes/{slug}', [ThemeCatalogController::class, 'show'])->name('themes.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (request()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('customer.dashboard');
    })->name('dashboard');

    Route::get('/checkout/{theme:slug}', [CheckoutController::class, 'create'])->name('checkout.create');
    Route::post('/checkout/{theme:slug}', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/success/{invitation}', [CheckoutController::class, 'success'])->name('checkout.success');

    // Workspace Routes
    Route::prefix('workspace/{invitation}')->name('workspace.')->group(function () {
        Route::get('/', function (\App\Models\Invitation $invitation) {
            return redirect()->route('workspace.settings', $invitation);
        })->name('index');
        
        Route::get('/settings', [WorkspaceSettingsController::class, 'edit'])->name('settings');
        Route::put('/settings', [WorkspaceSettingsController::class, 'update'])->name('settings.update');
        Route::post('/publish', [WorkspaceSettingsController::class, 'publish'])->name('publish');
        
        Route::get('/content', [WorkspaceContentController::class, 'edit'])->name('content');
        Route::put('/content', [WorkspaceContentController::class, 'update'])->name('content.update');
        
        Route::get('/guests', [WorkspaceGuestController::class, 'index'])->name('guests');
        Route::get('/wishes', [WorkspaceWishController::class, 'index'])->name('wishes');
    });
});

// Public Invitation Route
Route::get('/u/{invitation:slug}', [PublicInvitationController::class, 'show'])->name('public.invitation.show');

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
require __DIR__.'/customer.php';
