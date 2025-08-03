<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the business dashboard.
     */
    public function index()
    {
        $totalCustomers = Customer::active()->count();
        $totalProducts = Product::active()->count();
        $lowStockProducts = Product::lowStock()->active()->count();
        $recentSales = Sale::with(['customer'])
            ->latest('sale_date')
            ->take(5)
            ->get();
        
        $monthlyRevenue = Sale::where('status', 'completed')
            ->whereMonth('sale_date', now()->month)
            ->whereYear('sale_date', now()->year)
            ->sum('total_amount');
        
        $todaysSales = Sale::whereDate('sale_date', now()->toDateString())
            ->count();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalCustomers' => $totalCustomers,
                'totalProducts' => $totalProducts,
                'lowStockProducts' => $lowStockProducts,
                'monthlyRevenue' => $monthlyRevenue,
                'todaysSales' => $todaysSales,
            ],
            'recentSales' => $recentSales,
        ]);
    }
}