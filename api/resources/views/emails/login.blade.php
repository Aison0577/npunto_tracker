<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Notification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #333;">Hello {{ $user->name }},</h2>

        <p style="font-size: 16px; color: #555;">
            We noticed a new sign-in to your <strong>Oyalo</strong> account. If this was you, there’s nothing else you need to do.
        </p>

        <p style="font-size: 16px; color: #555;">
            If you didn’t sign in recently, please secure your account by resetting your password immediately.
        </p>

        <div style="margin: 30px 0;">
            <a href="{{ url('/reset-password') }}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset Your Password</a>
        </div>

        <p style="font-size: 14px; color: #888;">Time: {{ now()->format('F j, Y, g:i A') }}</p>
        <p style="font-size: 14px; color: #888;">If this was you, feel free to ignore this message.</p>

        <p style="margin-top: 40px; font-size: 14px; color: #888;">– The Oyalo Team</p>
    </div>
</body>
</html>
