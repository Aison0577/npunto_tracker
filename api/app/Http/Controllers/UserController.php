<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function index(Request $request): JsonResponse
    {
        $team = User::all();
        return response()->json(['success'=>true, 'message'=>'Team fetched successfully', 'data'=>$team]);
    }


    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:60',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20|unique:users,phone',
            'department' => 'required|string|max:20',
            'password' => 'required|string|max:20|confirmed',
            'password_confirmation' => 'required|string|max:20',
            'role' => 'required|in:admin,staff',
        ]);


        $code = $this->generateMemberCode();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'department' => $request->department,
            'password' => Hash::make($request->password),
            'code' => $code,
            'role' => $request->role,
        ]);

        return response()->json([
            'success'=>true,
            'message'=>'Member created successfully',
            'data'=>$user
        ], 201);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json([
            'success' => true,
            'message' => 'Member deleted successfully',
        ]);
    }

    private function generateMemberCode(): string
    {
        do {
            $code = 'NPT-' . strtoupper(bin2hex(random_bytes(4)));
        } while (User::where('code', $code)->exists());

        return $code;
    }
}
