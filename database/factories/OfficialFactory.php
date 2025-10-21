<?php

namespace Database\Factories;

use App\Models\Official;
use Illuminate\Database\Eloquent\Factories\Factory;

class OfficialFactory extends Factory
{
    protected $model = Official::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'position' => $this->faker->jobTitle(),
            'photo' => $this->faker->imageUrl(),
            'order' => $this->faker->numberBetween(1, 10),
        ];
    }
}