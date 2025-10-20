<?php

namespace App\Filament\Resources\OfficialResource\Pages;

use App\Filament\Resources\OfficialResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOfficials extends ListRecords
{
    protected static string $resource = OfficialResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
