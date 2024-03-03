<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SaleProductsTableSeeder extends Seeder
{
    public function run()
    {
        $saleProducts = [
            [
                'sale_id' => 1,
                'product_id' => 2, 
            ],
        ];

        DB::table('sale_products')->insert($saleProducts);
    }
}
