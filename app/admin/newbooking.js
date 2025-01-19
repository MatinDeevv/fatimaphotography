// /app/admin/newbooking.js
import { useEffect } from 'react';
import { supabase } from '@/app/admin/supabaseClient'; // Adjust the import path based on your setup
import axios from 'axios';

const NewBookingListener = () => {
  useEffect(() => {
    const listenForNewBookings = async () => {
      // Listen for inserts in the bookings table
      const { data, error } = await supabase
        .from('bookings')
        .on('INSERT', (payload) => {
          console.log('New booking inserted:', payload.new);
          // Call the function to send email when a new booking is added
          sendEmail(payload.new);
        })
        .subscribe();

      if (error) {
        console.error('Error in real-time subscription:', error);
      }
    };

    listenForNewBookings();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeSubscription();
    };
  }, []);

  const sendEmail = async (booking) => {
    const emailData = {
      to: 'pandasmp91@gmail.com', // Admin email
      from: 'noreply@example.com', // Your sender email
      subject: `New Booking: ${booking.eventType}`,
      text: `
        A new booking has been made! Here are the details:
        
        Full Name: ${booking.fullName}
        Email: ${booking.email}
        Phone: ${booking.phone}
        Event Type: ${booking.eventType}
        Date: ${booking.date}
        Status: ${booking.status}
        Submitted At: ${booking.submittedAt}
        Referral: ${booking.referral || 'None'}
        Special Requests: ${booking.specialRequests || 'None'}
      `,
    };

    try {
      // Send email using SendGrid (Hardcoded API Key)
      await axios.post('https://api.sendgrid.com/v3/mail/send', emailData, {
        headers: {
          Authorization: `Bearer YOUR_SENDGRID_API_KEY`, // Hardcoded API Key
          'Content-Type': 'application/json',
        },
      });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return null;
};

export default NewBookingListener;
