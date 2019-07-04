<?php

namespace App\Http\Controllers;

use App\Bill;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BillController extends Controller
{
    public function index()
    {
		$data = [];
        $sellers = Bill::select('name')->groupBy('name')->orderBy('name')->paginate(10);
        //dd($sellers);
		foreach($sellers as $seller){
            $seller->total_amount = Bill::where('name',$seller->name)->sum('amount');
            $seller->bills = Bill::where('name',$seller->name)->get();
            $seller->total_due = 0;
			foreach($seller->bills as $bill){
				$bill->compute();
                $seller->total_due += $bill->due;
                $seller->text_color = "";
				if($bill->paid == $bill->amount) $seller->text_color = "red-text";
			}
		}
		return $sellers ;
    }

    public function store(Request $request)
    {
        //dd($request);
        $count = 0;
        $data = $request->input('data',null);
        $obj = json_decode($data);
        //dd($obj,$data);
        if(property_exists($obj,'id') ){
            $id = $obj->id;
            $p = ($id) ? Bill::find($id) : new Bill();
            $p = ($p) ? $p :new Bill();
            $p->name = $obj->name;
            $p->bill_no = $obj->bill_no;
            $p->amount = intval($obj->amount);
            $p->issue_date = Carbon::parse($obj->issue_date);
            $p->payments = $obj->payments;
            $p->save();
            $count++;
        }
        return [ 'count' => $count];
    }

    public function destroy(Request $request)
    {
        $id = $request->input('id',null);
        if($id){
            Bill::destroy($id);
        }
        return ['count'=>1];
    }
}
