<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );

        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response, \Throwable $exception, Request $request) {
            $statusCode = $response->getStatusCode();
            
            // Tetap tampilkan stack trace bawaan Laravel (Ignition) jika terjadi error 500 di environment local
            if (app()->environment(['local', 'testing']) && $statusCode === 500) {
                return $response;
            }

            if (in_array($statusCode, [500, 503, 404, 403])) {
                return \Inertia\Inertia::render('Error', ['status' => $statusCode])
                    ->toResponse($request)
                    ->setStatusCode($statusCode);
            }

            return $response;
        });
    })->create();
