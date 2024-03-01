<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'date',
        'shipping_type_id',
        'user_id',
    ];

    public function shippingType()
    {
        return $this->belongsTo(ShippingType::class);
    }

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
