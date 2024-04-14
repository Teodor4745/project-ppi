<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\Sale;       
use App\Models\Product;

class SaleProductsTableSeeder extends Seeder
{
    public function run()
    {

        $count = 0;
        if (Schema::hasTable('sale_products')) {
            $count = DB::table('sale_products')->count();
        }

        if ($count == 0) {
            $sale = Sale::first(); 
            $product = Product::first(); 

            if ($sale && $product) {
                $saleProducts = [
                    [
                        'sale_id' => $sale->id,        
                        'product_id' => $product->id,  
                    ],
                ];
    
                DB::table('sale_products')->insert($saleProducts);
            } 
        }
    }
}
