export interface IVerificationSuccessTemplateData {
  username: string
}

export const verificationSuccessTemplate = (data: IVerificationSuccessTemplateData): string => {
  const { username } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified Successfully</title>
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
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      color: #ffffff;
      padding: 40px 20px;
      text-align: center;
    }

    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .checkmark {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .checkmark svg {
      width: 40px;
      height: 40px;
      stroke: #ffffff;
      stroke-width: 3;
      fill: none;
    }

    .content {
      padding: 40px 30px;
    }

    .greeting {
      font-size: 20px;
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

    .info-box {
      background-color: #f0fff4;
      border: 1px solid #c6f6d5;
      border-radius: 6px;
      padding: 20px;
      margin: 25px 0;
    }

    .info-box h3 {
      color: #276749;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .info-box p {
      color: #2f855a;
      font-size: 14px;
      line-height: 1.6;
    }

    .button-container {
      text-align: center;
      margin: 30px 0;
    }

    .button {
      display: inline-block;
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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

    .footer {
      background-color: #f7fafc;
      padding: 25px 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }

    .footer p {
      font-size: 13px;
      color: #718096;
      line-height: 1.5;
    }

    .footer a {
      color: #4a5568;
      text-decoration: none;
    }

    .social-links {
      margin-top: 15px;
    }

    .social-links a {
      display: inline-block;
      margin: 0 8px;
      color: #718096;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verified!</h1>
      <p>Your account is now fully activated</p>
    </div>

    <div class="content">
      <div class="greeting">Hi ${username}!</div>

      <div class="message">
        Great news! Your email address has been successfully verified. Your account is now fully activated and you have access to all features of our platform.
      </div>

      <div class="info-box">
        <p>
          • You can now explore all features of the platform<br>
          • Join discussions and connect with other members<br>
          • Share your thoughts and insights with the community
        </p>
      </div>

      <div class="message">
        Thank you for joining our community. We're excited to have you on board!
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}
