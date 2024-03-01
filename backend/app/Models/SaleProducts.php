<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaleProduct extends Model
{
    protected $fillable = [
        'sale_id',
        'product_id',
    ];
    
    public function sale()
    {
        return $this->belongsTo(Sales::class);
    }
    
    public function product()
    {
        return $this->belongsTo(Products::class);
    }
}
