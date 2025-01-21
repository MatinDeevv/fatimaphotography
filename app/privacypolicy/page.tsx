// app/privacy/page.tsx

import React from 'react';
import Navbar from '../components/NavBar';

const PrivacyPolicy: React.FC = () => {
  return (
    
    <div className="container mx-auto px-4 py-8 font-body text-gray-800">
        <Navbar />
      <h1 className="text-4xl font-bold font-body mt-20 text-center mb-6">Privacy Policy for Fatima Photography</h1>

      <p className="text-sm text-gray-500 font-body text-center mb-8">Effective Date: January 21, 2025</p>

      <div className="font-body space-y-6">
        <p>
          At <strong>Fatima Photography</strong>, accessible from <a href="https://fatimaphotography.ca" className="text-blue-600 underline">fatimaphotography.ca</a>, your privacy is important to us. This Privacy Policy outlines the types of personal information we collect, how we use that information, and your rights regarding that information.
        </p>

        <h2 className="text-2xl font-body font-semibold">Information We Collect</h2>
        <p>
          When you visit our website or engage with our services, we may collect the following types of information:
        </p>
        <ul className="list-disc font-body list-inside space-y-2">
          <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and any other personal information you provide when you contact us or fill out forms.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, including your IP address, browser type, pages visited, and time spent on pages.</li>
        </ul>

        <h2 className="text-2xl font-body font-semibold">How We Use Your Information</h2>
        <p>We may use the information we collect in the following ways:</p>
        <ul className="list-disc font-body list-inside space-y-2">
          <li>To provide and maintain our services.</li>
          <li>To communicate with you, including responding to inquiries and sending confirmations.</li>
          <li>To improve our website and services based on user feedback and usage data.</li>
          <li>To send you promotional content, if you have opted in. You may unsubscribe at any time.</li>
        </ul>

        <h2 className="text-2xl font-body font-semibold">Cookies and Tracking Technologies</h2>
        <p>
          Our website may use cookies and similar tracking technologies to enhance user experience. You can configure your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some portions of our website may not be accessible.
        </p>

        <h2 className="text-2xl  font-body font-semibold">Sharing Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties without your consent, except:
        </p>
        <ul className="list-disc font-body list-inside space-y-2">
          <li>To comply with the law or respond to legal requests.</li>
          <li>To protect our rights, property, or safety, or that of our users or others.</li>
          <li>When we engage third-party service providers to help us operate our business and the site or administer activities on our behalf, such as sending newsletters or surveys.</li>
        </ul>

        <h2 className="text-2xl font-body font-semibold">Security of Your Information</h2>
        <p>
          We take reasonable measures to protect the information you provide from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
        </p>

        <h2 className="text-2xl font-body font-semibold">Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc font-body list-inside space-y-2">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of any inaccurate information.</li>
          <li>Request deletion of your personal information under certain circumstances.</li>
          <li>Withdraw consent to the processing of your information at any time.</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the contact details provided below.
        </p>

        <h2 className="text-2xl font-body font-semibold">Third-Party Services</h2>
        <p>
          Our website may contain links to third-party sites that have their own privacy policies. We have no control over, and assume no responsibility for, the content and practices of these sites. We encourage you to review the privacy policies of any third-party sites you visit.
        </p>

        <h2 className="text-2xl font-body font-semibold">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-body font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-disc font-body list-inside space-y-2">
          <li>Email: <a href="mailto:fashamifatemeh@gmail.com" className="text-blue-600 underline">fashamifatemeh@gmail.com</a></li>
          <li>Phone: <a href="tel:+1234567890" className="text-blue-600 underline">+1 234 567 890</a></li>
          <li>Website: <a href="https://fatimaphotography.ca" className="text-blue-600 underline">fatimaphotography.ca</a></li>
        </ul>

        <p>Thank you for visiting Fatima Photography!</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
