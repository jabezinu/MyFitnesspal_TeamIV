<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuickFoodEntryResource\Pages;
use App\Models\QuickFoodEntry;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class QuickFoodEntryResource extends Resource
{
    protected static ?string $model = QuickFoodEntry::class;
    protected static ?string $navigationIcon = 'heroicon-o-bolt';
    protected static ?string $navigationGroup = 'Moderation';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('food_name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('meal_type')
                    ->options([
                        'breakfast' => 'Breakfast',
                        'lunch' => 'Lunch',
                        'dinner' => 'Dinner',
                        'snack' => 'Snack',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('calories')
                    ->required()
                    ->numeric()
                    ->minValue(0),
                Forms\Components\DatePicker::make('entry_date')
                    ->required(),
                Forms\Components\Textarea::make('notes'),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.username')
                    ->label('User')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('food_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('meal_type')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('calories')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('entry_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                    })
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ]),
                Tables\Filters\SelectFilter::make('meal_type')
                    ->options([
                        'breakfast' => 'Breakfast',
                        'lunch' => 'Lunch',
                        'dinner' => 'Dinner',
                        'snack' => 'Snack',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('approve')
                    ->action(fn (QuickFoodEntry $record) => $record->update(['status' => 'approved']))
                    ->requiresConfirmation()
                    ->visible(fn (QuickFoodEntry $record) => $record->status === 'pending'),
                Tables\Actions\Action::make('reject')
                    ->action(fn (QuickFoodEntry $record) => $record->update(['status' => 'rejected']))
                    ->requiresConfirmation()
                    ->visible(fn (QuickFoodEntry $record) => $record->status === 'pending'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('approveSelected')
                        ->action(fn ($records) => $records->each->update(['status' => 'approved']))
                        ->requiresConfirmation(),
                    Tables\Actions\BulkAction::make('rejectSelected')
                        ->action(fn ($records) => $records->each->update(['status' => 'rejected']))
                        ->requiresConfirmation(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuickFoodEntries::route('/'),
            'create' => Pages\CreateQuickFoodEntry::route('/create'),
            'edit' => Pages\EditQuickFoodEntry::route('/{record}/edit'),
        ];
    }
}