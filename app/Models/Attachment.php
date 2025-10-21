<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attachment extends Model
{
    protected $fillable = [
        'event_id',
        'name',
        'path',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}