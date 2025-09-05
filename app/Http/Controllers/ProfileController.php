<?php
namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request) {
        return response()->json($request->user()->load('profile'));
    }

    public function update(UpdateProfileRequest $request) {
        $user = $request->user();

        $user->fill($request->only(['first_name','last_name']))->save();

        $user->profile->fill($request->validated());
        $user->profile->save();

        return response()->json($user->load('profile'));
    }
}
