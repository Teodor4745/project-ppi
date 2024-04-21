<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductCategory;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->with('category.type');

        if ($request->filled('type_name')) {
            $query->whereHas('category.type', function ($typeQuery) use ($request) {
                $typeQuery->where('title', $request->type_name);
            });
        }

        if ($request->filled('category_name')) {
            $query->whereHas('category', function ($query) use ($request) {
                $query->where('title', $request->category_name);
            });
        }

        $products = $query->get();
        return response()->json($products);
    }



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'price' => 'required|numeric',
            'product_category' => 'required|numeric',
            'description' => 'required|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $filename);
            $validatedData['image'] = 'images/' . $filename;
        }

        $product = Product::create($validatedData);
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }


    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $filename);
            $validatedData['image'] = 'images/' . $filename;
        }

        $product->update($validatedData);
        return response()->json($product);
    }


    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully.']);
    }


    public function getCategories(Request $request)
    {
        if ($request->filled('type_name')) {
            $categories = ProductCategory::whereHas('type', function ($query) use ($request) {
                $query->where('title', $request->type_name);
            })->get(['id', 'title']);
        } else {
            $categories = ProductCategory::all(['id', 'title']);
        }

        return response()->json($categories);
    }


}
