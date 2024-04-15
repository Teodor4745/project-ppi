<?php
namespace Database\Seeders;

use App\Models\Product;
use App\Models\ShippingType;
use App\Models\User;
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
            

            $shipping_type = ShippingType::first(); 
            $user = User::first(); 

            if ($shipping_type && $user) {
                $sales = [
                    [   'shipping_type_id' => $shipping_type->id, 
                        'user_id' => $user->id],
                ];
    
                DB::table('sales')->insert($sales);
            }
            
        }
        
    }
}
