<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserNotification;
use Illuminate\Http\Request;

class UserNotificationController extends Controller
{
    /**
     * Get the authenticated user's notifications.
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            $notifications = UserNotification::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->orderBy('is_read') // Show unread first
                ->paginate(20);

            return response()->json([
                'message' => 'Notifications retrieved successfully.',
                'data' => $notifications
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch notifications.'
            ], 500);
        }
    }

    /**
     * Mark a specific notification as read.
     */
    public function markAsRead(Request $request, $id)
    {
        try {
            $notification = UserNotification::where('id', $id)
                ->where('user_id', $request->user()->id)
                ->firstOrFail();

            if (!$notification->is_read) {
                $notification->update([
                    'is_read' => true,
                    'read_at' => now()
                ]);
            }

            return response()->json([
                'message' => 'Notification marked as read.',
                'data' => $notification
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Notification not found.'
            ], 404);
        }
    }

    /**
     * Mark all notifications as read for the user.
     */
    public function markAllAsRead(Request $request)
    {
        try {
            $updated = UserNotification::where('user_id', $request->user()->id)
                ->where('is_read', false)
                ->update([
                    'is_read' => true,
                    'read_at' => now()
                ]);

            return response()->json([
                'message' => "Marked $updated notifications as read."
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to mark notifications as read.'
            ], 500);
        }
    }

    /**
     * Get the count of unread notifications.
     * This is very useful for showing a badge icon on the frontend.
     */
    public function unreadCount(Request $request)
    {
        try {
            $count = UserNotification::where('user_id', $request->user()->id)
                ->where('is_read', false)
                ->count();

            return response()->json([
                'message' => 'Unread count retrieved.',
                'data' => ['unread_count' => $count]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to get unread count.'
            ], 500);
        }
    }
}