<?php

namespace App\Http\Controllers;

use Throwable;
use Illuminate\Http\Request;
use App\Models\StrengthExerciseEntries;
use Illuminate\Validation\ValidationException;

class StrengthExercisesController extends Controller
{
    public function index()
    {
        try {
            $entries = StrengthExerciseEntries::where('user_id', auth()->user()->id)->get();
            return response()->json($entries);
        } catch (Throwable $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'exercise_id'=> 'required|exists:exercise_databases,exercise_id',
                'entry_date'=> 'required|date',
                'sets'=> 'required|integer|min:1',
                'reps_per_set' => 'required|array|size:' . $request->input('sets'),
                'reps_per_set.*'=> 'integer|min:1',
                'weight_per_set'=> 'required|array|size:' . $request->input('sets'),
                'weight_per_set.*'=> 'numeric|min:0',
                'weight_unit'=> 'required|in:kg,lbs',
                'rest_time_seconds'=> 'required|integer|min:0',
                'calories_burned'=> 'required|numeric|min:0',
                'notes'=> 'nullable|string',
            ]);

            $entry = StrengthExerciseEntries::create([
                ...$validated,
                'user_id' => auth()->user()->id,
            ]);

            return response()->json(['message' => 'Entry created successfully.', 'entry' => $entry], 201);

        } catch (ValidationException $e) {
            return response()->json(['message' => 'ValidationError: ' . $e->getMessage()], 422);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Failed to create entry. ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $entry = StrengthExerciseEntries::where('entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            return response()->json($entry);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Entry not found or access denied.'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $entry = StrengthExerciseEntries::where('entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            $validated = $request->validate([
                'entry_date' => 'date',
                'sets' => 'integer|min:1',
                'reps_per_set'=> 'array',
                'reps_per_set.*' => 'integer|min:1',
                'weight_per_set' => 'array',
                'weight_per_set.*' => 'numeric|min:0',
                'weight_unit'=> 'in:kg,lbs',
                'rest_time_seconds'=> 'integer|min:0',
                'calories_burned'=> 'numeric|min:0',
                'notes'=> 'nullable|string',
            ]);

            if (isset($validated['sets'])) {
                if (isset($validated['reps_per_set']) && count($validated['reps_per_set']) !== $validated['sets']) {
                    throw ValidationException::withMessages([
                        'reps_per_set' => ['Number of reps must match sets.']
                    ]);
                }

                if (isset($validated['weight_per_set']) && count($validated['weight_per_set']) !== $validated['sets']) {
                    throw ValidationException::withMessages([
                        'weight_per_set' => ['Number of weights must match sets.']
                    ]);
                }
            }

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
            $entry = StrengthExerciseEntries::where('entry_id', $id)
                ->where('user_id', auth()->user()->id)
                ->firstOrFail();

            $entry->delete();

            return response()->json(['message' => 'Entry deleted successfully.']);
        } catch (Throwable $e) {
            return response()->json(['error' => 'Entry not found or access denied.'], 404);
        }
    }
}
