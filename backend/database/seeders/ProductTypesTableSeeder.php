<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProductTypesTableSeeder extends Seeder
{
    public function run()
    {
        $count = 0;
        if (Schema::hasTable('product_types')) {
            $count = DB::table('product_types')->count();
        }

        if($count == 0) {
            $productTypes = [
                ['title' => 'Животно'],
                ['title' => 'Аксесоари'],
                ['title' => 'Храна'],
            ];
    
            DB::table('product_types')->insert($productTypes);
        }
        
    }
}
