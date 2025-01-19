import { sendEmail } from '../Services/emailService';

// API route to handle new bookings
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      fullName,
      email,
      phone,
      eventType,
      customEvent,
      date,
      status,
      submittedAt,
      referral,
      specialRequests,
    } = req.body;

    // Admin emails to notify
    const adminEmails = ['fashamifatemeh@gmail.com'];

    // Allow dynamic subject
    const subject = `New Booking: ${eventType} (${status})`;

    // Construct email body with all the fields
    const body = `
      A new booking has been made.

      Full Name: ${fullName}
      Email: ${email}
      Phone: ${phone}
      Event Type: ${eventType}
      Custom Event: ${customEvent}
      Date: ${date}
      Status: ${status}
      Submitted At: ${submittedAt}
      Referral: ${referral}
      Special Requests: ${specialRequests}
    `;

    try {
      // Notify each admin
      for (const adminEmail of adminEmails) {
        await sendEmail(adminEmail, subject, body);
      }

      res.status(200).json({ message: 'Admins notified about the new booking!' });
    } catch (error) {
      console.error('Error notifying admins:', error.message);
      res.status(500).json({ error: 'Failed to notify admins' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
