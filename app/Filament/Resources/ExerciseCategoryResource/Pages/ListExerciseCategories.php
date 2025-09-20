<?php

namespace App\Filament\Resources\ExerciseCategoryResource\Pages;

use App\Filament\Resources\ExerciseCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListExerciseCategories extends ListRecords
{
    protected static string $resource = ExerciseCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('New Exercise Category'),
        ];
    }
}