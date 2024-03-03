<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'product_category' => 2,
                'price' => 561.00,
                'title' => 'Бяла котка',
                'description' => 'Бяла полярна котка с леки психически отклонения. Изисква твърде големи колечества храна, както и доста внимание. Гальовна, но леко досадна. Специално умение: Обучена да минава през дупка във врата.',
            ],
            [
                'product_category' => 3,
                'price' => 15.00,
                'title' => 'Златни рибки',
                'description' => 'Две златни рибки. Изключително мудни, непритенциозни, но мърляви. Забелязани са преследвачески нанлонности, обичат да се взират в теб за дълъг период от време. Специални умения: правят се на мъртви.',
            ],
        ];

        DB::table('products')->insert($products);
    }
}
