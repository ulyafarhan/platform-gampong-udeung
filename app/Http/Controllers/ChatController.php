<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function send(Request $request)
    {
        $question = $request->input('question');
        $history = $request->input('history', []);

        // For now, just return a dummy response
        $answer = "Ini adalah jawaban dari Ceurdas. Anda bertanya: \"{$question}\"";

        return response()->json([
            'answer' => $answer,
        ]);
    }
}