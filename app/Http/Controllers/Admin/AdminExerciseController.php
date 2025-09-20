<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExerciseDatabase;
use App\Models\CardioExerciseEntries;
use App\Models\StrengthExerciseEntries;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AdminExerciseController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('admin');
    // }

    // List all exercises with pagination and optional filters
    public function index(Request $request)
    {
        try {
            $query = ExerciseDatabase::with('catagory', 'user');
            
            // Add search filter
            if ($request->has('search')) {
                $query->where('exercise_name', 'like', '%' . $request->search . '%');
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
            
            // Add type filter
            if ($request->has('type')) {
                $query->where('exercise_type', $request->type);
            }
            
            $exercises = $query->orderBy('created_at', 'desc')
                             ->paginate($request->per_page ?? 20);
            
            return response()->json($exercises);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch exercises: ' . $e->getMessage()
            ], 500);
        }
    }

    // Exercise details
    public function show($id)
    {
        try {
            $exercise = ExerciseDatabase::with('catagory', 'user', 'cardio', 'strength')
                                      ->findOrFail($id);
            return response()->json($exercise);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Exercise not found: ' . $e->getMessage()
            ], 404);
        }
    }

    // Add new exercise
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'exercise_name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('exercise_databases', 'exercise_name')
                ],
                'catagory_id' => 'required|exists:exercise_caragories,catagory_id',
                'exercise_type' => 'required|in:cardiovascular,strength,flexibility,sports,other',
                'calories_per_minute' => 'required|numeric|min:0',
                'description' => 'nullable|string',
                'instructions' => 'nullable|string',
                'muscle_groups' => 'nullable|array',
                'muscle_groups.*' => 'string|max:50',
                'equipment_needed' => 'nullable|string',
                'difficulty_level' => 'nullable|in:beginner,intermediate,advanced',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            
            // Set default values for admin-created exercises
            $data['is_verified'] = true;
            $data['is_public'] = true;
            $data['created_by_user_id'] = auth()->id();

            $exercise = ExerciseDatabase::create($data);

            return response()->json([
                'message' => 'Exercise created successfully',
                'exercise' => $exercise
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create exercise: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update exercise
    public function update(Request $request, $id)
    {
        try {
            $exercise = ExerciseDatabase::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'exercise_name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('exercise_databases', 'exercise_name')->ignore($exercise->exercise_id, 'exercise_id')
                ],
                'catagory_id' => 'required|exists:exercise_caragories,catagory_id',
                'exercise_type' => 'required|in:cardiovascular,strength,flexibility,sports,other',
                'calories_per_minute' => 'required|numeric|min:0',
                'description' => 'nullable|string',
                'instructions' => 'nullable|string',
                'muscle_groups' => 'nullable|array',
                'muscle_groups.*' => 'string|max:50',
                'equipment_needed' => 'nullable|string',
                'difficulty_level' => 'nullable|in:beginner,intermediate,advanced',
                'is_verified' => 'sometimes|boolean',
                'is_public' => 'sometimes|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $exercise->update($validator->validated());

            return response()->json([
                'message' => 'Exercise updated successfully',
                'exercise' => $exercise
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update exercise: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete exercise
    public function destroy($id)
    {
        try {
            $exercise = ExerciseDatabase::findOrFail($id);
            
            // Check if exercise is being used in any entries
            $cardioCount = CardioExerciseEntries::where('exercise_id', $id)->count();
            $strengthCount = StrengthExerciseEntries::where('exercise_id', $id)->count();
            
            if ($cardioCount > 0 || $strengthCount > 0) {
                return response()->json([
                    'error' => 'Cannot delete exercise. It is being used in ' . 
                              ($cardioCount + $strengthCount) . ' workout entries.'
                ], 422);
            }
            
            $exercise->delete();

            return response()->json([
                'message' => 'Exercise deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete exercise: ' . $e->getMessage()
            ], 500);
        }
    }

    // Pending exercises (user-submitted)
    public function pending()
    {
        try {
            $pendingExercises = ExerciseDatabase::with('user')
                ->where('is_rejected', false)
                ->where('is_verified', false)
                ->orWhere('is_public', false)
                ->orderBy('created_at', 'desc')
                ->get();
                
            return response()->json($pendingExercises);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch pending exercises: ' . $e->getMessage()
            ], 500);
        }
    }

    // Approve exercise
    public function approve($id)
    {
        try {
            $exercise = ExerciseDatabase::findOrFail($id);
            $exercise->update([
                'is_verified' => true,
                'is_public' => true
            ]);

            return response()->json([
                'message' => 'Exercise approved successfully',
                'exercise' => $exercise
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to approve exercise: ' . $e->getMessage()
            ], 500);
        }
    }

        // Reject exercise
    public function reject(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'rejection_reason' => 'nullable|string|max:500'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $exercise = ExerciseDatabase::findOrFail($id);
            $exercise->update([
                'is_verified' => false,
                'is_public' => false,
                'is_rejected' => true,
                'rejection_reason' => $request->rejection_reason,
                'rejected_at' => now()
            ]);

            return response()->json([
                'message' => 'Exercise rejected successfully',
                'exercise' => $exercise
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to reject exercise'], 500);
        }
    }

        //view rejected exercises
    public function rejected()
    {
        try {
            $rejectedExercises = ExerciseDatabase::with('user')
                ->where('is_rejected', true)
                ->orderBy('rejected_at', 'desc')
                ->get();
                
            return response()->json($rejectedExercises);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch rejected exercises: ' . $e->getMessage()
            ], 500);
        }
    }

    //  restore rejected exercises
    public function restore($id)
    {
        try {
            $exercise = ExerciseDatabase::findOrFail($id);
            $exercise->update([
                'is_rejected' => false,
                'rejection_reason' => null,
                'rejected_at' => null
            ]);

            return response()->json([
                'message' => 'Exercise restored successfully',
                'exercise' => $exercise
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to restore exercise: ' . $e->getMessage()
            ], 500);
        }
    }
}