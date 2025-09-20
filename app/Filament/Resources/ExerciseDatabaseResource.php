<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExerciseDatabaseResource\Pages;
use App\Models\ExerciseDatabase;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ExerciseDatabaseResource extends Resource
{
    protected static ?string $model = ExerciseDatabase::class;
    protected static ?string $navigationIcon = 'heroicon-o-heart';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('exercise_name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('catagory_id')
                    ->relationship('catagory', 'catagory_name')
                    ->required(),
                Forms\Components\Select::make('exercise_type')
                    ->options([
                        'cardiovascular' => 'Cardiovascular',
                        'strength' => 'Strength',
                        'flexibility' => 'Flexibility',
                        'sports' => 'Sports',
                        'other' => 'Other',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('calories_per_minute')
                    ->required()
                    ->numeric()
                    ->minValue(0),
                Forms\Components\Textarea::make('description'),
                Forms\Components\Textarea::make('instructions'),
                Forms\Components\TagsInput::make('muscle_groups'),
                Forms\Components\TextInput::make('equipment_needed'),
                Forms\Components\Select::make('difficulty_level')
                    ->options([
                        'beginner' => 'Beginner',
                        'intermediate' => 'Intermediate',
                        'advanced' => 'Advanced',
                    ]),
                Forms\Components\Toggle::make('is_verified')
                    ->default(false),
                Forms\Components\Toggle::make('is_public')
                    ->default(false),
                Forms\Components\Toggle::make('is_rejected')
                    ->default(false),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('exercise_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('catagory.catagory_name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('exercise_type')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('calories_per_minute')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('difficulty_level')
                    ->badge()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_verified')
                    ->boolean()
                    ->label('Verified'),
                Tables\Columns\IconColumn::make('is_public')
                    ->boolean()
                    ->label('Public'),
                Tables\Columns\IconColumn::make('is_rejected')
                    ->boolean()
                    ->label('Rejected'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('catagory')
                    ->relationship('catagory', 'catagory_name'),
                Tables\Filters\SelectFilter::make('exercise_type')
                    ->options([
                        'cardiovascular' => 'Cardiovascular',
                        'strength' => 'Strength',
                        'flexibility' => 'Flexibility',
                        'sports' => 'Sports',
                        'other' => 'Other',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('approve')
                    ->action(fn (ExerciseDatabase $record) => $record->update([
                        'is_verified' => true,
                        'is_public' => true,
                        'is_rejected' => false,
                    ]))
                    ->requiresConfirmation()
                    ->visible(fn (ExerciseDatabase $record) => !$record->is_verified),
                Tables\Actions\Action::make('reject')
                    ->action(fn (ExerciseDatabase $record) => $record->update([
                        'is_verified' => false,
                        'is_public' => false,
                        'is_rejected' => true,
                    ]))
                    ->requiresConfirmation()
                    ->visible(fn (ExerciseDatabase $record) => !$record->is_rejected),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return []; // Empty for now
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListExerciseDatabases::route('/'),
            'create' => Pages\CreateExerciseDatabase::route('/create'),
            'edit' => Pages\EditExerciseDatabase::route('/{record}/edit'),
        ];
    }
}