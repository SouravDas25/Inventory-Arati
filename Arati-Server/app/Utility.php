<?php

namespace App;


class Utility
{
    public static function saveFileAs($request, $key,$path, $filename)
    {
        if ($files = $request->file($key)) {
            $file = $files;
            if (is_array($files)) {
                $file = $files[0];
            };
            $file->storeAs(
                $path,
                $filename . '.' . $file->getClientOriginalExtension(),
                config('voyager.storage.disk', 'public')
            );
            return $path . $filename . '.' . $file->getClientOriginalExtension();
        }
        return null;
    }

    public static function saveFile($request, $key, $slug)
    {
        if ($files = $request->file($key)) {
            $file = $files;
            if (is_array($files)) {
                $file = $files[0];
            }
            $filename = Str::random(20);
            $path = $slug . '/' . date('FY') . '/';
            $file->storeAs(
                $path,
                $filename . '.' . $file->getClientOriginalExtension(),
                config('voyager.storage.disk', 'public')
            );
            return $path . $filename . '.' . $file->getClientOriginalExtension();
        }
        return null;
    }
}
