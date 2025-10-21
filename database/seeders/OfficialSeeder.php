<?php

namespace Database\Seeders;

use App\Models\Official;
use Illuminate\Database\Seeder;

class OfficialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $officials = [
            [
                'name' => 'Nama Geuchik',
                'position' => 'Geuchik',
                'photo' => 'https://via.placeholder.com/400x400.png/00aa88?text=Geuchik',
                'order' => 1
            ],
            [
                'name' => 'Nama Sekretaris',
                'position' => 'Sekretaris Gampong',
                'photo' => 'https://via.placeholder.com/400x400.png/00aa88?text=Sekretaris',
                'order' => 2
            ],
            [
                'name' => 'Nama Bendahara',
                'position' => 'Bendahara Gampong',
                'photo' => 'https://via.placeholder.com/400x400.png/00aa88?text=Bendahara',
                'order' => 3
            ],
        ];

        foreach ($officials as $official) {
            Official::create($official);
        }
    }
}