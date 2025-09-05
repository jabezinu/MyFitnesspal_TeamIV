<?php

// namespace App\Http\Controllers;

// use App\Models\CheckIn;
// use Illuminate\Http\Request;
// use Carbon\Carbon;

// class CheckInController extends Controller
// {
//     public function index(Request $request)
//     {
//         return $request->user()->checkIns()->latest('date')->get();
//     }

//     public function store(Request $request)
//     {
//         $validated = $request->validate([
//             'weight' => 'required|numeric|min:20|max:1000',
//             'unit'   => 'required|in:kg,lbs',
//             'date'   => 'nullable|date', // <-- add optional date
//         ]);

//         // Convert to kg if needed
//         $weightKg = $validated['unit'] === 'lbs'
//             ? $validated['weight'] * 0.453592  // lbs → kg
//             : $validated['weight'];

//         $user = $request->user();

//         // Use provided date or today
//         $checkInDate = $validated['date'] ?? now()->toDateString();

//         // Save check-in
//         $checkIn = $user->checkIns()->create([
//             'weight_kg' => $weightKg,
//             'date' => now()->toDateString(), // automatically sets today’s date
//         ]);


//         // Update profile current weight
//         $user->profile->current_weight_kg = $weightKg;
//         $user->profile->save();

//         return response()->json([
//             'message' => 'Check-in recorded',
//             'check_in' => $checkIn,
//         ], 201);
//     }
// }







namespace App\Http\Controllers;

use App\Services\ProfileService;
use Illuminate\Http\Request;

class CheckInController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()
            ->checkIns()
            ->latest('date')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'weight' => 'required|numeric|min:20|max:1000',
            'unit'   => 'required|in:kg,lbs',
            'date'   => 'nullable|date',
        ]);

        // Convert to kg if needed
        $weightKg = $validated['unit'] === 'lbs'
            ? $validated['weight'] * 0.453592
            : $validated['weight'];

        $user = $request->user();

        // Use provided date or today
        $checkInDate = $validated['date'] ?? now()->toDateString();

        // Save check-in
        $checkIn = $user->checkIns()->create([
            'weight_kg' => $weightKg,
            'date'      => $checkInDate,
        ]);

        // Update profile + calories
        ProfileService::updateCurrentWeightAndCalories($user, $weightKg);

        return response()->json([
            'message'  => 'Check-in recorded',
            'check_in' => $checkIn,
        ], 201);
    }
}


