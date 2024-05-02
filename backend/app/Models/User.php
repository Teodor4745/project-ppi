<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens; 

    protected $table = 'users';

    protected $fillable = [
        'firstname',
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
