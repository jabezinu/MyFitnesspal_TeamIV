<?php

namespace App\Filament\Resources\ExerciseDatabaseResource\Pages;

use App\Filament\Resources\ExerciseDatabaseResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditExerciseDatabase extends EditRecord
{
    protected static string $resource = ExerciseDatabaseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}