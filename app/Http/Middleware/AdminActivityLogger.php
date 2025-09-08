<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminActivityLogger
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if($user && $user->role === 'admin'){
            Log::info('Admin '.$user->id.' accessed '.$request->method().' '.$request->path());
        }

        return $next($request);
    }
}
