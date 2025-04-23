const nodemailer = require('nodemailer');

// Create transporter only if email credentials are provided
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials are not configured in .env file');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.error('Email transporter could not be created. Check your .env configuration.');
      return false;
    }

    console.log('Attempting to send email to:', email);
    
    const info = await transporter.sendMail({
      from: `"Dinner Guide" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification - Dinner Guide',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Dinner Guide!</h2>
          <p>Please verify your email address by entering the following code:</p>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
            <strong>${verificationCode}</strong>
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't create an account with Dinner Guide, please ignore this email.</p>
        </div>
      `,
    });

    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to: email,
      response: info.response
    });
    
    return true;
  } catch (error) {
    console.error('Detailed email error:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
}; 