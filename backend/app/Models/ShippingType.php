<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingType extends Model
{
    protected $table = 'shipping_types';

    protected $fillable = [
        'date',
        'title',
    ];
}
