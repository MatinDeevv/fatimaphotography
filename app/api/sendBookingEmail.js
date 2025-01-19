// api/sendBookingEmail.js
import nodemailer from 'nodemailer';

// This function will handle sending the email
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, phone, eventType, date, status, submittedAt, referral, specialRequests } = req.body;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Can use Gmail for this example
      auth: {
        user: 'dminphotography@gmail.com', // Replace with your email
        pass: 'kghuarukqrtzknvy',    // Replace with your app password
      },
    });

    // Set up email options
    const mailOptions = {
      from: 'dminphotography@gmail.com', // Sender address
      to: 'pandasmp91@gmail.com', // Replace with the admin's email
      subject: `New Booking: ${eventType}`, // Subject line
      text: `
        A new booking has been made. Here are the details:

        Full Name: ${fullName}
        Email: ${email}
        Phone: ${phone}
        Event Type: ${eventType}
        Date: ${date}
        Status: ${status}
        Submitted At: ${submittedAt}
        Referral: ${referral || 'None'}
        Special Requests: ${specialRequests || 'None'}
      `,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
