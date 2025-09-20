<?php

namespace App\Filament\Resources\QuickFoodEntryResource\Pages;

use App\Filament\Resources\QuickFoodEntryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListQuickFoodEntries extends ListRecords
{
    protected static string $resource = QuickFoodEntryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}