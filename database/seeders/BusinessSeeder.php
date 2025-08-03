<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create categories first
        $categories = Category::factory(8)->active()->create();

        // Create customers
        $customers = Customer::factory(25)->active()->create();

        // Create products with existing categories
        $products = Product::factory(40)
            ->active()
            ->state(function (array $attributes) use ($categories) {
                return [
                    'category_id' => $categories->random()->id,
                ];
            })
            ->create();

        // Create some low stock products
        Product::factory(5)
            ->active()
            ->lowStock()
            ->state(function (array $attributes) use ($categories) {
                return [
                    'category_id' => $categories->random()->id,
                ];
            })
            ->create();

        // Create sales with existing customers
        $sales = [];
        
        // Create some recent sales
        for ($i = 0; $i < 15; $i++) {
            $sale = Sale::factory()
                ->completed()
                ->state(function (array $attributes) use ($customers) {
                    return [
                        'customer_id' => $customers->random()->id,
                        'sale_date' => fake()->dateTimeBetween('-1 month', 'now'),
                    ];
                })
                ->create();
            
            $sales[] = $sale;
        }

        // Create some sales from today
        for ($i = 0; $i < 3; $i++) {
            $sale = Sale::factory()
                ->completed()
                ->today()
                ->state(function (array $attributes) use ($customers) {
                    return [
                        'customer_id' => $customers->random()->id,
                    ];
                })
                ->create();
            
            $sales[] = $sale;
        }

        // Create sale items for each sale
        foreach ($sales as $sale) {
            $itemCount = random_int(1, 4);
            $saleItems = [];
            
            for ($j = 0; $j < $itemCount; $j++) {
                $product = $products->random();
                $quantity = random_int(1, 3);
                $unitPrice = (float) $product->price;
                $totalPrice = $quantity * $unitPrice;
                
                $saleItems[] = SaleItem::factory()->create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                ]);
            }
            
            // Update sale totals based on items
            $subtotal = collect($saleItems)->sum('total_price');
            $taxAmount = $subtotal * 0.08;
            $totalAmount = $subtotal + $taxAmount;
            
            $sale->update([
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
            ]);
        }
    }
}