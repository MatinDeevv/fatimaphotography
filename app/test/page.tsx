'use client';
import { useState } from 'react';

const TestEmailButton = () => {
  const [status, setStatus] = useState('');

  const sendTestEmail = async () => {
    setStatus('Sending...');
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'pandasmp91@gmail.com',
          message: 'Hi', // Default test message
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Email sent successfully!');
      } else {
        setStatus(`Failed to send email: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={sendTestEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Send Test Email
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default TestEmailButton;
