<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // DB::table('users')->insert([
        //     'name' => 'Default Admin',
        //     'email' => 'admin@gmail.com',
        //     'phone' => '000000000',
        //     'code' => '42FE43',
        //     'password' => Hash::make('123456789'),
        //     'department' => 'HR',
        //     'role' => 'admin',
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);

        DB::table('users')->insert([
            'name' => 'Default Staff',
            'email' => 'staff@gmail.com',
            'phone' => '111111111',
            'code' => 'ST1234',
            'password' => Hash::make('123456789'),
            'department' => 'IT',
            'role' => 'staff',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->call([
            ActivitySeeder::class,
        ]);
    }
}
