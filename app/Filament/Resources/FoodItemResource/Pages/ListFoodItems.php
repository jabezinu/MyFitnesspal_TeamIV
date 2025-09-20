<?php

namespace App\Filament\Resources\FoodItemResource\Pages;

use App\Filament\Resources\FoodItemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFoodItems extends ListRecords
{
    protected static string $resource = FoodItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}