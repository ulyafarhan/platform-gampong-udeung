<?php

namespace Database\Seeders;

use App\Models\Guide;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GuideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 8; $i++) {
            $title = "Panduan Layanan Ke-$i";
            Guide::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'description' => "Ini adalah deskripsi singkat untuk panduan layanan ke-$i.",
                'requirements' => json_encode(['Fotokopi KTP', 'Fotokopi Kartu Keluarga']),
                'step_by_step' => "Langkah 1: ...\nLangkah 2: ...\nLangkah 3: ...",
                'estimated_time' => '1-2 Hari Kerja',
                'user_id' => 1,
            ]);
        }
    }
}