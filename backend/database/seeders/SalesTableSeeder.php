<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesTableSeeder extends Seeder
{
    public function run()
    {
        $sales = [
            [   'shipping_type_id' => 3, 
                'user_id' => 2],
        ];

        DB::table('sales')->insert($sales);
    }
}
