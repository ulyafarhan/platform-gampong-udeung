<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 12; $i++) {
            $title = "Foto Kegiatan Gampong Ke-$i";
            Gallery::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'cover_image' => "https://via.placeholder.com/800x600.png/002244?text=Galeri+$i",
                'images' => [
                    "https://via.placeholder.com/800x600.png/002244?text=Galeri+$i-1",
                    "https://via.placeholder.com/800x600.png/002244?text=Galeri+$i-2",
                    "https://via.placeholder.com/800x600.png/002244?text=Galeri+$i-3",
                ],
                'activity_date' => now(),
                'user_id' => 1
            ]);
        }
    }
}