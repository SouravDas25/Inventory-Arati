<?php

namespace App\Http\Controllers;

use App\Product;
use App\Utility;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return string
     */
    public function index()
    {
        return Product::orderBy('name')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function store(Request $request)
    {
        //dd($request);
        $data = $request->input('data',null);
        if($data) {
            $count = 0;
            $data = $data['data'];
            foreach ($data as $obj) {
                $id = $obj['id'];
                $p = ($id) ? Product::find($id) : new Product();
                $p = ($p) ? $p :new Product();
                $p->name = $obj['name'];
                $p->notes = $obj['notes'];
                $p->sizes = $obj['sizes'];
                $p->save();
                $count++;
            }
        }
        return [ 'count' => $count];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $request
     * @return array
     */
    public function destroy(Request $request)
    {
        $id = $request->input('id',null);
        if($id){
            Product::destroy($id);
        }
        return ['count'=>1];
    }
}
