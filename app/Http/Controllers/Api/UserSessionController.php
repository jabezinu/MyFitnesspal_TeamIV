<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserSessionController extends Controller
{
    /**
     * Get all active sessions for the authenticated user.
     */
    public function index(Request $request)
    {
        $sessions = $request->user()
                            ->userSessions()
                            ->where('is_active', true)
                            ->orderBy('created_at', 'desc')
                            ->get(['id', 'ip_address', 'user_agent', 'created_at', 'expires_at']);

        // Add a friendly device name (optional)
        $sessions->transform(function ($session) {
            $session->device = $this->parseUserAgent($session->user_agent);
            return $session;
        });

        return response()->json([
            'message' => 'Sessions retrieved successfully.',
            'data' => $sessions
        ]);
    }

    /**
     * Revoke (log out) a specific session by its ID.
     */
    public function destroy(Request $request, $sessionId)
    {
        DB::transaction(function () use ($request, $sessionId) {
            // Find the session belonging to the current user
            $session = $request->user()
                               ->userSessions()
                               ->where('id', $sessionId)
                               ->firstOrFail();

            // Find and delete the associated Sanctum token
            $request->user()->tokens()
                            ->where('id', $session->session_id)
                            ->delete();

            // Delete the session record itself
            $session->delete();
        });

        return response()->json([
            'message' => 'Session revoked successfully.'
        ]);
    }

    /**
     * Helper function to parse user agent string into a readable device name.
     * This is a very basic example.
     */
    private function parseUserAgent($userAgent)
    {
        if (strpos($userAgent, 'Mobile') !== false) {
            return 'Mobile Device';
        } elseif (strpos($userAgent, 'Mac') !== false) {
            return 'Mac Computer';
        } elseif (strpos($userAgent, 'Windows') !== false) {
            return 'Windows Computer';
        } else {
            return 'Unknown Device';
        }
    }
}