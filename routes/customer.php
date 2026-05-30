<?php

use App\Http\Controllers\Customer\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('app')
    ->name('customer.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    });
