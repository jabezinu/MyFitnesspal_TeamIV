<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuickFoodEntry;
use App\Models\FoodItem;
use App\Models\FoodCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminQuickFoodController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('admin');
    // }

    // Get all pending quick food entries
    public function pending()
    {
        try {
            $pendingFoods = QuickFoodEntry::with('user')
                ->where('status', 'pending')
                ->orderBy('created_at', 'desc')
                ->get();
                
            return response()->json($pendingFoods);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch pending food entries: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get all quick food entries with filtering
    public function index(Request $request)
    {
        try {
            $query = QuickFoodEntry::with('user');
            
            // Filter by status
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }
            
            // Filter by date
            if ($request->has('date_from')) {
                $query->whereDate('entry_date', '>=', $request->date_from);
            }
            
            if ($request->has('date_to')) {
                $query->whereDate('entry_date', '<=', $request->date_to);
            }
            
            $entries = $query->orderBy('created_at', 'desc')
                           ->paginate($request->per_page ?? 20);
            
            return response()->json($entries);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch quick food entries: ' . $e->getMessage()
            ], 500);
        }
    }

    // Approve a quick food entry and add to FoodItem catalog
    public function approve(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'category_id' => 'required|exists:food_categories,category_id',
                'serving_size' => 'required|string|max:100',
                'serving_unit' => 'required|string|max:50',
                'protein_per_serving' => 'nullable|numeric|min:0',
                'carbs_per_serving' => 'nullable|numeric|min:0',
                'fat_per_serving' => 'nullable|numeric|min:0',
                'fiber_per_serving' => 'nullable|numeric|min:0',
                'sugar_per_serving' => 'nullable|numeric|min:0',
                'sodium_per_serving' => 'nullable|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $quickFood = QuickFoodEntry::with('user')->findOrFail($id);
            
            // Check if already processed
            if ($quickFood->status !== 'pending') {
                return response()->json([
                    'error' => 'Food entry has already been processed'
                ], 422);
            }

            // Create new FoodItem
            $foodItem = FoodItem::create([
                'food_name' => $quickFood->food_name,
                'brand' => null, // Can be updated later if needed
                'category_id' => $request->category_id,
                'serving_size' => $request->serving_size,
                'serving_unit' => $request->serving_unit,
                'calories_per_serving' => $quickFood->calories,
                'protein_per_serving' => $request->protein_per_serving ?? 0,
                'carbs_per_serving' => $request->carbs_per_serving ?? 0,
                'fat_per_serving' => $request->fat_per_serving ?? 0,
                'fiber_per_serving' => $request->fiber_per_serving ?? 0,
                'sugar_per_serving' => $request->sugar_per_serving ?? 0,
                'sodium_per_serving' => $request->sodium_per_serving ?? 0,
                'is_verified' => true,
                'is_public' => true,
                'created_by_user_id' => $quickFood->user_id,
            ]);

            // Update quick food entry status
            $quickFood->update([
                'status' => 'approved',
                'notes' => $quickFood->notes . ' (Approved and added to food catalog)'
            ]);

            return response()->json([
                'message' => 'Food entry approved and added to catalog successfully',
                'food_item' => $foodItem,
                'quick_food_entry' => $quickFood
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to approve food entry: ' . $e->getMessage()
            ], 500);
        }
    }

    // Reject a quick food entry
    public function reject(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'rejection_reason' => 'nullable|string|max:500'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $quickFood = QuickFoodEntry::findOrFail($id);
            
            // Check if already processed
            if ($quickFood->status !== 'pending') {
                return response()->json([
                    'error' => 'Food entry has already been processed'
                ], 422);
            }

            $quickFood->update([
                'status' => 'rejected',
                'notes' => $request->rejection_reason ? 
                    ($quickFood->notes . ' (Rejected: ' . $request->rejection_reason . ')') : 
                    ($quickFood->notes . ' (Rejected)')
            ]);

            return response()->json([
                'message' => 'Food entry rejected successfully',
                'quick_food_entry' => $quickFood
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to reject food entry: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get a specific quick food entry
    public function show($id)
    {
        try {
            $entry = QuickFoodEntry::with('user')->findOrFail($id);
            return response()->json($entry);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Food entry not found: ' . $e->getMessage()
            ], 404);
        }
    }
}