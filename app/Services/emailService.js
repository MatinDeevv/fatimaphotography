import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dminphotography@gmail.com', // Replace with your Gmail address
    pass: 'ngav xtik haos lmeb',  // Replace with the App Password shown in your screenshot
  },
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'dminphotography@gmail.com',
    to,
    subject,
    text,
  };



  

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
