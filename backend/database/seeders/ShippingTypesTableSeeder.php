<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ShippingTypesTableSeeder extends Seeder
{
    public function run()
    {
        $count = 0;
        if (Schema::hasTable('shipping_types')) {
            $count = DB::table('shipping_types')->count();
        }

        if($count == 0) {
            $shippingTypes = [
                ['title' => 'Еконт'],
                ['title' => 'Спиди'],
                ['title' => 'Лично предаване'],
            ];
    
            DB::table('shipping_types')->insert($shippingTypes);
        }
        
    }
}
