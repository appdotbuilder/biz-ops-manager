<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(random_int(2, 4), true),
            'description' => fake()->optional()->paragraph(),
            'sku' => strtoupper(fake()->unique()->bothify('???-####')),
            'price' => fake()->randomFloat(2, 5, 500),
            'quantity' => fake()->numberBetween(0, 100),
            'min_stock_level' => fake()->numberBetween(5, 20),
            'category_id' => Category::factory(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the product has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(function (array $attributes) {
            $minStock = fake()->numberBetween(10, 20);
            return [
                'min_stock_level' => $minStock,
                'quantity' => fake()->numberBetween(0, $minStock - 1),
            ];
        });
    }
}