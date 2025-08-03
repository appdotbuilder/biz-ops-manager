<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Electronics',
            'Clothing',
            'Books',
            'Home & Garden',
            'Sports & Outdoors',
            'Health & Beauty',
            'Automotive',
            'Toys & Games',
            'Office Supplies',
            'Food & Beverages',
        ];

        return [
            'name' => fake()->unique()->randomElement($categories),
            'description' => fake()->optional()->paragraph(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the category is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}