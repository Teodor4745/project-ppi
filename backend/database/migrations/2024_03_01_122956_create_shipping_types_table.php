<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippingTypesTable extends Migration
{
    public function up()
    {
        Schema::create('shipping_types', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date');
            $table->unsignedBigInteger('shipping_type_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
