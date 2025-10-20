<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guide extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'requirements',
        'step_by_step',
        'estimated_time',
        'cost',
        'tips',
    ];

    protected $casts = [
        'requirements' => 'array',
    ];
}