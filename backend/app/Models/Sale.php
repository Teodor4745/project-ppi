<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'date',
        'shipping_type_id',
        'user_id',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'sale_products')
                    ->withPivot(['quantity']);
    }

    public function shippingType()
    {
        return $this->belongsTo(ShippingType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
