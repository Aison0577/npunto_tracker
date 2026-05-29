<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Verification Code</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        h2 {
            color: #009688;
            font-size: 28px;
            letter-spacing: 1px;
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
        <p>Hello,</p>

        <p>Your verification code for <span class="brand">Study</span> is:</p>

        <h2>{{ $code }}</h2>

        <p>This code will expire in <strong>10 minutes</strong>. Please use it promptly to complete your verification.</p>

        <p>If you did not request this code, please ignore this email.</p>

        <p>Thank you for choosing <span class="brand">SG</span>.</p>

        <div class="footer">
            &copy; {{ date('Y') }} SG. All rights reserved.
        </div>
    </div>
</body>
</html>
