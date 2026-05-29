<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// version 1.0.0
Route::prefix('v1')->group(function () {

    Route::prefix('auth')->group(function (){
        Route::get('/sanctum/csrf-cookie',     [AuthController::class,'showCsrfCookie']);
        Route::post('/login',                  [AuthController::class,'login']);
        Route::post('/',                       [AuthController::class,'register']);
    });


    Route::middleware(['auth:sanctum'])->group(function () {
        // ── Activities ───────────────────────────────────────────────────────────
        Route::prefix('activities')->group(function () {
            Route::get('/',                       [ActivityController::class, 'index']);
            Route::post('/',                      [ActivityController::class, 'store']);
            Route::get('/{activity}',             [ActivityController::class, 'show']);
            Route::put('/{activity}',             [ActivityController::class, 'update']);
            Route::patch('/{activity}/status',    [ActivityController::class, 'updateStatus']);
            Route::delete('/{activity}',          [ActivityController::class, 'destroy']);
        });


        // ── Logs ───────────────────────────────────────────────────────────
        Route::prefix('logs')->group(function () {
            Route::post('/',                         [ActivityLogController::class, 'store']);
            Route::get('/daily',                     [ActivityLogController::class, 'daily']);
            Route::get('/report',                    [ActivityLogController::class, 'report']);
            Route::get('/history/{activity}',        [ActivityLogController::class, 'history']);
        });


        // // Users (admin only)
        Route::middleware('admin')->group(function () {
            Route::prefix('users')->group(function () {
                Route::get('/',          [UserController::class, 'index']);
                Route::post('/',         [UserController::class, 'store']);
                Route::put('/{user}',    [UserController::class, 'update']);
                Route::delete('/{user}', [UserController::class, 'destroy']);
            });
        });


    });


});





// <?phijp

// use App\Http\Controllers\ActivityController;
// use App\Http\Controllers\ActivityLogController;
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\UserController;
// use Illuminate\Support\Facades\Route;

// // Public
// Route::post('/auth/login',  [AuthController::class, 'login']);
// Route::post('/auth/logout', [AuthController::class, 'logout']);

// // Authenticated
// Route::middleware('auth:sanctum')->group(function () {

//     Route::get('/auth/me', fn() => response()->json(['success' => true, 'user' => auth()->user()]));

//     // Activities
//     Route::get('/activities',              [ActivityController::class, 'index']);
//     Route::get('/activities/{activity}',   [ActivityController::class, 'show']);
//     Route::post('/activities',             [ActivityController::class, 'store']);
//     Route::put('/activities/{activity}',   [ActivityController::class, 'update']);
//     Route::delete('/activities/{activity}',[ActivityController::class, 'destroy']);

//     // Logs
//     Route::post('/logs',                          [ActivityLogController::class, 'store']);
//     Route::get('/logs/daily',                     [ActivityLogController::class, 'daily']);
//     Route::get('/logs/report',                    [ActivityLogController::class, 'report']);
//     Route::get('/logs/history/{activity}',        [ActivityLogController::class, 'history']);

//     // Users (admin only)
//     Route::middleware('admin')->group(function () {
//         Route::get('/users',          [UserController::class, 'index']);
//         Route::post('/users',         [UserController::class, 'store']);
//         Route::put('/users/{user}',   [UserController::class, 'update']);
//         Route::delete('/users/{user}',[UserController::class, 'destroy']);
//     });
// });
