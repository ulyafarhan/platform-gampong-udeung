<?php

namespace Database\Factories;

use App\Models\Guide;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class GuideFactory extends Factory
{
    protected $model = Guide::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence,
            'slug' => $this->faker->unique()->slug,
            'description' => $this->faker->paragraph,
            'requirements' => [$this->faker->word => $this->faker->word],
            'step_by_step' => $this->faker->paragraphs(3, true),
            'estimated_time' => $this->faker->word,
            'cost' => 'Rp 0,-',
            'tips' => $this->faker->paragraph,
        ];
    }
}