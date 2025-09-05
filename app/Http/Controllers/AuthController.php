<?php
namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        if (!Auth::attempt($request->only('email','password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $user = $request->user();
        $token = $user->createToken('auth')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user->load('profile','goals')]);
    }

    public function me(Request $request) {
        return response()->json($request->user()->load('profile','goals'));
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
