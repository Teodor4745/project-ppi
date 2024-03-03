<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRolesTableSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            ['role_name' => 'Admin'],
            ['role_name' => 'User'],
        ];

    }
}
