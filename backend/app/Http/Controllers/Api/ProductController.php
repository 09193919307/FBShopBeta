<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get a list of products with optional filtering.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'categoria' => 'nullable|string|max:50|alpha_dash',
            'buscar'    => 'nullable|string|max:100',
        ]);

        $query = Product::query();

        $query->where('status', 'disponible');

        if (!empty($validated['categoria']) && strtolower($validated['categoria']) !== 'todos') {
            $query->whereHas('category', function ($q) use ($validated) {
                $q->where('name', $validated['categoria']);
            });
        }

        if (!empty($validated['buscar'])) {
            $busqueda = $validated['buscar'];
            $query->where(function ($q) use ($busqueda) {
                $q->where('name', 'ILIKE', "%{$busqueda}%")
                  ->orWhere('description', 'ILIKE', "%{$busqueda}%");
            });
        }

        $productos = $query->with('category:id,name')->get()->map(fn($p) => $this->formatPublic($p));

        return response()->json([
            'tienda'    => 'FBShop',
            'cantidad'  => $productos->count(),
            'productos' => $productos,
        ]);
    }

    /**
     * List ALL products for admin (no status filter, full fields).
     * TODO(security): Protect this endpoint with admin-only middleware once real auth is implemented.
     */
    public function adminIndex()
    {
        $productos = Product::with('category:id,name')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($p) => $this->formatAdmin($p));

        return response()->json([
            'cantidad'  => $productos->count(),
            'productos' => $productos,
        ]);
    }

    /**
     * Create a new product.
     * TODO(security): Protect this endpoint with admin-only middleware once real auth is implemented.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'name'        => 'required|string|max:150',
            'description' => 'nullable|string|max:1000',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'image_url'   => 'nullable|url|max:255',
            'status'      => 'required|in:disponible,agotado,inactivo',
        ]);

        $product = Product::create($validated);
        $product->load('category:id,name');

        return response()->json([
            'message' => 'Producto creado correctamente.',
            'data'    => $this->formatAdmin($product),
        ], 201);
    }

    /**
     * Show a single product.
     */
    public function show(Product $product)
    {
        $product->load('category:id,name');
        return response()->json($this->formatAdmin($product));
    }

    /**
     * Update an existing product.
     * TODO(security): Protect this endpoint with admin-only middleware once real auth is implemented.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|required|integer|exists:categories,id',
            'name'        => 'sometimes|required|string|max:150',
            'description' => 'nullable|string|max:1000',
            'price'       => 'sometimes|required|numeric|min:0',
            'stock'       => 'sometimes|required|integer|min:0',
            'image_url'   => 'nullable|url|max:255',
            'status'      => 'sometimes|required|in:disponible,agotado,inactivo',
        ]);

        $product->update($validated);
        $product->load('category:id,name');

        return response()->json([
            'message' => 'Producto actualizado correctamente.',
            'data'    => $this->formatAdmin($product->fresh(['category'])),
        ]);
    }

    /**
     * Delete a product permanently.
     * TODO(security): Protect this endpoint with admin-only middleware once real auth is implemented.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado correctamente.',
        ]);
    }

    /* ── Helpers de formato (evitan exponer campos internos innecesarios) ── */

    private function formatPublic(Product $p): array
    {
        return [
            'id'         => $p->id,
            'nombre'     => $p->name,
            'precio'     => (float) $p->price,
            'categoria'  => $p->category ? $p->category->name : 'General',
            'descripcion'=> $p->description,
            'imagen'     => $p->image_url,
            'disponible' => $p->status === 'disponible' && $p->stock > 0,
            'destacado'  => false,
        ];
    }

    private function formatAdmin(Product $p): array
    {
        return [
            'id'          => $p->id,
            'category_id' => $p->category_id,
            'nombre'      => $p->name,
            'precio'      => (float) $p->price,
            'stock'       => $p->stock,
            'categoria'   => $p->category ? $p->category->name : 'General',
            'descripcion' => $p->description,
            'imagen'      => $p->image_url,
            'status'      => $p->status,
            'creado'      => $p->created_at?->toDateString(),
        ];
    }
}
