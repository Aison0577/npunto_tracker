<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'title',
        'description',
        'created_by',
        'scheduled_for',
        'status',
    ];

    protected $casts = [
        'scheduled_for' => 'datetime',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function logs()
    {
        return $this->hasMany(ActivityLog::class)->orderBy('log_date', 'desc');
    }

    public function latestLog()
    {
        return $this->hasOne(ActivityLog::class)->latestOfMany('log_date');
    }
}
