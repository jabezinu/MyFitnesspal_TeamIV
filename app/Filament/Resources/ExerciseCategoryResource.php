<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExerciseCategoryResource\Pages;
use App\Models\ExerciseCatagories;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ExerciseCategoryResource extends Resource
{
    protected static ?string $model = ExerciseCatagories::class;
    protected static ?string $navigationIcon = 'heroicon-o-tag';
    protected static ?string $navigationGroup = 'Categories';
    protected static ?int $navigationSort = 2;
    protected static ?string $modelLabel = 'Exercise Category';
    protected static ?string $pluralModelLabel = 'Exercise Categories';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('catagory_name')
                    ->required()
                    ->maxLength(255)
                    ->label('Category Name'),
                Forms\Components\Select::make('catagory_type')
                    ->options([
                        'cardiovascular' => 'Cardiovascular',
                        'strength' => 'Strength',
                        'flexibility' => 'Flexibility',
                        'sports' => 'Sports',
                        'other' => 'Other',
                    ])
                    ->required()
                    ->label('Category Type'),
                Forms\Components\Textarea::make('description'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('catagory_name')
                    ->searchable()
                    ->sortable()
                    ->label('Category Name'),
                Tables\Columns\TextColumn::make('catagory_type')
                    ->badge()
                    ->sortable()
                    ->label('Category Type'),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('catagory_type')
                    ->options([
                        'cardiovascular' => 'Cardiovascular',
                        'strength' => 'Strength',
                        'flexibility' => 'Flexibility',
                        'sports' => 'Sports',
                        'other' => 'Other',
                    ])
                    ->label('Category Type'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListExerciseCategories::route('/'),
            'create' => Pages\CreateExerciseCategory::route('/create'),
            'edit' => Pages\EditExerciseCategory::route('/{record}/edit'),
        ];
    }
}