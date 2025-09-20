<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FoodItemResource\Pages;
use App\Filament\Resources\FoodItemResource\RelationManagers;
use App\Models\FoodItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FoodItemResource extends Resource
{
    protected static ?string $model = FoodItem::class;

    // protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationIcon = 'heroicon-o-bolt';
    protected static ?string $navigationGroup = 'Content Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('food_name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('brand')
                    ->maxLength(255),
                Forms\Components\Select::make('category_id')
                    ->relationship('category', 'category_name'),
                Forms\Components\TextInput::make('calories_per_serving')
                    ->numeric()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('food_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('brand')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.category_name'),
                Tables\Columns\TextColumn::make('calories_per_serving'),
            ])
            ->filters([])
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
            'index' => Pages\ListFoodItems::route('/'),
            'create' => Pages\CreateFoodItem::route('/create'),
            'edit' => Pages\EditFoodItem::route('/{record}/edit'),
        ];
    }
}
