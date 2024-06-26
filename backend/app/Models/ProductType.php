<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    protected $table = 'product_types';

    protected $fillable = [
        'title',
    ];

    public function categories()
    {
        return $this->hasMany(ProductCategory::class, 'type_id');
    }
}
