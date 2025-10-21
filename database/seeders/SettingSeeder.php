<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::create([
            'key' => 'sejarah',
            'value' => 'Sejarah singkat Gampong Udeung...'
        ]);

        Setting::create([
            'key' => 'visi',
            'value' => 'Visi Gampong Udeung...'
        ]);

        Setting::create([
            'key' => 'misi',
            'value' => "Misi Gampong Udeung...\nMisi lainnya..."
        ]);
    }
}