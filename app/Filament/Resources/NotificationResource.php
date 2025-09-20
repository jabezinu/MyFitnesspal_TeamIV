<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NotificationResource\Pages;
use App\Models\UserNotification;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class NotificationResource extends Resource
{
    protected static ?string $model = UserNotification::class;
    protected static ?string $navigationIcon = 'heroicon-o-bell';
    protected static ?string $navigationGroup = 'System';
    protected static ?int $navigationSort = 5;
    protected static ?string $modelLabel = 'Notification';
    protected static ?string $pluralModelLabel = 'Notifications';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'username')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->label('User'),
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->label('Notification Title'),
                Forms\Components\Textarea::make('message')
                    ->required()
                    ->rows(3)
                    ->label('Message'),
                Forms\Components\Select::make('notification_type')
                    ->options([
                        'reminder' => 'Reminder',
                        'achievement' => 'Achievement',
                        'system' => 'System',
                        'warning' => 'Warning',
                    ])
                    ->required()
                    ->label('Type'),
                Forms\Components\Toggle::make('is_read')
                    ->default(false)
                    ->label('Read'),
                Forms\Components\DateTimePicker::make('read_at')
                    ->label('Read At')
                    ->nullable(),
                Forms\Components\DateTimePicker::make('created_at')
                    ->label('Created At')
                    ->disabled()
                    ->default(now()),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.username')
                    ->searchable()
                    ->sortable()
                    ->label('User'),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->limit(30)
                    ->tooltip(fn ($record) => $record->title)
                    ->label('Title'),
                Tables\Columns\TextColumn::make('message')
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->message)
                    ->label('Message'),
                Tables\Columns\TextColumn::make('notification_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'reminder' => 'info',
                        'achievement' => 'success',
                        'system' => 'primary',
                        'warning' => 'danger',
                    })
                    ->sortable()
                    ->label('Type'),
                Tables\Columns\IconColumn::make('is_read')
                    ->boolean()
                    ->label('Read')
                    ->sortable(),
                Tables\Columns\TextColumn::make('read_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->label('Read At'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Created At'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('notification_type')
                    ->options([
                        'reminder' => 'Reminder',
                        'achievement' => 'Achievement',
                        'system' => 'System',
                        'warning' => 'Warning',
                    ])
                    ->label('Notification Type'),
                Tables\Filters\Filter::make('is_read')
                    ->label('Read Notifications')
                    ->query(fn (Builder $query): Builder => $query->where('is_read', true)),
                Tables\Filters\Filter::make('unread')
                    ->label('Unread Notifications')
                    ->query(fn (Builder $query): Builder => $query->where('is_read', false)),
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->label('From Date'),
                        Forms\Components\DatePicker::make('created_until')
                            ->label('Until Date'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('markAsRead')
                    ->label('Mark as Read')
                    ->icon('heroicon-o-check')
                    ->action(function (UserNotification $record) {
                        $record->update([
                            'is_read' => true,
                            'read_at' => now(),
                        ]);
                    })
                    ->visible(fn (UserNotification $record) => !$record->is_read),
                Tables\Actions\Action::make('markAsUnread')
                    ->label('Mark as Unread')
                    ->icon('heroicon-o-x-mark')
                    ->action(function (UserNotification $record) {
                        $record->update([
                            'is_read' => false,
                            'read_at' => null,
                        ]);
                    })
                    ->visible(fn (UserNotification $record) => $record->is_read),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('markAsRead')
                        ->label('Mark as Read')
                        ->icon('heroicon-o-check')
                        ->action(function ($records) {
                            $records->each->update([
                                'is_read' => true,
                                'read_at' => now(),
                            ]);
                        }),
                    Tables\Actions\BulkAction::make('markAsUnread')
                        ->label('Mark as Unread')
                        ->icon('heroicon-o-x-mark')
                        ->action(function ($records) {
                            $records->each->update([
                                'is_read' => false,
                                'read_at' => null,
                            ]);
                        }),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNotifications::route('/'),
            'create' => Pages\CreateNotification::route('/create'),
            'edit' => Pages\EditNotification::route('/{record}/edit'),
        ];
    }
}