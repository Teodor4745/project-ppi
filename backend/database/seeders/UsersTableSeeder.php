<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['firstname' => 'Теодор',
            'lastname' => 'Иванов',
            'username' => 'teodor',
            'password' => '123456',
            'email' => 'teo@gmail.com',
            'telephone' => null,
            'address' => null,
            'role_type_id' => 1],

            ['firstname' => 'Михаела',
            'lastname' => 'Христова',
            'username' => 'mihaela',
            'password' => '123456',
            'email' => 'hmihaela36@gmail.com',
            'telephone' => null,
            'address' => null,
            'role_type_id' => 1]
        ];

        DB::table('users')->insert($users);
    }
}
