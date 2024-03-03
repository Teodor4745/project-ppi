<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShippingTypesTableSeeder extends Seeder
{
    public function run()
    {
        $shippingTypes = [
            ['title' => 'Еконт'],
            ['title' => 'Спиди'],
            ['title' => 'Лично предаване'],
        ];

        DB::table('shipping_types')->insert($shippingTypes);
    }
}
