<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'product_category',
        'price',
        'title',
        'description',
    ];
    
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category');
    }
}
