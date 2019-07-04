<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Seller extends Model
{
    public function bills()
	{
		return $this->hasMany('App\Bill');
	}
}
