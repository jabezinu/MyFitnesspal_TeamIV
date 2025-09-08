<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CardioExerciseEntries;
use Throwable;

class CardioExercisesController extends Controller
{
    // List all entries for current user
    public function index()
    {
        try{
            $entries = CardioExerciseEntries::where('user_id', auth()->user()->id)->get(['exercise_id','entry_date', 'duration_minutes', 'calories_burned', 'distance','distance_unit', 'intensity_level','notes']);
            foreach ($entries as $entry){
                $entry['exercise_name'] = $entry->exercise->exercise_name;
            }
            return response()->json([
                'message'=>'success',
                'data'=>$entries
            ],200);
        }catch(Throwable $e){
            return response()->json([
                'message'=>'Error: ' . $e->getMessage()
            ],404);
        }
    }

    // Create a new entry
    public function store(Request $request)
    {
        try{    
            $validated = $request->validate([
                'exercise_id'=> 'required|exists:exercise_databases,exercise_id',
                'entry_date'=> 'required|date',
                'duration_minutes'=> 'required|integer|min:1',
                'calories_burned'=> 'required|numeric|min:0',
                'distance'=> 'required|numeric|min:0',
                'distance_unit'=> 'required|in:km,miles,meters',
                'intensity_level'=> 'required|in:low,moderate,high',
                'notes'=> 'nullable|string',
            ]);

            $entry = CardioExerciseEntries::create([
                ...$validated,
                'user_id' => auth()->user()->id,
            ]);

            return response()->json([
                'message' => 'Cardio entry created successfully.',
                'entry' => $entry
            ], 201);
        }catch(Throwable $e){
            return response()->json([
                'message'=>'Error: ' . $e->getMessage()
            ],400);
        }
    }

    // Show single entry if it belongs to the user
    public function show($id)
    {
        try{
            $entry = CardioExerciseEntries::where('entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            return response()->json($entry);
        }catch(Throwable $e){
            return response()->json([
                'message'=>'Error: ' . $e->getMessage()
            ],400);
        }
    }

    // Update entry
    public function update(Request $request, $id)
    {
        try{
            $entry = CardioExerciseEntries::where('entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            $validated = $request->validate([
                'entry_date'=> 'date',
                'duration_minutes'=> 'integer|min:1',
                'calories_burned'=> 'numeric|min:0',
                'distance'=> 'numeric|min:0',
                'distance_unit'=> 'in:km,miles,meters',
                'intensity_level'=> 'in:low,moderate,high',
                'notes'=> 'nullable|string',
            ]);

            $entry->update($validated);

            return response()->json([
                'message' => 'Cardio entry updated successfully.',
                'entry' => $entry
            ]);
        }catch(Throwable $e){
            return response()->json([
                'message'=>'Error: ' . $e->getMessage()
            ],422);
        }
    }

    // Delete entry
    public function destroy($id)
    {
        try{
            $entry = CardioExerciseEntries::where('entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            $entry->delete();

            return response()->json([
                'message' => 'Cardio entry deleted successfully.'
            ]);
        }catch(Throwable $e){
            return response()->json([
                'message'=>'Error: ' . $e->getMessage()
            ],422);
        }
    }
}