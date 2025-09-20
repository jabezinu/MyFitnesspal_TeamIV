<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use App\Filament\Widgets\StatsOverview;
use App\Filament\Widgets\NewUsersChart;
use App\Filament\Widgets\PendingFoodEntriesChart;

class Dashboard extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
    protected static string $view = 'filament.pages.dashboard';
    protected static ?int $navigationSort = -10;
    
    public static function shouldRegisterNavigation(): bool
    {
        return true;
    }
    
    public static function getNavigationLabel(): string
    {
        return 'Dashboard';
    }

    protected function getHeaderWidgets(): array
    {
        return [
            StatsOverview::class,
        ];
    }

    protected function getFooterWidgets(): array
    {
        return [
            // NewUsersChart::class,
            // PendingFoodEntriesChart::class,
        ];
    }
}
// namespace App\Filament\Pages;

// use App\Models\User;
// use App\Models\FoodItem;
// use App\Models\ExerciseDatabase;
// use App\Models\QuickFoodEntry;
// use App\Models\UserNotification;
// use Filament\Pages\Page;
// use Filament\Widgets\StatsOverviewWidget;
// use Filament\Widgets\StatsOverviewWidget\Stat;

// class Dashboard extends Page
// {
//     protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
//     protected static string $view = 'filament.pages.dashboard';
//     protected static ?int $navigationSort = -10; // Make sure it's first
    
//     public static function shouldRegisterNavigation(): bool
//     {
//         return true; // Ensure it appears in navigation
//     }
    
//     public static function getNavigationLabel(): string
//     {
//         return 'Dashboard'; // Custom navigation label
//     }

//     protected function getHeaderWidgets(): array
//     {
//         return [
//             StatsOverviewWidget::make([
//                     Stat::make('Total Users', User::count())
//                         ->icon('heroicon-o-users')
//                         ->description('Registered users')
//                         ->color('primary')
//                         ->chart([7, 3, 4, 5, 6, 3, 5]),

//                     Stat::make('Active Users', User::where('is_active', true)->count())
//                         ->icon('heroicon-o-check-badge')
//                         ->description('Currently active')
//                         ->color('success'),

//                     Stat::make('Food Items', FoodItem::count())
//                         ->icon('heroicon-o-bolt')
//                         ->description('Total food items')
//                         ->color('info'),

//                     Stat::make('Exercises', ExerciseDatabase::count())
//                         ->icon('heroicon-o-heart')
//                         ->description('Total exercises')
//                         ->color('warning'),

//                     Stat::make('Pending Foods', QuickFoodEntry::where('status', 'pending')->count())
//                         ->icon('heroicon-o-clock')
//                         ->description('Waiting approval')
//                         ->color('danger'),

//                     Stat::make('Unread Notifications', UserNotification::where('is_read', false)->count())
//                         ->icon('heroicon-o-bell')
//                         ->description('Require attention')
//                         ->color('warning'),
//                 ]),
//         ];
//     }

//     protected function getFooterWidgets(): array
//     {
//         return [
//             // You can add more widgets here later
//         ];
//     }
// }