<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'question' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $message = new Message();
        $message->name = $request->name;
        $message->email = $request->email;
        $message->question = $request->question;
        $message->save();

        return response()->json(['message' => 'Успешно изпратено съобщение.'], 201);
    }
}
