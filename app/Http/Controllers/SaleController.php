<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with(['customer'])
            ->when(request('search'), function ($query, $search) {
                $query->where('sale_number', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($customerQuery) use ($search) {
                        $customerQuery->where('name', 'like', "%{$search}%");
                    });
            })
            ->when(request('status'), function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest('sale_date')
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('sales/index', [
            'sales' => $sales,
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::active()->get();
        $products = Product::active()->with('category')->get();

        return Inertia::render('sales/create', [
            'customers' => $customers,
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        $data = $request->validated();
        $data['sale_number'] = 'SALE-' . strtoupper(Str::random(8));
        
        $sale = Sale::create($data);

        // Create sale items
        foreach ($data['items'] as $item) {
            $sale->saleItems()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total_price' => $item['quantity'] * $item['unit_price'],
            ]);

            // Update product quantity
            $product = Product::find($item['product_id']);
            $product->decrement('quantity', $item['quantity']);
        }

        return redirect()->route('sales.show', $sale)
            ->with('success', 'Sale created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load(['customer', 'saleItems.product.category']);

        return Inertia::render('sales/show', [
            'sale' => $sale,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        $customers = Customer::active()->get();
        $products = Product::active()->with('category')->get();
        $sale->load('saleItems.product');

        return Inertia::render('sales/edit', [
            'sale' => $sale,
            'customers' => $customers,
            'products' => $products,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {
        $sale->update($request->validated());

        return redirect()->route('sales.show', $sale)
            ->with('success', 'Sale updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        // Restore product quantities
        foreach ($sale->saleItems as $item) {
            $product = Product::find($item->product_id);
            $product->increment('quantity', $item->quantity);
        }

        $sale->delete();

        return redirect()->route('sales.index')
            ->with('success', 'Sale deleted successfully.');
    }
}