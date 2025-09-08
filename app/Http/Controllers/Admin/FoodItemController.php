<?php

namespace App\Http\Controllers\Admin;

use App\Models\FoodItem;
use Illuminate\Http\Request;

class FoodItemController extends AdminBaseController
{
    // List all foods
    public function index()
    {
        return response()->json(FoodItem::all(), 200);
    }

    // Get single food
    public function show($id)
    {
        $food = FoodItem::find($id);
        if (!$food) return response()->json(['message'=>'Food not found'],404);

        return response()->json($food, 200);
    }

    // Add a new food
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'calories'=>'required|numeric|min:0',
            'carbs'=>'nullable|numeric|min:0',
            'protein'=>'nullable|numeric|min:0',
            'fat'=>'nullable|numeric|min:0',
            'status'=>'nullable|in:pending,approved'
        ]);

        $food = FoodItem::create($validated);

        return response()->json($food, 201);
    }

    // Update food
    public function update(Request $request, $id)
    {
        $food = FoodItem::find($id);
        if(!$food) return response()->json(['message'=>'Food not found'],404);

        $validated = $request->validate([
            'name'=>'sometimes|string|max:255',
            'calories'=>'sometimes|numeric|min:0',
            'carbs'=>'sometimes|numeric|min:0',
            'protein'=>'sometimes|numeric|min:0',
            'fat'=>'sometimes|numeric|min:0',
            'status'=>'sometimes|in:pending,approved'
        ]);

        $food->update($validated);

        return response()->json($food, 200);
    }

    // Delete food
    public function destroy($id)
    {
        $food = FoodItem::find($id);
        if(!$food) return response()->json(['message'=>'Food not found'],404);

        $food->delete();

        return response()->json(['message'=>'Food deleted'],200);
    }

    // Approve user food
    public function approve($id)
    {
        $food = FoodItem::find($id);
        if(!$food) return response()->json(['message'=>'Food not found'],404);

        $food->status = 'approved';
        $food->save();

        return response()->json(['message'=>'Food approved successfully'],200);
    }
}
