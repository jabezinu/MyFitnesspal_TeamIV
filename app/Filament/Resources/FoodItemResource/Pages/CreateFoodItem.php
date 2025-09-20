<?php

namespace App\Filament\Resources\FoodItemResource\Pages;

use App\Filament\Resources\FoodItemResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateFoodItem extends CreateRecord
{
    protected static string $resource = FoodItemResource::class;
}