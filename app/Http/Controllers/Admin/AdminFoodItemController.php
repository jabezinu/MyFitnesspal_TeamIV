<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FoodItem;
use App\Models\FoodDiaryEntry;
use App\Models\FoodCategory;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AdminFoodItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    // List all items with pagination and filtering
    public function index(Request $request)
    {
        try {
            $query = FoodItem::with('category');
            
            // Add search filter
            if ($request->has('search')) {
                $query->where('food_name', 'like', '%' . $request->search . '%');
            }
            
            // Add category filter
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }
            
            // Add status filter
            if ($request->has('status')) {
                switch ($request->status) {
                    case 'pending':
                        $query->where('is_verified', false)->where('is_public', false);
                        break;
                    case 'approved':
                        $query->where('is_verified', true)->where('is_public', true);
                        break;
                    case 'rejected':
                        $query->where('is_verified', false)->where('is_public', false);
                        break;
                }
            }
            
            $items = $query->orderBy('food_name', 'asc')
                         ->paginate($request->per_page ?? 20);
            
            $categories = FoodCategory::all();
            
            return response()->json([
                'items' => $items,
                'categories' => $categories
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch food items: ' . $e->getMessage()
            ], 500);
        }
    }

    // Food item details
    public function show($id)
    {
        try {
            $item = FoodItem::with('category', 'diaryEntries.user')->findOrFail($id);
            return response()->json($item);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Food item not found: ' . $e->getMessage()
            ], 404);
        }
    }

    // Add new item
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'food_name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('food_items', 'food_name')
                ],
                'brand' => 'nullable|string|max:255',
                'category_id' => 'required|exists:food_categories,category_id',
                'serving_size' => 'nullable|string|max:100',
                'serving_unit' => 'nullable|string|max:50',
                'calories_per_serving' => 'required|numeric|min:0',
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

            $data = $validator->validated();
            
            // Set default values for admin-created items
            $data['is_verified'] = true;
            $data['is_public'] = true;
            $data['created_by_user_id'] = auth()->id();

            $item = FoodItem::create($data);

            return response()->json([
                'message' => 'Food item created successfully',
                'item' => $item
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create food item: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update item
    public function update(Request $request, $id)
    {
        try {
            $item = FoodItem::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'food_name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('food_items', 'food_name')->ignore($item->food_id, 'food_id')
                ],
                'brand' => 'nullable|string|max:255',
                'category_id' => 'required|exists:food_categories,category_id',
                'serving_size' => 'nullable|string|max:100',
                'serving_unit' => 'nullable|string|max:50',
                'calories_per_serving' => 'required|numeric|min:0',
                'protein_per_serving' => 'nullable|numeric|min:0',
                'carbs_per_serving' => 'nullable|numeric|min:0',
                'fat_per_serving' => 'nullable|numeric|min:0',
                'fiber_per_serving' => 'nullable|numeric|min:0',
                'sugar_per_serving' => 'nullable|numeric|min:0',
                'sodium_per_serving' => 'nullable|numeric|min:0',
                'is_verified' => 'sometimes|boolean',
                'is_public' => 'sometimes|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $item->update($validator->validated());

            return response()->json([
                'message' => 'Food item updated successfully',
                'item' => $item
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update food item: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete item
    public function destroy($id)
    {
        try {
            $item = FoodItem::findOrFail($id);
            
            // Check if item is being used in any diary entries
            $usageCount = FoodDiaryEntry::where('food_id', $id)->count();
            
            if ($usageCount > 0) {
                return response()->json([
                    'error' => 'Cannot delete food item. It is being used in ' . $usageCount . ' diary entries.'
                ], 422);
            }
            
            $item->delete();

            return response()->json([
                'message' => 'Food item deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete food item: ' . $e->getMessage()
            ], 500);
        }
    }
}