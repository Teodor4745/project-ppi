<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class users extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'first_name',
        'lastname',
        'username',
        'password',
        'email',
        'telephone',
        'address',
        'role_type_id'
    ];

    public function role(){
        return $this->belongsTo(UserRole::class, 'role_type_id');
    }
}
