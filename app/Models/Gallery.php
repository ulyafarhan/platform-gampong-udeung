<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'cover_image',
        'images',
        'activity_date',
    ];

    protected $casts = [
        'images' => 'array',
        'activity_date' => 'date',
    ];
}