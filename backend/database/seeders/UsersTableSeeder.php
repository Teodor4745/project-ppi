<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;


class UsersTableSeeder extends Seeder
{
    public function run(): void
    {

        $count = 0;
        if (Schema::hasTable('users')) {
            $count = DB::table('users')->count();
        }

        if($count == 0) {
            $users = [
                ['firstname' => 'Теодор',
                'lastname' => 'Иванов',
                'username' => 'teodor',
                'password' => Hash::make('password'),
                'email' => 'teo@gmail.com',
                'telephone' => null,
                'address' => null,
                'role_type_id' => 1],
    
                ['firstname' => 'Михаела',
                'lastname' => 'Христова',
                'username' => 'mihaela',
                'password' => Hash::make('password'),
                'email' => 'hmihaela36@gmail.com',
                'telephone' => null,
                'address' => null,
                'role_type_id' => 1]
            ];
    
            DB::table('users')->insert($users);
        }
    }
}
