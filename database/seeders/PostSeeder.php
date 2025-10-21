<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            $title = "Judul Berita Ke-$i";
            Post::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'body' => "Ini adalah isi dari berita ke-$i.",
                'image' => "https://via.placeholder.com/800x600.png/004422?text=Berita+$i",
                'published_at' => now(),
                'user_id' => 1
            ]);
        }
    }
}