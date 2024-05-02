<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
use App\Models\SaleProduct;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function index()
    {
        $orders = Sale::with(['user'])->get();
        return response()->json(['orders' => $orders]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'shipping_type_id' => 'required|exists:shipping_types,id',
            'user_id' => 'required|exists:users,id',
            'products' => 'required|array', 
            'products.*.id' => 'required|exists:products,id', 
            'products.*.quantity' => 'required|integer|min:1', 
            'office' => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            $sale = Sale::create([
                'user_id' => $validatedData['user_id'],
                'shipping_type_id' => $validatedData['shipping_type_id'],
                'office' => $validatedData['office'],
            ]);

            foreach ($request->products as $product) {
                SaleProduct::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product['id'],
                    'quantity' => $product['quantity'],
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Sale created successfully.', 'sale' => $sale], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error creating sale: ' . $e->getMessage()], 500);
        }
    }

    public function show(Sale $order)
    {
        return response()->json(['order' => $order]);
    }

    public function update(Request $request, Sale $order)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $order->update($validatedData);
        return response()->json(['message' => 'Sale updated successfully.', 'order' => $order]);
    }

    public function destroy(Sale $order)
    {
        $order->delete();
        return response()->json(['message' => 'Sale deleted successfully.']);
    }
}
