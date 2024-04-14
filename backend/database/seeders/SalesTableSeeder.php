<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SalesTableSeeder extends Seeder
{
    public function run()
    {
        if (Schema::hasTable('sales')) {
            $count = DB::table('sales')->count();
        }
        $count = 0;

        if($count == 0) {
            $sales = [
                [   'shipping_type_id' => 3, 
                    'user_id' => 2],
            ];
    
            DB::table('sales')->insert($sales);
        }
        
    }
}
