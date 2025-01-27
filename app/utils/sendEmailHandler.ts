const sendEmail = async (name: string, email: string, message: string) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }
  
      return { success: true, message: 'Email sent successfully!' };
    } catch (error: any) {
      console.error('Error sending email:', error.message);
      return { success: false, message: error.message };
    }
  };
  
  export default sendEmail;
  