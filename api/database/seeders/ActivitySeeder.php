<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ActivitySeeder extends Seeder
{
    public function run(): void
    {
        $activities = [
            'Daily SMS count in comparison to SMS count from logs',
            'Monitor API response times and flag anomalies',
            'Check failed transaction logs and escalate issues',
            'Review system uptime report for the past 24 hours',
            'Verify backup completion status for all databases',
            'Check email delivery queue and resolve stuck messages',
            'Review error logs from the payment gateway',
            'Monitor CPU and memory usage on production servers',
            'Confirm nightly batch jobs completed successfully',
            'Check mobile app crash reports from Firebase',
            'Review pending support tickets and assign to team',
            'Validate daily transaction reconciliation report',
            'Check SMS gateway delivery rate and flag failures',
            'Review security alerts from intrusion detection system',
            'Confirm scheduled maintenance window completed',
            'Monitor disk space usage across all servers',
            'Check third-party API availability (Paystack, Arkesel)',
            'Review database query performance report',
            'Validate user registration and login success rates',
            'Check notification delivery rate (push and email)',
            'Review daily active users report',
            'Monitor network latency between services',
            'Confirm data sync between staging and production',
            'Check SSL certificate expiry status',
            'Review firewall rule changes from the past 24 hours',
            'Validate OTP delivery success rate',
            'Check webhook retry queue for failed deliveries',
            'Review application deployment logs',
            'Confirm scheduled reports were sent to stakeholders',
            'Check load balancer health and traffic distribution',
        ];

        $statuses = ['pending', 'completed', 'cancelled'];

        $records = [];

        foreach ($activities as $index => $title) {
            $scheduledFor = Carbon::now()
                ->addDays(rand(0, 14))
                ->setHour(rand(7, 17))
                ->setMinute(rand(0, 59))
                ->setSecond(0);

            $records[] = [
                'title'        => $title,
                'description'  => "Routine check: {$title}. Ensure all metrics are within acceptable thresholds and escalate any anomalies to the relevant team lead immediately.",
                'created_by'   => 1,
                'scheduled_for'=> $scheduledFor,
                // 'status'       => $statuses[array_rand($statuses)],
                'status'       => 'pending',
                'deleted_at'   => null,
                'created_at'   => $scheduledFor,
                'updated_at'   => $scheduledFor,
            ];
        }

        DB::table('activities')->insert($records);
    }
}
