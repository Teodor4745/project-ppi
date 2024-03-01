<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $fillable = [
        'type_id',
        'title',
    ];

    public function type()
    {
        return $this->belongsTo(ProductType::class, 'type_id');
    }
}
