<?php

namespace App\Filament\Resources\ExerciseCategoryResource\Pages;

use App\Filament\Resources\ExerciseCategoryResource;
use Filament\Resources\Pages\CreateRecord;

class CreateExerciseCategory extends CreateRecord
{
    protected static string $resource = ExerciseCategoryResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Exercise category created successfully';
    }
}