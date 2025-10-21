<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 5; $i++) {
            Event::create([
                'name' => "Kegiatan Gampong Ke-$i",
                'description' => "Ini adalah deskripsi dari kegiatan ke-$i.",
                'location' => "Balai Desa",
                'starts_at' => now()->addDays($i * 2),
                'user_id' => 1
            ]);
        }
    }
}