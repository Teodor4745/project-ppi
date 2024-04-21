<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUser']);

Route::post('/login', [AuthController::class, 'login']);

Route::group(['prefix' => 'products'], function () {
    Route::get('/', [ProductController::class, 'index']); 
    Route::post('/', [ProductController::class, 'store']); 
    Route::get('/{product}', [ProductController::class, 'show']); 
    Route::put('/{product}', [ProductController::class, 'update']); 
    Route::delete('/{product}', [ProductController::class, 'destroy']);         
});

Route::get('/categories', [ProductController::class, 'getCategories']);







