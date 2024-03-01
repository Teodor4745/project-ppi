<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShippingType extends Model
{
    protected $fillable = [
        'date',
        'title',
    ];
}
