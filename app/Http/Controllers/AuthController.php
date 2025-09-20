<?php
namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\LoginAttempt;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {

        LoginAttempt::create([
            'email' => $request->email,
            'ip_address' => $request->ip(), // Get the user's IP
            'user_agent' => $request->userAgent(), // Get the user's browser/device info
            'success' => false, // Assume failure initially
        ]);

        if (!Auth::attempt($request->only('email','password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

         // If login was successful, update the last attempt record to success=true
        LoginAttempt::where('email', $request->email)
                    ->latest('attempted_at') // Get the most recent attempt for this email
                    ->first()
                    ->update(['success' => true]);

        $user = $request->user();
        $token = $user->createToken('auth')->plainTextToken;

        $newToken = $user->tokens()->latest()->first();
        // Create a session record linked to this token ID
        $user->createSessionRecord($newToken->id, 'auth'); // Pass the token's ID

        return response()->json(['token' => $token, 'user' => $user->load('profile','goals')]);
        // return response()->json(['token' => $token, 'user' => $user->load('profile','goals')]);
    }

    public function me(Request $request) {
        return response()->json($request->user()->load('profile','goals'));
    }

    public function logout(Request $request) {
    $tokenId = $request->user()->currentAccessToken()->id;

    $request->user()->userSessions()
                    ->where('session_id', $tokenId)
                    ->delete();

    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out']);
        // $request->user()->currentAccessToken()->delete();
        // return response()->json(['message' => 'Logged out']);
    }
}
