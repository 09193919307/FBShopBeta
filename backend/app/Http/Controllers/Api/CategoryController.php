<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * List all active categories.
     */
    public function index()
    {
        $categorias = Category::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'description', 'is_active']);

        return response()->json([
            'cantidad' => $categorias->count(),
            'categorias' => $categorias,
        ]);
    }

    /**
     * Create a new category.
     * TODO(security): Protect this endpoint with admin-only middleware once real auth is implemented.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name',
            'description' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        $categoria = Category::create($validated);

        return response()->json([
            'message' => 'Categoría creada correctamente.',
            'data' => $categoria,
        ], 201);
    }

    /**
     * Update an existing category.
     * TODO(security): Protect this endpoint with admin-only middleware once real auth is implemented.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:100|unique:categories,name,' . $category->id,
            'description' => 'nullable|string|max:500',
            'is_active' => 'sometimes|boolean',
        ]);

        $category->update($validated);

        return response()->json([
            'message' => 'Categoría actualizada correctamente.',
            'data' => $category->fresh(),
        ]);
    }

    /**
     * Delete a category (only if it has no products linked).
     * TODO(security): Protect this endpoint with admin-only middleware once real auth is implemented.
     */
    public function destroy(Category $category)
    {
        if ($category->products()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar: la categoría tiene productos asociados.',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => 'Categoría eliminada correctamente.',
        ]);
    }
}
