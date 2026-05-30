# Npontu Activity Tracker

A full-stack activity tracking and shift handover system built for the **Npontu Technologies Applications Support Team**.

Built with **Laravel 12** (REST API) + **React + Vite** (SPA).

---

## Table of Contents

- [Quick Start](#quick-start)
- [Backend Setup (Laravel)](#backend-setup-laravel)
- [Frontend Setup (React)](#frontend-setup-react)
- [Default Credentials](#default-credentials)
- [User Roles](#user-roles)
- [User Flow](#user-flow)
- [Pages & Tabs by Role](#pages--tabs-by-role)
- [Role-Based Actions](#role-based-actions)

---

## Quick Start

```bash
git clone https://github.com/aison@0577/npunto_tracker
cd npunto_tracker
```

Then follow the Backend and Frontend setup steps below.

---

## Backend Setup (Laravel)

### Requirements
- PHP >= 8.2
- Composer
- MySQL

### Steps

```bash
# 1. Navigate to api
cd api

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
cp .env.example .env

# 4. Open .env and set your database credentials
DB_DATABASE=npontu_tracker
DB_USERNAME=root
DB_PASSWORD=your_password

# 5. Generate application key
php artisan key:generate

# 6. Run migrations and seed default data
php artisan migrate --seed

# 7. Start the API server
php artisan serve
# Runs on http://localhost:8000
```

---

## Frontend Setup (React)

### Requirements
- Node.js >= 18
- npm >= 9

### Steps

```bash
# 1. Navigate to frontend
cd front

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Open .env and set your API base URL
VITE_API_BASE_URL=http://localhost:8000
VITE_CRYPT_SECRET_KEY=your_Secret_Key

# 5. Start the dev server
npm run dev
# Runs on http://localhost:5173
```

> The Vite dev server proxies all `/api` requests to Laravel automatically.

---

## Default Credentials

These accounts are created automatically when you run `php artisan migrate --seed`.

| Role  | Staff Code | Password  | Name          |
|-------|------------|-----------|---------------|
| Admin | `42FE43`   | `123456789` | Default Admin |

> **Login uses Staff Code, not email.** Additional team members are created by the Admin from the Team page.

---

## User Roles

| Role    | Description                                                  |
|---------|--------------------------------------------------------------|
| `admin` | Full access — creates activities, manages team, views reports |
| `staff` | Can create and view activities ,log status updates with remarks and view logs on an activity  |

---

## User Flow

### Admin Flow
```
Login → Dashboard
  ├── View today's activity summary (analysis sidebar)
  ├── Create new activity (title, description, schedule)
  ├── View all activities (search + filter by status/date)
  ├── Open activity details → edit or view full log history
  ├── Daily Handover View → see all updates per day, identify pending handovers
  ├── Reports → run date-range queries, filter by status/action type
  └── Team → add or remove staff members
```

### Staff Flow
```
Login → Dashboard (Task Board)
  ├── View today's scheduled activities
  ├── Create new activity (title, description, schedule)
  ├── Click "Update" on any activity
  │     ├── Select new status: Completed / Pending / Cancelled
  │     └── Enter remarks (required)
  └── Daily View → read-only handover view for any date and logs
```

---

## Pages & Tabs by Role

| Page                | Admin | Staff | Description                                              |
|---------------------|-------|-------|----------------------------------------------------------|
| Dashboard           | ✅    | ✅    | Today's activities + analysis sidebar                    |
| New Activity        | ✅    | ✅    | Create a new scheduled activity                          |
| All Activities      | ✅    | ❌    | Full activity list with search, status and date filters  |
| Activity Details    | ✅    | ✅    | Title, schedule, creator info, full log timeline         |
| Daily Handover View | ✅    | ✅    | All activity updates for a selected date, handover alerts|
| Reports             | ✅    | ❌    | Date-range log query, summary stats, action type filter  |
| Team                | ✅    | ❌    | Add/remove team members, assign roles and staff codes    |

---

## Role-Based Actions

### Activity Management

| Action                        | Admin | Staff |
|-------------------------------|-------|-------|
| Create activity               | ✅    | ✅    |
| Edit activity (with reason)   | ✅    | ✅    |
| Cancel activity               | ✅    | ✅    |
| View activity details         | ✅    | ✅    |

### Activity Logs

| Action                              | Admin | Staff |
|-------------------------------------|-------|-------|
| Log status update + remarks         | ✅    | ✅    |
| View full log timeline              | ✅    | ✅    |
| View daily handover summary         | ✅    | ✅    |
| Run date-range reports              | ✅    | ❌    |

### Team Management

| Action              | Admin | Staff |
|---------------------|-------|-------|
| Add team member     | ✅    | ❌    |
| Remove team member  | ✅    | ❌    |
| Assign roles        | ✅    | ❌    |

---

## Activity Log Types

Every status update creates a log entry with an `action_type`:

| Action Type  | When it's created                          |
|--------------|--------------------------------------------|
| `completed`  | Staff marks activity as completed   (with remarks)       |
| `cancelled`  | Activity is cancelled           (with remarks)           |
| `editted`    | Staff edits activity details (with reason) |

---

## API Overview

| Method | Endpoint                     | Auth   | Description                   |
|--------|------------------------------|--------|-------------------------------|
| POST   | `/api/auth/login`            | Public | Login with staff code         |
| POST   | `/api/auth/logout`           | ✅     | Logout                        |
| GET    | `/api/activities`            | ✅     | List activities (filter by date) |
| POST   | `/api/activities`            | Admin  | Create activity               |
| PUT    | `/api/activities/{id}`       | Admin  | Edit activity                 |
| DELETE | `/api/activities/{id}`       | Admin  | Cancel activity               |
| GET    | `/api/activities/{id}`       | ✅     | Activity details + logs       |
| POST   | `/api/logs`                  | ✅     | Log a status update           |
| GET    | `/api/logs/daily`            | ✅     | Daily handover view           |
| GET    | `/api/logs/report`           | Admin  | Date-range report             |
| GET    | `/api/users`                 | Admin  | List team members             |
| POST   | `/api/users`                 | Admin  | Add team member               |
| DELETE | `/api/users/{id}`            | Admin  | Remove team member            |

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | Laravel 12, Sanctum, MySQL          |
| Frontend | React 18, Vite, TanStack Query      |
| UI       | Tailwind CSS, MUI, Hugeicons        |
| Auth     | Laravel Sanctum ( Cookie-Based )      |
| HTTP     | Axios with interceptor error handling |

---
## Platform Screenshots
![Screenshot](shots/Screenshot%20(365).png)
![Screenshot](shots/Screenshot%20(366).png)
![Screenshot](shots/Screenshot%20(367).png)
![Screenshot](shots/Screenshot%20(368).png)
![Screenshot](shots/Screenshot%20(369).png)
![Screenshot](shots/Screenshot%20(370).png)
![Screenshot](shots/Screenshot%20(371).png)
![Screenshot](shots/Screenshot%20(372).png)
![Screenshot](shots/Screenshot%20(373).png)
![Screenshot](shots/Screenshot%20(374).png)

## Support

For issues contact the 0593006915.
