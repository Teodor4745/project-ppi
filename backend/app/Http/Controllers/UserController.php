<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|max:64',
            'lastname' => 'required|max:64',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|max:16',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);  

        $user = User::create($validatedData);

        $token = $user->createToken('YourAppTokenName')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], 201);
    }


    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'first_name' => 'nullable|max:64',
            'lastname' => 'nullable|max:64',
            'username' => 'nullable|max:30',
            'password' => 'nullable|max:16',
        ]);

        $user->update($validatedData);
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function getUser(Request $request)
    {
        $user = $request->user();
        
        $user->load('role');

        $user->role_name = $user->role->role_name; 

        return response()->json($user);
    }
}
