export const createWelcomeEmailTemplate = (userName, clientURL) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Chatify</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f4f4f5; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 40px auto; max-width: 600px; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
        .header { background-color: #0ea5e9; padding: 32px; text-align: center; color: #ffffff; }
        .content { padding: 32px; color: #374151; line-height: 1.6; font-size: 16px; }
        .cta-container { text-align: center; margin: 32px 0; }
        .btn { background-color: #0ea5e9; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; }
        .footer { padding: 24px; text-align: center; font-size: 12px; color: #9ca3af; background-color: #f9fafb; }
      </style>
    </head>
    <body>
      <table class="wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table class="main" width="100%" cellpadding="0" cellspacing="0">
              <!-- Content -->
              <tr>
                <td class="content">
                  <p style="margin-top: 0;">Hi <strong>${userName}</strong>,</p>
                  <p>Thank you for registering! Your account is active, and your setup is officially complete.</p>
                  <p>Ready to start chatting? Launch our messaging platform right away to connect with your team, friends, or clients.</p>
                  <div class="cta-container">
                    <a href="${clientURL}" class="btn" target="_blank">Open Chatify Messenger</a>
                  </div>
                  <p>If you have any questions or need assistance getting started, our support team is always here to help.</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td class="footer">
                  <p style="margin: 0 0 8px 0;">© 2026 Chatify. All rights reserved.</p>
                  <p style="margin: 0;"><a href="#" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
