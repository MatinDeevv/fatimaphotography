import { sendEmail } from '../../Services/emailService';

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body

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
      specialRequests
    } = body;

    // Validate required fields
    if (!fullName || !email || !eventType || !date) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
        status: 400
      });
    }

    // Admin emails to notify
    const adminEmails = ['pandasmp91@gmail.com'];

    // Construct email content
    const subject = `📸 New Booking: ${eventType} (${status || 'Pending'})`;
    const bodyContent = `
      A new booking has been received.

      🔹 Full Name: ${fullName}
      🔹 Email: ${email}
      🔹 Phone: ${phone || 'Not provided'}
      🔹 Event Type: ${eventType}
      🔹 Custom Event: ${customEvent || 'Not specified'}
      🔹 Date: ${date}
      🔹 Status: ${status || 'Pending'}
      🔹 Submitted At: ${submittedAt || new Date().toISOString()}
      🔹 Referral: ${referral || 'Not specified'}
      🔹 Special Requests: ${specialRequests || 'None'}
    `;

    // Send email to each admin
    for (const adminEmail of adminEmails) {
      await sendEmail(adminEmail, subject, bodyContent);
    }

    // Respond with success
    return new Response(JSON.stringify({ message: 'Admins notified successfully!' }), {
      status: 200
    });
  } catch (error) {
    console.error('Error notifying admins:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to notify admins.' }), {
      status: 500
    });
  }
}
