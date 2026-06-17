export interface IVerifyEmailTemplateData {
  username: string
  userId: string
  token: string
}

export const verifyEmailTemplate = (data: IVerifyEmailTemplateData): string => {
  const { username, userId, token } = data

  const link = `https://apologea.com/auth/verify?user=${userId}&token=${token}`

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }

    .header h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .header p {
      font-size: 14px;
      opacity: 0.9;
    }

    .content {
      padding: 40px 30px;
    }

    .greeting {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
      color: #2d3748;
    }

    .message {
      font-size: 15px;
      color: #4a5568;
      margin-bottom: 25px;
      line-height: 1.7;
    }

    .button-container {
      text-align: center;
      margin: 30px 0;
    }

    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      transition: transform 0.2s ease;
    }

    .button:hover {
      transform: translateY(-2px);
    }

    .link-fallback {
      text-align: center;
      margin-top: 15px;
      font-size: 13px;
      color: #718096;
    }

    .link-fallback a {
      color: #667eea;
      word-break: break-all;
    }

    .divider {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 30px 0;
    }

    .footer {
      background-color: #f7fafc;
      padding: 25px 30px;
      text-align: center;
    }

    .footer p {
      font-size: 13px;
      color: #718096;
      line-height: 1.6;
    }

    .footer .company-name {
      font-weight: 600;
      color: #4a5568;
    }

    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }

      .content {
        padding: 30px 20px;
      }

      .header h1 {
        font-size: 20px;
      }

      .button {
        padding: 12px 24px;
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to Apologea!</h1>
      <p>Almost there — verify your email address</p>
    </div>

    <div class="content">
      <div class="greeting">Hello ${username}!</div>

      <div class="message">
        Thank you for signing up! We're excited to have you join our community.
        To complete your registration and activate your account, please verify your
        email address by clicking the button below.
      </div>

      <div class="button-container">
        <a href="${link}" class="button">Verify My Email</a>
      </div>

      <div class="link-fallback">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${link}">${link}</a>
      </div>

      <hr class="divider">

      <div class="message" style="font-size: 13px; color: #718096;">
        This verification link will expire in 24 hours. If you didn't create an account
        with us, you can safely ignore this email.
      </div>
    </div>

    <div class="footer">
      <p>
        This email was sent by <span class="company-name">Apologea</span>.<br>
        If you have any questions, feel free to contact our support team.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
