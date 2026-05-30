<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivityLogController extends Controller
{

    /**
     * GET /api/logs/report?from=YYYY-MM-DD&to=YYYY-MM-DD&activity_id=&user_id=&status=
     * Custom date range reporting.
     */
    public function report(Request $request): JsonResponse
    {
        $request->validate([
            'from' => 'required|date',
            'to'   => 'required|date|after_or_equal:from',
        ]);

        $query = ActivityLog::with([
            'activity:id,title,scheduled_for,status',
            'user:id,name,department,avatar',
        ])->whereBetween(DB::raw('DATE(log_date)'), [$request->from, $request->to]);

        if ($request->filled('activity_id')) {
            $query->where('activity_id', $request->activity_id);
        }
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }
        if ($request->filled('status')) {
            $query->where('new_status', $request->status);
        }

        $logs = $query->orderBy('log_date', 'desc')->get();

        return response()->json([
            'success' => true,
            'from'    => $request->from,
            'to'      => $request->to,
            'summary' => [
                'total'     => $logs->count(),
                'completed' => $logs->where('new_status', 'completed')->count(),
                'pending'   => $logs->where('new_status', 'pending')->count(),
                'cancelled' => $logs->where('new_status', 'cancelled')->count(),
            ],
            'logs'    => $logs,
        ]);
    }

    /**
     * GET /api/logs/history/{activity}
     * Full audit trail for a single activity.
     */
    public function history(Activity $activity): JsonResponse
    {
        $logs = $activity->logs()
            ->with('user:id,name,department,avatar')
            ->orderBy('log_date', 'desc')
            ->get();

        return response()->json([
            'success'  => true,
            'activity' => $activity->load('creator:id,name,department'),
            'logs'     => $logs,
        ]);
    }
}

























// /**
    //  * GET /api/logs/daily?date=YYYY-MM-DD
    //  * Returns ALL activities for a given date with every log entry that day.
    //  * Designed for shift handover — shows who did what and when.
    //  */
    // public function daily(Request $request): JsonResponse
    // {
    //     $date = $request->query('date', now()->toDateString());

    //     $activities = Activity::with([
    //         'creator:id,name,department',
    //         'logs' => function ($q) use ($date) {
    //             $q->whereDate('log_date', $date)
    //               ->with('user:id,name,department,avatar')
    //               ->orderBy('log_date', 'asc');
    //         },
    //     ])
    //     ->whereDate('scheduled_for', $date)
    //     ->orderBy('scheduled_for', 'asc')
    //     ->get();

    //     // Flag activities still pending at end of day for handover
    //     $handoverNeeded = $activities->filter(
    //         fn($a) => $a->status === 'pending'
    //     )->values();

    //     return response()->json([
    //         'success'        => true,
    //         'date'           => $date,
    //         'activities'     => $activities,
    //         'handover_count' => $handoverNeeded->count(),
    //         'handover_items' => $handoverNeeded->pluck('title'),
    //     ]);
    // }

