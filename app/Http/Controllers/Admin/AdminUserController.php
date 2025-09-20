<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserGoal;
use App\Models\UserProfile;
use App\Models\CheckIn;
use App\Models\FoodDiaryEntry;
use App\Models\CardioExerciseEntries;
use App\Models\StrengthExerciseEntries;
use App\Models\QuickExerciseEntries;
use App\Models\QuickFoodEntry;
use App\Models\WaterEntry;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class AdminUserController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    // List all users with pagination and filtering
    public function index(Request $request)
    {
        try {
            $query = User::with('profile');
            
            // Add search filter
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('username', 'like', "%{$search}%");
                });
            }
            
            // Add role filter
            if ($request->has('role')) {
                $query->where('role', $request->role);
            }
            
            // Add status filter
            if ($request->has('status')) {
                if ($request->status === 'active') {
                    $query->where('is_active', true);
                } elseif ($request->status === 'inactive') {
                    $query->where('is_active', false);
                }
            }
            
            // Add date filter
            if ($request->has('date_from')) {
                $query->whereDate('created_at', '>=', $request->date_from);
            }
            
            if ($request->has('date_to')) {
                $query->whereDate('created_at', '<=', $request->date_to);
            }
            
            $users = $query->orderBy('created_at', 'desc')
                         ->paginate($request->per_page ?? 20);
            
            return response()->json([
                'message' => 'Users retrieved successfully',
                'data' => $users
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve users: ' . $e->getMessage()
            ], 500);
        }
    }

    // Show single user details with all related information
    public function show($id)
    {
        try {
            $user = User::with([
                'profile', 
                'goals', 
                'checkIns' => function($query) {
                    $query->orderBy('date', 'desc')->limit(10);
                }
            ])->findOrFail($id);
            
            // Get recent activity counts
            $recentActivity = [
                'food_entries' => FoodDiaryEntry::where('user_id', $id)
                    ->whereDate('entry_date', '>=', now()->subDays(7))
                    ->count(),
                'cardio_entries' => CardioExerciseEntries::where('user_id', $id)
                    ->whereDate('entry_date', '>=', now()->subDays(7))
                    ->count(),
                'strength_entries' => StrengthExerciseEntries::where('user_id', $id)
                    ->whereDate('entry_date', '>=', now()->subDays(7))
                    ->count(),
                'quick_exercise_entries' => QuickExerciseEntries::where('user_id', $id)
                    ->whereDate('entry_date', '>=', now()->subDays(7))
                    ->count(),
                'quick_food_entries' => QuickFoodEntry::where('user_id', $id)
                    ->whereDate('entry_date', '>=', now()->subDays(7))
                    ->count(),
                'water_entries' => WaterEntry::where('user_id', $id)
                    ->whereDate('entry_date', '>=', now()->subDays(7))
                    ->count(),
            ];
            
            return response()->json([
                'message' => 'User details retrieved successfully',
                'data' => $user,
                'recent_activity' => $recentActivity
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'User not found: ' . $e->getMessage()
            ], 404);
        }
    }

    // Update user info (role, is_active, etc.)
    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'first_name' => 'sometimes|string|max:255',
                'last_name' => 'sometimes|string|max:255',
                'username' => [
                    'sometimes',
                    'string',
                    'max:50',
                    Rule::unique('users', 'username')->ignore($user->id)
                ],
                'email' => [
                    'sometimes',
                    'email',
                    Rule::unique('users', 'email')->ignore($user->id)
                ],
                'role' => 'sometimes|in:admin,user,moderator',
                'is_active' => 'sometimes|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user->update($validator->validated());

            return response()->json([
                'message' => 'User updated successfully', 
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update user: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete user (soft delete)
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Check if trying to delete own account
            if ($user->id === auth()->id()) {
                return response()->json([
                    'message' => 'You cannot delete your own account'
                ], 422);
            }
            
            $user->delete();

            return response()->json([
                'message' => 'User deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete user: ' . $e->getMessage()
            ], 500);
        }
    }

    // List goals for a user
    public function goals($id)
    {
        try {
            $user = User::findOrFail($id);
            $goals = $user->goals()->with('user')->get();
            
            return response()->json([
                'message' => 'User goals retrieved successfully',
                'data' => $goals
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve user goals: ' . $e->getMessage()
            ], 500);
        }
    }

    // List weight check-ins for a user
    public function checkins($id)
    {
        try {
            $user = User::findOrFail($id);
            $checkins = $user->checkIns()->orderBy('date', 'desc')->paginate(20);
            
            return response()->json([
                'message' => 'User check-ins retrieved successfully',
                'data' => $checkins
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve user check-ins: ' . $e->getMessage()
            ], 500);
        }
    }

    // Create a new user
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'username' => 'required|string|max:50|unique:users,username',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6|confirmed',
                'role' => 'required|in:admin,user,moderator',
                'is_active' => 'sometimes|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validated = $validator->validated();
            $validated['password'] = Hash::make($validated['password']);

            $user = User::create($validated);

            // Create an empty profile for the user
            UserProfile::create(['user_id' => $user->id]);

            return response()->json([
                'message' => 'User created successfully', 
                'data' => $user
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create user: ' . $e->getMessage()
            ], 500);
        }
    }

    // Activate / Deactivate user
    public function toggleStatus($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Check if trying to deactivate own account
            if ($user->id === auth()->id() && !$user->is_active) {
                return response()->json([
                    'message' => 'You cannot deactivate your own account'
                ], 422);
            }
            
            $user->is_active = !$user->is_active;
            $user->save();

            return response()->json([
                'message' => "User status updated successfully",
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update user status: ' . $e->getMessage()
            ], 500);
        }
    }
    
    // Get user statistics
    public function stats($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Get various statistics
            $stats = [
                'total_checkins' => $user->checkIns()->count(),
                'total_food_entries' => FoodDiaryEntry::where('user_id', $id)->count(),
                'total_cardio_entries' => CardioExerciseEntries::where('user_id', $id)->count(),
                'total_strength_entries' => StrengthExerciseEntries::where('user_id', $id)->count(),
                'total_quick_exercise_entries' => QuickExerciseEntries::where('user_id', $id)->count(),
                'total_quick_food_entries' => QuickFoodEntry::where('user_id', $id)->count(),
                'total_water_entries' => WaterEntry::where('user_id', $id)->count(),
                'account_age_days' => $user->created_at->diffInDays(now()),
            ];
            
            return response()->json([
                'message' => 'User statistics retrieved successfully',
                'data' => $stats
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve user statistics: ' . $e->getMessage()
            ], 500);
        }
    }
}