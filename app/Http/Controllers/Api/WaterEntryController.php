<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WaterEntry;
use Illuminate\Http\Request;

class WaterEntryController extends Controller
{
    // List water logs for user by date
    public function index(Request $request)
    {
        try {
            $userId = $request->user()?->id ?? $request->query('user_id');
            $date = $request->query('date', now()->toDateString());

            $entries = WaterEntry::where('user_id', $userId)
                ->whereDate('entry_date', $date)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($entries);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while fetching water entries',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Add water log
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'amount' => 'required|numeric|min:1',
                'unit' => 'required|string',
                'entry_date' => 'required|date',
            ]);

            $entry = WaterEntry::create($validated);

            return response()->json([
                'message' => 'Water entry added successfully',
                'data' => $entry
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while storing water entry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete log
    public function destroy(Request $request, $id)
    {
        try {
            $userId = $request->user()?->id ?? $request->query('user_id');

            $entry = WaterEntry::where('entry_id', $id)
                ->where('user_id', $userId)
                ->firstOrFail();

            $entry->delete();

            return response()->json(['message' => 'Water entry deleted successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while deleting water entry',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
