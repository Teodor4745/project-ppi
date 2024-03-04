<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductCategoriesTableSeeder extends Seeder
{
    public function run()
    {
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
