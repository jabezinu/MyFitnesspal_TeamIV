<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExerciseCatagories;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AdminExerciseCategoryController extends Controller
{
    // List all categories
    public function index()
    {
        try {
            $categories = ExerciseCatagories::all();
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch exercise categories: ' . $e->getMessage()
            ], 500);
        }
    }

    // Create new category
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'catagory_name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('exercise_caragories', 'catagory_name')
                ],
                'catagory_type' => 'required|in:cardiovascular,strength,flexibility,sports,other',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $category = ExerciseCatagories::create([
                'catagory_name' => $request->catagory_name,
                'catagory_type' => $request->catagory_type,
                'description' => $request->description,
            ]);

            return response()->json([
                'message' => 'Exercise category created successfully',
                'category' => $category
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create exercise category: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update category
    public function update(Request $request, $id)
    {
        try {
            $category = ExerciseCatagories::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'catagory_name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('exercise_caragories', 'catagory_name')->ignore($category->catagory_id, 'catagory_id')
                ],
                'catagory_type' => 'required|in:cardiovascular,strength,flexibility,sports,other',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $category->update([
                'catagory_name' => $request->catagory_name,
                'catagory_type' => $request->catagory_type,
                'description' => $request->description,
            ]);

            return response()->json([
                'message' => 'Exercise category updated successfully',
                'category' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update exercise category: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete category
    public function destroy($id)
    {
        try {
            $category = ExerciseCatagories::findOrFail($id);
            
            // Check if category is being used by any exercises
            if ($category->exercise()->count() > 0) {
                return response()->json([
                    'error' => 'Cannot delete category. It is being used by one or more exercises.'
                ], 422);
            }
            
            $category->delete();

            return response()->json([
                'message' => 'Exercise category deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete exercise category: ' . $e->getMessage()
            ], 500);
        }
    }
}
