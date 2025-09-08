<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends AdminBaseController
{
    // 1. List all users
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    // 2. Get a single user
    public function show($id)
    {
        $user = User::findOrFail($id);
        if (!$user) return response()->json(['message'=>'User not found'],404);

        return response()->json($user, 200);
    }

    // 3. Create a new user
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            // 'role' => 'required|in:admin,user',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // 'role' => $request->role,
            'is_active' => true,
        ]);

        return response()->json($user, 201);
    }

    // 4. Update a user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'role' => 'sometimes|in:admin,user',
            'is_active' => 'sometimes|boolean',
        ]);

        $user->update($request->only(['first_name', 'last_name', 'email', 'role', 'is_active']));

        return response()->json($user);
    }

    // 5. Delete a user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if(!$user) return response()->json(['message'=>'User not found'],404);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    // 6. Reset user password
    public function resetPassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string|min:6'
        ]);

        $user = User::findOrFail($id);
        if(!$user) return response()->json(['message'=>'User not found'],404);

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password reset successfully']);
    }

    // Deactivate user
    public function deactivate($id)
    {
        $user = User::find($id);
        if(!$user) return response()->json(['message'=>'User not found'],404);

        $user->is_active = false;
        $user->save();

        return response()->json(['message'=>'User deactivated'],200);
    }

    // Activate user
    public function activate($id)
    {
        $user = User::find($id);
        if(!$user) return response()->json(['message'=>'User not found'],404);

        $user->is_active = true;
        $user->save();

        return response()->json(['message'=>'User activated'],200);
    }

    // Login activity (example: created_at & updated_at for now)
    public function logins($id)
    {
        $user = User::find($id);
        if(!$user) return response()->json(['message'=>'User not found'],404);

        // Ideally: You would log every login attempt in a separate table
        return response()->json([
            'last_login' => $user->last_login_at ?? null,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at
        ],200);
    }
}