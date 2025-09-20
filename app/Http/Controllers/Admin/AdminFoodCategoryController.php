<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FoodCategory;
use App\Models\FoodItem;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AdminFoodCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    // List all categories with item count
    public function index()
    {
        try {
            $categories = FoodCategory::withCount('items')->get();
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch food categories: ' . $e->getMessage()
            ], 500);
        }
    }

    // Create new category
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'category_name' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('food_categories', 'category_name')
                ],
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $category = FoodCategory::create($validator->validated());

            return response()->json([
                'message' => 'Food category created successfully',
                'category' => $category
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create food category: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update category
    public function update(Request $request, $id)
    {
        try {
            $category = FoodCategory::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'category_name' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('food_categories', 'category_name')->ignore($category->category_id, 'category_id')
                ],
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $category->update($validator->validated());

            return response()->json([
                'message' => 'Food category updated successfully',
                'category' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update food category: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete category
    public function destroy($id)
    {
        try {
            $category = FoodCategory::findOrFail($id);
            
            // Check if category is being used by any food items
            if ($category->items()->count() > 0) {
                return response()->json([
                    'error' => 'Cannot delete category. It is being used by one or more food items.'
                ], 422);
            }
            
            $category->delete();

            return response()->json([
                'message' => 'Food category deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete food category: ' . $e->getMessage()
            ], 500);
        }
    }
}