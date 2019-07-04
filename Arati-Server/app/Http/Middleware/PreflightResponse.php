<?php
namespace App\Http\Middleware;
use Closure;
class PreflightResponse
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next )
    {
        //dd($request->getMethod());
        if ($request->getMethod() === "OPTIONS") {
            return response('')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods',' POST, GET')
            ->header('Access-Control-Allow-Headers','Content-Type')
            ->header('Access-Control-Allow-Origin', '*');
        }
        //return response()->json( $request->all() );
        return $next($request)
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With')
            ->header('Access-Control-Allow-Origin', '*');
    }
}