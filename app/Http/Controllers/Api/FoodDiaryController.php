<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FoodDiaryEntry;
use App\Models\FoodItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FoodDiaryController extends Controller
{
    // Search catalog foods by name or category
    public function searchFoods(Request $request)
    {
        try {
            $q = $request->query('q');
            $categoryId = $request->query('category_id');

            $foods = FoodItem::with('category')
                ->when($q, fn($query) => $query->where('food_name', 'like', "%{$q}%"))
                ->when($categoryId, fn($query) => $query->where('category_id', $categoryId))
                ->where('is_verified', true)
                ->orderBy('food_name')
                ->limit(50)
                ->get();

            return response()->json($foods);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while searching foods',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // List diary entries for a given date
    public function index(Request $request)
    {
        try {
            $userId = $request->user()?->id ?? $request->query('user_id');
            $date = $request->query('date', now()->toDateString());

            $entries = FoodDiaryEntry::with(['foodItem.category'])
                ->where('user_id', $userId)
                ->whereDate('entry_date', $date)
                ->orderBy('meal_type')
                ->orderBy('entry_id')
                ->get();

            return response()->json($entries);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while fetching diary entries',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Store a catalog food into diary
    public function store(Request $request)
    {
        try {
            $userId = $request->user()?->id ?? $request->input('user_id');

            $data = $request->validate([
                'food_id'        => ['required', 'exists:food_items,food_id'],
                'meal_type'      => ['required', 'in:breakfast,lunch,dinner,snack'],
                'serving_amount' => ['required', 'numeric', 'min:0.01'],
                'entry_date'     => ['nullable', 'date'],
                'notes'          => ['nullable', 'string', 'max:500'],
            ]);

            $food = FoodItem::findOrFail($data['food_id']);
            $servings = (float) $data['serving_amount'];

            $entry = FoodDiaryEntry::create([
                'user_id'           => $userId,
                'food_id'           => $food->food_id,
                'meal_type'         => $data['meal_type'],
                'serving_amount'    => $servings,
                'entry_date'        => $data['entry_date'] ?? now()->toDateString(),
                'calories_consumed' => round($servings * $food->calories_per_serving, 2),
                'protein_consumed'  => round($servings * ($food->protein_per_serving ?? 0), 2),
                'carbs_consumed'    => round($servings * ($food->carbs_per_serving ?? 0), 2),
                'fat_consumed'      => round($servings * ($food->fat_per_serving ?? 0), 2),
                'fiber_consumed'    => round($servings * ($food->fiber_per_serving ?? 0), 2),
                'notes'             => $data['notes'] ?? null,
                'created_at'        => now(),
                'updated_at'        => now(),
            ]);

            return response()->json([
                'message' => 'Food entry added to diary successfully',
                'data' => $entry->load('foodItem.category')
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while storing diary entry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete one diary entry
    public function destroy(Request $request, $id)
    {
        try {
            $userId = $request->user()?->id ?? $request->query('user_id');

            $entry = FoodDiaryEntry::where('entry_id', $id)
                ->where('user_id', $userId)
                ->firstOrFail();

            $entry->delete();

            return response()->json(['message' => 'Entry deleted successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while deleting diary entry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Daily Summary
    public function dailySummary(Request $request)
    {
        try {
            $userId = $request->user()?->id ?? $request->query('user_id');
            $date = $request->query('date', now()->toDateString());

            $catalog = DB::table('food_diary_entries')
                ->where('user_id', $userId)
                ->whereDate('entry_date', $date)
                ->selectRaw('COALESCE(SUM(calories_consumed),0) as calories')
                ->selectRaw('COALESCE(SUM(protein_consumed),0) as protein')
                ->selectRaw('COALESCE(SUM(carbs_consumed),0) as carbs')
                ->selectRaw('COALESCE(SUM(fat_consumed),0) as fat')
                ->first();

            $quick = DB::table('quick_food_entries')
                ->where('user_id', $userId)
                ->whereDate('entry_date', $date)
                ->selectRaw('COALESCE(SUM(calories),0) as calories')
                ->first();

            $water = DB::table('water_entries')
                ->where('user_id', $userId)
                ->whereDate('entry_date', $date)
                ->selectRaw('COALESCE(SUM(amount),0) as total_ml')
                ->first();

            $summary = [
                'calories' => round($catalog->calories + $quick->calories, 2),
                'protein'  => round($catalog->protein, 2),
                'carbs'    => round($catalog->carbs, 2),
                'fat'      => round($catalog->fat, 2),
                'water_ml' => round($water->total_ml, 2),
                'date'     => $date,
            ];

            return response()->json($summary);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while generating daily summary',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
