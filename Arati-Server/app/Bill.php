<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Bill extends Model
{
    public function getPaymentsAttribute($value){
        return json_decode($value);
    }

    public function setPaymentsAttribute($value){
        //echo $value;
        $this->attributes['payments'] = json_encode($value);
    }
	
	protected $appends = [ 'due' , 'paid' ];
	public $paid, $due;
	
	public function getDueAttribute() {
		if( !isset($this->due )) $this->compute();
		return $this->due;
	}
	
	public function getPaidAttribute() {
		if( !isset($this->paid )) $this->compute();
		return $this->paid;
	}
	
	public function compute()
	{
		$payments = $this->payments ? $this->payments :[];
		$this->paid = 0;
		foreach($payments as $payment)
		{
			$this->paid += intval($payment->amount);
		}
		$this->due = $this->amount - $this->paid;
	}
}
