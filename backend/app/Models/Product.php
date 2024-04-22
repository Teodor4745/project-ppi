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
        'image',
    ];
    
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category');
    }

    public function sales()
    {
        return $this->belongsToMany(Sale::class, 'sale_products');
    }
}
