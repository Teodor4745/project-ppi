<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProductCategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $count = 0;
        if (Schema::hasTable('product_categories')) {
            $count = DB::table('product_categories')->count();
        }

        if($count == 0) {
            $categories = [
                ['type_id' => 1, 'title' => 'Котки'],
                ['type_id' => 1, 'title' => 'Кучета'],
                ['type_id' => 1, 'title' => 'Риби'],
                ['type_id' => 1, 'title' => 'Гризачи'],
                ['type_id' => 1, 'title' => 'Птици'],
                ['type_id' => 1, 'title' => 'Влечуги'],
                ['type_id' => 1, 'title' => 'Екзотични животни'],
                ['type_id' => 3, 'title' => 'Храна'],
                ['type_id' => 2, 'title' => 'Аксесоари'],
            ];
    
            DB::table('product_categories')->insert($categories);
        }
    }
}
