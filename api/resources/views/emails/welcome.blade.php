<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to Oyalo</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        h2 {
            color: #1D2D36;
        }

        p {
            color: #333333;
            font-size: 16px;
        }

        .footer {
            margin-top: 30px;
            font-size: 13px;
            color: #888888;
            text-align: center;
        }

        .brand {
            color: #009688;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello {{ ucfirst($user->name) }},</h2>

        <p>We're excited to let you know that your <span class="brand">Oyalo</span> account has been successfully created and activated.</p>

        <p>You're all set to start booking trips and experiencing the hustle-free travel only Oyalo provides.</p>

        <p>If you have any questions or need support, feel free to reach out. We're here to help!</p>

        <p>Thank you for choosing <span class="brand">Oyalo</span>.</p>

        <div class="footer">
            &copy; {{ date('Y') }} Oyalo. All rights reserved.
        </div>
    </div>
</body>
</html>
