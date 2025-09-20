<?php

namespace App\Filament\Resources\ExerciseDatabaseResource\Pages;

use App\Filament\Resources\ExerciseDatabaseResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListExerciseDatabases extends ListRecords
{
    protected static string $resource = ExerciseDatabaseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}