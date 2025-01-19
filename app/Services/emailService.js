import nodemailer from 'nodemailer';

// Configure the transporter with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dminphotography@gmail.com', // Your Gmail address
    pass: 'ngavxtikhaoslmeb' // Your Gmail App Password
  }
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'dminphotography@gmail.com', // Sender's email address
    to, // Recipient's email
    subject, // Email subject
    text // Email body (plain text)
  };

  try {
    await transporter.sendMail(mailOptions); // Send the email
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
    throw error; // Re-throw the error for the API route to handle
  }
};
