<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'activity_id',
        'user_id',
        'old_status',
        'new_status',
        'remarks',
        'log_date',
        'action_type'
    ];

    protected $casts = [
        'log_date' => 'datetime',
    ];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

