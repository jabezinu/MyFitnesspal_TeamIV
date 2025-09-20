<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuickFoodEntry;
use Illuminate\Http\Request;

class QuickFoodEntryController extends Controller
{
    // List quick food entries for a user on a given date
    public function index(Request $request)
    {
        try {
            $userId = $request->user()?->id ?? $request->query('user_id');
            $date = $request->query('date', now()->toDateString());

            $items = QuickFoodEntry::where('user_id', $userId)
                ->whereDate('entry_date', $date)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($items);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while fetching quick food entries',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Add a quick food entry
    public function store(Request $request)
    {
        try {
            $userId = $request->user()?->id ?? $request->input('user_id');

            $data = $request->validate([
                'food_name' => ['required', 'string', 'max:255'],
                'meal_type' => ['required', 'in:breakfast,lunch,dinner,snack'],
                'calories'  => ['required', 'numeric', 'min:0'],
                'entry_date' => ['nullable', 'date'],
                'notes'     => ['nullable', 'string', 'max:500'],
            ]);

            $item = QuickFoodEntry::create([
                'user_id'    => $userId,
                'food_name'  => $data['food_name'],
                'meal_type'  => $data['meal_type'],
                'calories'   => round($data['calories'], 2),
                'entry_date' => $data['entry_date'] ?? now()->toDateString(),
                'notes'      => $data['notes'] ?? null,
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'message' => 'Quick food entry submitted and is pending approval',
                'data'    => $item
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while storing quick food entry',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    // Delete a quick food entry
    public function destroy(Request $request, $id)
    {
        try {
            $userId = $request->user()?->id ?? $request->query('user_id');

            $item = QuickFoodEntry::where('quick_entry_id', $id)
                ->where('user_id', $userId)
                ->firstOrFail();

            $item->delete();

            return response()->json(['message' => 'Quick food entry deleted successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while deleting quick food entry',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
