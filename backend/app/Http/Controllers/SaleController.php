<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;

class SaleController extends Controller
{
    public function index()
    {
        $orders = Sale::with(['user'])->get();
        return view('orders.index', compact('orders'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'shipping_type_id' => 'required|exists:shipping_types,id',
            'user_id' => 'required|exists:users,id',
        ]);

        Sale::create($validatedData);
        return redirect()->route('orders.index')->with('success', 'Sale created successfully.');
    }

    public function show(Sale $order)
    {
        return view('orders.show', compact('order'));
    }

    public function update(Request $request, Sale $order)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $order->update($validatedData);
        return redirect()->route('orders.index')->with('success', 'Sale updated successfully.');
    }

    public function destroy(Sale $order)
    {
        $order->delete();
        return redirect()->route('orders.index')->with('success', 'Sale deleted successfully.');
    }
}
