<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }


        if (!in_array($user->role,['admin'])) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authourized as admin'
            ], 401);
        }

        return $next($request);
    }
}
