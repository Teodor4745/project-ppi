<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = 'product_categories';

    protected $fillable = [
        'type_id',
        'title',
    ];

    public function type()
    {
        return $this->belongsTo(ProductType::class, 'type_id');
    }

    
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
