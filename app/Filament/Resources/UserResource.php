<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'User Management';

    public static function form(Form $form): Form
    {
        // return $form
        //     ->schema([
        //         Forms\Components\TextInput::make('email')
        //             ->email()
        //             ->required()
        //             ->unique(ignoreRecord: true)
        //             ->maxLength(255),
        //         Forms\Components\DateTimePicker::make('email_verified_at'),
        //         Forms\Components\TextInput::make('password')
        //             ->password()
        //             ->required()
        //             ->dehydrated(fn ($state) => filled($state))
        //             ->visible(fn (string $operation): bool => $operation === 'create')
        //             ->maxLength(191),
        //         Forms\Components\TextInput::make('username')
        //             ->maxLength(50)
        //             ->required()
        //             ->unique(ignoreRecord: true)
        //             ->default(null),
        //         Forms\Components\TextInput::make('first_name')
        //             ->maxLength(100)
        //             ->required()
        //             ->default(null),
        //         Forms\Components\TextInput::make('last_name')
        //             ->maxLength(100)
        //             ->required()
        //             ->default(null),
        //         Forms\Components\Toggle::make('is_active')
        //             ->required()
        //             ->default(true),
        //         Forms\Components\TextInput::make('role')
        //             ->required()
        //             ->maxLength(20)
        //             ->options([
        //                 'user' => 'User',
        //                 'admin' => 'Admin',
        //             ])
        //             ->default('user'),
        //     ]);
        return $form
        ->schema([
            Forms\Components\TextInput::make('email')
                ->email()
                ->required()
                ->unique(ignoreRecord: true)
                ->maxLength(255),
            Forms\Components\DateTimePicker::make('email_verified_at'),
            Forms\Components\TextInput::make('password')
                ->password()
                ->dehydrated(fn ($state) => filled($state))
                ->required(fn (string $operation): bool => $operation === 'create') // Only require on create
                ->visible(fn (string $operation): bool => $operation === 'create') // Only visible on create
                ->maxLength(191),
            Forms\Components\TextInput::make('username')
                ->maxLength(50)
                ->required()
                ->unique(ignoreRecord: true), // Removed ->default(null)
            Forms\Components\TextInput::make('first_name')
                ->maxLength(100)
                ->required(), // Removed ->default(null)
            Forms\Components\TextInput::make('last_name')
                ->maxLength(100)
                ->required(), // Removed ->default(null)
            Forms\Components\Toggle::make('is_active')
                ->required()
                ->default(true),
            Forms\Components\Select::make('role') // Changed to select for better UX
                ->required()
                ->options([
                    'user' => 'User',
                    'admin' => 'Admin',
                ])
                ->default('user'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('first_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('last_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('username')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('role')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'admin' => 'danger',
                        'user' => 'gray',
                    }),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->options([
                        'user' => 'User',
                        'admin' => 'Admin',
                    ]),
                Tables\Filters\Filter::make('is_active')
                    ->label('Active Users')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', true)),
                Tables\Filters\Filter::make('inactive')
                    ->label('Inactive Users')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', false)),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('toggleStatus')
                    ->label(fn (User $record): string => $record->is_active ? 'Deactivate' : 'Activate')
                    ->color(fn (User $record): string => $record->is_active ? 'warning' : 'success')
                    ->action(function (User $record): void {
                        $record->is_active = !$record->is_active;
                        $record->save();
                    })
                    ->requiresConfirmation(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('activate')
                        ->action(fn (Collection $records) => $records->each->update(['is_active' => true])),
                    Tables\Actions\BulkAction::make('deactivate')
                        ->action(fn (Collection $records) => $records->each->update(['is_active' => false])),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
