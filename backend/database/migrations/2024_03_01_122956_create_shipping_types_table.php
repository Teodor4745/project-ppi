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
            $table->text('title');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shipping_types');
    }
}
