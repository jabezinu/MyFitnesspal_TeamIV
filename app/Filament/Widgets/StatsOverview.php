<?php
// <?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\FoodItem;
use App\Models\ExerciseDatabase;
use App\Models\QuickFoodEntry;
use App\Models\UserNotification;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    /**
     * Retrieves the statistical data to be displayed on the dashboard.
     * Each Stat is a card with a label, value, icon, description, and color.
     *
     * @return array
     */
    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->icon('heroicon-o-users')
                ->description('Registered users')
                ->color('primary'),

            Stat::make('Active Users', User::where('is_active', true)->count())
                ->icon('heroicon-o-check-badge')
                ->description('Currently active users')
                ->color('success'),

            Stat::make('Food Items', FoodItem::count())
                ->icon('heroicon-o-bolt')
                ->description('Total food items in the database')
                ->color('info'),

            Stat::make('Exercises', ExerciseDatabase::count())
                ->icon('heroicon-o-heart')
                ->description('Total exercises in the database')
                ->color('warning'),

            Stat::make('Pending Foods', QuickFoodEntry::where('status', 'pending')->count())
                ->icon('heroicon-o-clock')
                ->description('Food entries waiting for approval')
                ->color('danger'),

            Stat::make('Unread Notifications', UserNotification::where('is_read', false)->count())
                ->icon('heroicon-o-bell')
                ->description('Notifications requiring attention')
                ->color('warning'),
        ];
    }
}
// namespace App\Filament\Widgets;

// use App\Models\User;
// use App\Models\FoodItem;
// use App\Models\ExerciseDatabase;
// use App\Models\QuickFoodEntry;

// use Filament\Widgets\StatsOverviewWidget as BaseWidget;
// use Filament\Widgets\StatsOverviewWidget\Stat;

// class StatsOverview extends BaseWidget
// {
//     protected function getStats(): array
// {
//     return [
//         Stat::make('Total Users', User::count())
//             ->icon('heroicon-o-users')
//             ->description('Registered users')
//             ->color('primary'),
//             // ->chart([7, 3, 4, 5, 6, 3, 5]),

//         Stat::make('Active Users', User::where('is_active', true)->count())
//             ->icon('heroicon-o-check-badge')
//             ->description('Currently active users')
//             ->color('success'),

//         Stat::make('Food Items', FoodItem::count())
//             ->icon('heroicon-o-bolt')
//             ->description('Total food items')
//             ->color('info'),

//         Stat::make('Exercises', ExerciseDatabase::count())
//             ->icon('heroicon-o-heart')
//             ->description('Total exercises')
//             ->color('warning'),

//         Stat::make('Pending Foods', QuickFoodEntry::where('status', 'pending')->count())
//             ->icon('heroicon-o-clock')
//             ->description('Waiting for approval')
//             ->color('danger'),

//         Stat::make('Pending Exercises', ExerciseDatabase::where('is_verified', false)->count())
//             ->icon('heroicon-o-clock')
//             ->description('Exercises needing review')
//             ->color('danger'),
//     ];
// }
// }