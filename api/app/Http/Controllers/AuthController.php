<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showCsrfCookie(Request $request)
    {
        return response()->json(['message' => 'CSRF cookie set']);
    }

    public function login(Request $request)
    {
        $request->validate([
            'staff_id' => 'required|string|exists:users,code',
            'password' => 'required|string|min:6',
        ]);

        $user = User::where('code', $request->staff_id)->first([
            'id',
            'name',
            'password',
            'avatar',
            'role'
        ]);


        if (!Hash::check($request->password, $user->password)) {

            return response()->json([
                'success' => false,
                'message' => 'Incorrect password.Try again',
            ], 422);
        }

        Auth::login($user);

        return response()->json([
            'success' => true,
            'data'=> [
                'user' => $user,
                'message' => 'Authentication successful',
                'redirectUrl' =>  "/tracker/dashboard"
            ]
        ], 200);
    }


    public function logout(Request $request)
    {


            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();


        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}
