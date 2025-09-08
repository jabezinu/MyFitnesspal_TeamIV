<?php

namespace App\Http\Controllers;

use App\Models\QuickExerciseEntries;
use Throwable;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class QuickExercisesController extends Controller
{
    public function index()
    {
        try {
            $entries = QuickExerciseEntries::where('user_id', auth()->user()->id)->get();
            return response()->json($entries);
        } catch (Throwable $e) {
            return response()->json(['error' => 'Failed to fetch entries.'], 500);
        }
    }

 public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'exercise_name'    => 'required|string|max:100',
                'exercise_type'    => 'required|in:cardiovascular,strength,other',
                'duration_minutes' => 'required|integer|min:1',
                'calories_burned'  => 'required|numeric|min:0',
                'entry_date'       => 'required|date',
                'notes'            => 'nullable|string',
            ]);

            $entry = QuickExerciseEntries::create([
                ...$validated,
                'user_id' => auth()->user()->id,
            ]);

            return response()->json(['message' => 'Entry created successfully.', 'entry' => $entry], 201);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (Throwable $e) {
            return response()->json(['error' => 'Failed to create entry.'], 500);
        }
    }

 public function show($id)
    {
        try {
            $entry = QuickExerciseEntries::where('quick_entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            return response()->json($entry);

        } catch (Throwable $e) {
            return response()->json(['error' => 'Entry not found or access denied.'], 404);
        }
    }

 public function update(Request $request, $id)
    {
        try {
            $entry = QuickExerciseEntries::where('quick_entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            $validated = $request->validate([
                'exercise_name'    => 'sometimes|string|max:100',
                'exercise_type'    => 'sometimes|in:cardiovascular,strength,other',
                'duration_minutes' => 'sometimes|integer|min:1',
                'calories_burned'  => 'sometimes|numeric|min:0',
                'entry_date'       => 'sometimes|date',
                'notes'            => 'nullable|string',
            ]);

            $entry->update($validated);

            return response()->json(['message' => 'Entry updated successfully.', 'entry' => $entry]);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (Throwable $e) {
            return response()->json(['error' => 'Failed to update entry.'], 500);
        }
    }

 public function destroy($id)
    {
        try {
            $entry = QuickExerciseEntries::where('quick_entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            $entry->delete();

            return response()->json(['message' => 'Entry deleted successfully.']);

        } catch (Throwable $e) {
            return response()->json(['error' => 'Entry not found or access denied.'], 404);
        }
    }
}
