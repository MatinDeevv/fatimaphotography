import { sendEmail } from '../../Services/emailService';

// API route to handle new bookings
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Destructure incoming booking details from the request body
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

    // Validate required fields
    if (!fullName || !email || !eventType || !date) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Admin emails to notify
    const adminEmails = ['pandasmp91@gmail.com']; // Add more emails if needed

    // Allow dynamic subject
    const subject = `📸 New Booking: ${eventType} (${status || 'Pending'})`;

    // Construct email body with all booking details
    const body = `
      A new booking has been received.

      🔹 **Full Name:** ${fullName}
      🔹 **Email:** ${email}
      🔹 **Phone:** ${phone || 'Not provided'}
      🔹 **Event Type:** ${eventType}
      🔹 **Custom Event:** ${customEvent || 'Not specified'}
      🔹 **Date:** ${date}
      🔹 **Status:** ${status || 'Pending'}
      🔹 **Submitted At:** ${submittedAt || new Date().toISOString()}
      🔹 **Referral:** ${referral || 'Not specified'}
      🔹 **Special Requests:** ${specialRequests || 'None'}

    `;

    // Log booking details for debugging
    console.log('Booking Details:', { fullName, email, phone, eventType, date });

    // Send an email to each admin
    for (const adminEmail of adminEmails) {
      await sendEmail(adminEmail, subject, body);
    }

    // Respond with success
    return res.status(200).json({ message: 'Admins notified successfully!' });
  } catch (error) {
    // Catch and log errors
    console.error('Error notifying admins:', error.message);
    return res.status(500).json({ error: 'Failed to notify admins. Please try again.' });
  }
}
