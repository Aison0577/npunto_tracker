<?php

namespace App\Services;

use App\Models\ActivityLog;


class ActivityLogService{
    public static function newLog(int $activityId,int $userId,string $remarks,string $old_status, string $new_status,string $action_type)
    {
        // Store edit reason as a log entry before updating
        ActivityLog::create([
            'activity_id' => $activityId,
            'user_id'     => $userId,
            'old_status'  => $old_status,
            'new_status'  => $new_status,
            'remarks'     => $remarks,
            'log_date'    => now(),
            'action_type' => $action_type
        ]);

        return [
            'success' => true
        ];

    }
}
