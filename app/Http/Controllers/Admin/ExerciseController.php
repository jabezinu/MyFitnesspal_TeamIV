<?php

namespace App\Http\Controllers\Admin;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends AdminBaseController
{
    // List all exercises
    public function index()
    {
        return response()->json(Exercise::all(), 200);
    }

    // Get single exercise
    public function show($id)
    {
        $exercise = Exercise::find($id);
        if (!$exercise) return response()->json(['message'=>'Exercise not found'],404);

        return response()->json($exercise, 200);
    }

    // Add new exercise
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'type'=>'required|in:cardio,strength',
            'calories_per_minute'=>'required|numeric|min:0',
            'status'=>'nullable|in:pending,approved'
        ]);

        $exercise = Exercise::create($validated);

        return response()->json($exercise, 201);
    }

    // Update exercise
    public function update(Request $request, $id)
    {
        $exercise = Exercise::find($id);
        if(!$exercise) return response()->json(['message'=>'Exercise not found'],404);

        $validated = $request->validate([
            'name'=>'sometimes|string|max:255',
            'type'=>'sometimes|in:cardio,strength',
            'calories_per_minute'=>'sometimes|numeric|min:0',
            'status'=>'sometimes|in:pending,approved'
        ]);

        $exercise->update($validated);

        return response()->json($exercise, 200);
    }

    // Delete exercise
    public function destroy($id)
    {
        $exercise = Exercise::find($id);
        if(!$exercise) return response()->json(['message'=>'Exercise not found'],404);

        $exercise->delete();

        return response()->json(['message'=>'Exercise deleted'],200);
    }

    // Approve user exercise
    public function approve($id)
    {
        $exercise = Exercise::find($id);
        if(!$exercise) return response()->json(['message'=>'Exercise not found'],404);

        $exercise->status = 'approved';
        $exercise->save();

        return response()->json(['message'=>'Exercise approved successfully'],200);
    }
}
