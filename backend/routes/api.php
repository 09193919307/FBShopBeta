<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| Catalog (Public) Routes
|--------------------------------------------------------------------------
*/
Route::get('/productos', [ProductController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Admin Routes
| TODO(security): Add ->middleware('auth:sanctum') once real auth is wired.
|--------------------------------------------------------------------------
*/

// Products – full CRUD
Route::get('/admin/productos',         [ProductController::class, 'adminIndex']);
Route::post('/admin/productos',        [ProductController::class, 'store']);
Route::get('/admin/productos/{product}',    [ProductController::class, 'show']);
Route::put('/admin/productos/{product}',    [ProductController::class, 'update']);
Route::delete('/admin/productos/{product}', [ProductController::class, 'destroy']);

// Categories – full CRUD
Route::get('/admin/categorias',              [CategoryController::class, 'index']);
Route::post('/admin/categorias',             [CategoryController::class, 'store']);
Route::put('/admin/categorias/{category}',   [CategoryController::class, 'update']);
Route::delete('/admin/categorias/{category}',[CategoryController::class, 'destroy']);
