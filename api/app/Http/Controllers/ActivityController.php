<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityLog;
use App\Services\ActivityLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivityController extends Controller
{
    private ActivityLogService $activityLog;

    public function __construct()
    {
        $this->activityLog = new ActivityLogService();
    }

    /**
     * GET /api/activities
     * Returns all activities with creator + latest log.
     * Supports ?date=YYYY-MM-DD to filter by scheduled date (for task board).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Activity::with([
            'creator:id,name,department,avatar,email',
            'latestLog.user:id,name,avatar'
            ])
            ->withCount('logs')
            ->orderBy('scheduled_for', 'asc');

        // Filter by date if provided (for daily task board)
        if ($request->filled('date')) {
            $query->whereDate('scheduled_for', $request->date);
        }

        $activities = $query->get();

        return response()->json([
            'success'    => true,
            'activities' => $activities,
        ]);
    }

    /**
     * POST /api/activities
     * Team member creates a new activity.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'         => 'required|string',
            'description'   => 'required|string',
            'scheduled_for' => 'required|date',
        ]);

        try {
            // Check for exact time conflict
            $exists = Activity::where('scheduled_for', $data['scheduled_for'])->exists();
            if ($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Team already has a scheduled activity at this time.',
                ], 400);
            }

            DB::beginTransaction();

            $activity = Activity::create([
                'title'         => $data['title'],
                'description'   => $data['description'],
                'scheduled_for' => $data['scheduled_for'],
                'created_by'    => auth()->id(),
                'status'        => 'pending',
            ]);

            DB::commit();

            return response()->json([
                'success'  => true,
                'message'  => 'Activity successfully created',
                'activity' => $activity->load('creator:id,name,department'),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create activity. Please try again.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * GET /api/activities/{id}
     * Single activity with full log history.
     */
    public function show(Activity $activity): JsonResponse
    {
        $activity->load([
            'creator:id,name,department,avatar',
            'logs.user:id,name,department,avatar',
        ]);

        return response()->json([
            'success'  => true,
            'activity' => $activity,
        ],200);
    }


    /**
     * PUT /api/activities/{id}
     * Update for changing details of activity .
     */
    public function update(Request $request, Activity $activity): JsonResponse
    {
        $data = $request->validate([
            'title'         => 'sometimes|string',
            'description'   => 'sometimes|string',
            'scheduled_for' => 'sometimes|date',
            'edit_reason'   => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            // Store edit reason as a log entry before updating
            $logResponse = $this->activityLog->newLog(
                $activity->id,
                auth()->id(),
                '✏️ Edit: ' . $data['edit_reason'],
                $activity->status,
                $activity->status,
                'editted'
            );

            if(!$logResponse)
            {
                return response()->json([
                    'success'  => false,
                    'message'  => 'Activity logging failed updated',
                ],500);
            }

            $activity->update(collect($data)->except('edit_reason')->toArray());

            DB::commit();

            return response()->json([
                'success'  => true,
                'message'  => 'Activity updated',
                'activity' => $activity->fresh('creator:id,name,department'),
            ],200);
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json([
                'success'  => false,
                'error' => $th->getMessage(),
                'message'  => 'Error occured updating activity.',
            ],500);
        }

    }

    /**
     * PATCH /api/activities/{id}/status
     * Status Updates on activity.
     */
    public function updateStatus(Request $request, Activity $activity): JsonResponse
    {
        $data = $request->validate([
            'status'   => 'required|in:pending,completed,cancelled',
            'remarks' => 'required|string'
        ]);

        \Log::info($request);

        try {
            DB::beginTransaction();

            $old_status = $activity->status;

            if($data['status'] === $old_status)
            {
                return response()->json([
                    'success'  => true,
                    'message'  => 'No Activity update. Nothing new happening',
                ],200);
            }

            $activity->update([
                'status' => $data['status']
            ]);

            $logResponse = $this->activityLog->newLog(
                $activity->id,
                auth()->id(),
                $data['remarks'],
                $old_status,
                $data['status'],
                $data['status']
            );

            if(!$logResponse)
            {
                return response()->json([
                    'success'  => false,
                    'message'  => 'Activity logging failed updated',
                ],500);
            }

            DB::commit();


            return response()->json([
                'success'  => true,
                'message'  => 'Activity updated',
                'activity' => $activity->fresh('creator:id,name,department'),
            ],200);
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json([
                'success'  => false,
                'error' => $th->getMessage(),
                'message'  => 'Error occured updating activity status.',
            ],500);
        }

    }

    /**
     * DELETE /api/activities/{id}
     * Soft-cancel: sets status to cancelled (admin only).
    */
    public function destroy(Request $request, Activity $activity): JsonResponse
    {
        $data = $request->validate([
            'remarks' => 'required|string'
        ]);

        $old_status = $activity->status;

        $activity->update(['status' => 'cancelled']);

        $logResponse = $this->activityLog->newLog(
            $activity->id,
            auth()->id(),
            $data['remarks'],
            $old_status,
            $activity['status']
        );

        if(!$logResponse)
        {
            return response()->json([
                'success'  => false,
                'message'  => 'Activity logging failed updated',
            ],500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Activity cancelled',
        ]);
    }
}
