<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\Gallery;
use App\Models\Post;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    /**
     * @return array<Stat>
     */
    protected function getStats(): array
    {
        return [
            Stat::make('Total Berita', Post::count())
                ->description('Jumlah semua berita yang telah dipublikasikan')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('success'),

            Stat::make('Total Galeri', Gallery::count())
                ->description('Jumlah semua album foto kegiatan')
                ->descriptionIcon('heroicon-m-photo')
                ->color('info'),

            Stat::make('Jumlah Kegiatan', Event::count())
                ->description('Jumlah semua kegiatan yang dijadwalkan')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('primary'),

            Stat::make('Total Pengguna', User::count())
                ->description('Jumlah pengguna yang terdaftar di sistem')
                ->descriptionIcon('heroicon-m-users')
                ->color('warning'),
        ];
    }
}