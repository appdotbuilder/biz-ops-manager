<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 50, 1000);
        $taxAmount = $subtotal * 0.08; // 8% tax
        $totalAmount = $subtotal + $taxAmount;

        return [
            'sale_number' => 'SALE-' . strtoupper(Str::random(8)),
            'customer_id' => Customer::factory(),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'status' => fake()->randomElement(['pending', 'completed', 'cancelled']),
            'notes' => fake()->optional()->paragraph(),
            'sale_date' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }

    /**
     * Indicate that the sale is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    /**
     * Indicate that the sale is from today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'sale_date' => now(),
        ]);
    }
}