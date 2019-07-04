<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    public function getSizesAttribute($value){
        return json_decode($value);
    }

    public function setSizesAttribute($value){
        //echo $value;
        $this->attributes['sizes'] = json_encode($value);

    }

}
