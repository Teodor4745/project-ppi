<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTypesTableSeeder extends Seeder
{
    public function run()
    {
        $productTypes = [
            ['title' => 'Животно'],
            ['title' => 'Аксесоари'],
            ['title' => 'Храна'],
        ];

        DB::table('product_types')->insert($productTypes);
    }
}
