<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    // Admin login
    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required|string|min:6'
        ]);

        $credentials = $request->only('email', 'password');

        // Only allow admins
        if(Auth::attempt(array_merge($credentials, ['role'=>'admin']))) {
            $user = Auth::user();
            
            // Optional: check if account is active
            if($user->status !== 'active'){
                return response()->json(['message'=>'Account disabled'],403);
            }

            $token = $user->createToken('admin-token')->plainTextToken;

            return response()->json([
                'message'=>'Admin logged in',
                'token'=>$token,
                'user'=>$user
            ],200);
        }

        return response()->json(['message'=>'Invalid credentials or not an admin'],401);
    }

    // Admin logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message'=>'Logged out successfully'],200);
    }
}
