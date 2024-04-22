<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ShippingType;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class ShippingTypeController extends Controller
{
    public function index()
    {
        return response()->json(ShippingType::all());
    }
}
