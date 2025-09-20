<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminSettingsController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    // View all settings with optional grouping
    public function index(Request $request)
    {
        try {
            $query = DB::table('system_settings');
            
            // Filter by group if provided
            if ($request->has('group')) {
                $query->where('group', $request->group);
            }
            
            $settings = $query->get();
            
            // Group settings by category if no specific group was requested
            if (!$request->has('group')) {
                $groupedSettings = $settings->groupBy('group');
                return response()->json($groupedSettings);
            }
            
            return response()->json($settings);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch system settings: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get a specific setting by key
    public function show($key)
    {
        try {
            $setting = DB::table('system_settings')
                ->where('setting_key', $key)
                ->first();
                
            if (!$setting) {
                return response()->json([
                    'error' => "Setting '$key' not found."
                ], 404);
            }
            
            return response()->json($setting);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch setting: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update a specific setting by key
    public function update(Request $request, $key)
    {
        try {
            $validator = Validator::make($request->all(), [
                'value' => 'required|string',
                'description' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $updated = DB::table('system_settings')
                ->where('setting_key', $key)
                ->update([
                    'setting_value' => $request->value,
                    'description' => $request->description ?? '',
                    'updated_by_user_id' => auth()->id(),
                    'updated_at' => now()
                ]);

            if ($updated) {
                $updatedSetting = DB::table('system_settings')
                    ->where('setting_key', $key)
                    ->first();
                    
                return response()->json([
                    'message' => "Setting '$key' updated successfully.",
                    'setting' => $updatedSetting
                ]);
            } else {
                return response()->json([
                    'error' => "Setting '$key' not found."
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update setting: ' . $e->getMessage()
            ], 500);
        }
    }

    // Create a new setting
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'setting_key' => 'required|string|unique:system_settings,setting_key',
                'setting_value' => 'required|string',
                'description' => 'nullable|string',
                'group' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $id = DB::table('system_settings')->insertGetId([
                'setting_key' => $request->setting_key,
                'setting_value' => $request->setting_value,
                'description' => $request->description ?? '',
                'group' => $request->group ?? 'general',
                'updated_by_user_id' => auth()->id(),
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $newSetting = DB::table('system_settings')->find($id);

            return response()->json([
                'message' => 'Setting created successfully.',
                'setting' => $newSetting
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create setting: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete a setting
    public function destroy($key)
    {
        try {
            $deleted = DB::table('system_settings')
                ->where('setting_key', $key)
                ->delete();

            if ($deleted) {
                return response()->json([
                    'message' => "Setting '$key' deleted successfully."
                ]);
            } else {
                return response()->json([
                    'error' => "Setting '$key' not found."
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete setting: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get settings by group
    public function byGroup($group)
    {
        try {
            $settings = DB::table('system_settings')
                ->where('group', $group)
                ->get();
                
            return response()->json($settings);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch settings for group: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get all available groups
    public function groups()
    {
        try {
            $groups = DB::table('system_settings')
                ->select('group')
                ->distinct()
                ->orderBy('group')
                ->pluck('group');
                
            return response()->json($groups);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch setting groups: ' . $e->getMessage()
            ], 500);
        }
    }
}