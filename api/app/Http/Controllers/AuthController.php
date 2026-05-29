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

        //  Generate Sanctum token
         $token = $user->createToken('user-token')->plainTextToken;

         return response()->json([
            'success' => true,
            'data'=> [
                'user' => $user,
                'message' => 'Authentication successful',
                'redirectUrl' =>  "/tracker/dashboard"
            ]
        ], 200);
    }



    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'bio' => 'required|string',
            'phone' => 'required|string|unique:users,phone',
            'email' => 'required|string|unique:users,email',
            'role' => 'required|in:poster,worker,both,admin',
            'password' => 'required|confirmed',
        ]);

        $user = User::create([
           'name'=> $data['name'],
           'phone'=> $data['phone'],
           'email'=> $data['email'],
           'role'=> $data['role'],
           'bio'=> $data['bio'],
           'password'=> Hash::make($data['password']),
        ]);

        return response()->json([
            'success'=> true,
            'message' => 'Accout ready',
            'user' => $user
        ]);
    }


    public function logout(Request $request)
    {
        // Delete Sanctum token if using token-based auth (Electron)
        if ($request->user() && $request->bearerToken()) {
            $request->user()->currentAccessToken()->delete();
        }

        // Only invalidate session if one exists (web cookie auth)
        if ($request->hasSession()) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}
