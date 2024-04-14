<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UserRolesTableSeeder extends Seeder
{
    public function run()
    {
        $count = 0;
        if (Schema::hasTable('user_roles')) {
            $count = DB::table('user_roles')->count();
        }

        if($count == 0) {
            $roles = [
                ['role_name' => 'Admin'],
                ['role_name' => 'User'],
            ];
    
            DB::table('user_roles')->insert($roles);
        }

    }
}
