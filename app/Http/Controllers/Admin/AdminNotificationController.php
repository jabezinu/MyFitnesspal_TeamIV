<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserNotification;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AdminNotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    // View all notifications with filtering and pagination
    public function index(Request $request)
    {
        try {
            $query = UserNotification::with('user')->orderByDesc('created_at');
            
            // Add type filter
            if ($request->has('type')) {
                $query->where('notification_type', $request->type);
            }
            
            // Add read status filter
            if ($request->has('is_read')) {
                if ($request->is_read === 'true') {
                    $query->whereNotNull('read_at');
                } else {
                    $query->whereNull('read_at');
                }
            }
            
            // Add date range filter
            if ($request->has('start_date')) {
                $query->whereDate('created_at', '>=', $request->start_date);
            }
            
            if ($request->has('end_date')) {
                $query->whereDate('created_at', '<=', $request->end_date);
            }
            
            $notifications = $query->paginate($request->per_page ?? 20);
            
            return response()->json($notifications);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch notifications: ' . $e->getMessage()
            ], 500);
        }
    }

    // Send notification to a user
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required_without:send_to_all|exists:users,id',
                'send_to_all' => 'sometimes|boolean',
                'title' => 'required|string|max:255',
                'message' => 'required|string',
                'notification_type' => 'required|in:reminder,achievement,system,warning',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $notifications = [];

            if ($request->send_to_all) {
                // Send to all active users
                $users = User::where('is_active', true)->get();
                
                foreach ($users as $user) {
                    $notifications[] = UserNotification::create([
                        'user_id' => $user->id,
                        'title' => $request->title,
                        'message' => $request->message,
                        'notification_type' => $request->notification_type,
                    ]);
                }
                
                $message = 'Notification sent to all users';
            } else {
                // Send to specific user
                $notification = UserNotification::create([
                    'user_id' => $request->user_id,
                    'title' => $request->title,
                    'message' => $request->message,
                    'notification_type' => $request->notification_type,
                ]);
                
                $notifications[] = $notification;
                $message = 'Notification sent successfully';
            }

            return response()->json([
                'message' => $message,
                'notifications' => $notifications
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to send notification: ' . $e->getMessage()
            ], 500);
        }
    }

    // Mark a notification as read
    public function markRead($id)
    {
        try {
            $notification = UserNotification::findOrFail($id);
            
            if ($notification->read_at) {
                return response()->json([
                    'message' => 'Notification was already marked as read'
                ]);
            }
            
            $notification->update([
                'read_at' => now(),
                'is_read' => true
            ]);

            return response()->json([
                'message' => 'Notification marked as read successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to mark notification as read: ' . $e->getMessage()
            ], 500);
        }
    }

    // Mark all notifications as read for a user
    public function markAllRead($userId)
    {
        try {
            $user = User::findOrFail($userId);
            
            $updated = UserNotification::where('user_id', $userId)
                ->whereNull('read_at')
                ->update([
                    'read_at' => now(),
                    'is_read' => true
                ]);

            return response()->json([
                'message' => "Marked $updated notifications as read for user"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to mark notifications as read: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete a notification
    public function destroy($id)
    {
        try {
            $notification = UserNotification::findOrFail($id);
            $notification->delete();

            return response()->json([
                'message' => 'Notification deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete notification: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get notification statistics
    public function stats()
    {
        try {
            $total = UserNotification::count();
            $read = UserNotification::whereNotNull('read_at')->count();
            $unread = $total - $read;
            
            $byType = UserNotification::select('notification_type', \DB::raw('COUNT(*) as count'))
                ->groupBy('notification_type')
                ->get();
                
            $recent = UserNotification::with('user')
                ->orderByDesc('created_at')
                ->limit(10)
                ->get();

            return response()->json([
                'total' => $total,
                'read' => $read,
                'unread' => $unread,
                'by_type' => $byType,
                'recent_notifications' => $recent
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch notification statistics: ' . $e->getMessage()
            ], 500);
        }
    }
}