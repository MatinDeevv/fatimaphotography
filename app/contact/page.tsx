'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '@/app/components/NavBar';
// Type Definitions
type FormDataKeys =
  | 'fullName'
  | 'email'
  | 'phone'
  | 'date'
  | 'referral'
  | 'specialRequests'
  | 'eventType'
  | 'customEvent';

type FormDataType = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  referral: string;
  specialRequests: string;
  eventType: string;
  customEvent: string;
  [key: string]: string | boolean;
};

interface SEOData {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  siteName: string;
  contact: {
    website: string;
    phone: string;
    email: string;
    social: {
      facebook: string;
      instagram: string;
      twitter: string;
      ogImage: string;
      twitterCard: string;
    };
  };
  structuredData: Record<string, unknown>;
}

export default function Booking() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    referral: '',
    specialRequests: '',
    eventType: '',
    customEvent: ''
  });
  const [eventSpecificQuestions, setEventSpecificQuestions] = useState<any[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [seoData, setSeoData] = useState<SEOData>({
    defaultTitle: 'Default Title',
    defaultDescription: 'Default Description',
    keywords: ['default', 'keywords'],
    siteName: 'Your Site Name',
    contact: {
      website: 'https://yourwebsite.com',
      phone: '123-456-7890',
      email: 'info@yourwebsite.com',
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        ogImage: '/default-og-image.jpg',
        twitterCard: 'summary_large_image'
      }
    },
    structuredData: {}
  });

  const commonQuestions = [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      placeholder: 'Your Full Name',
      required: true
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Your Email',
      required: true
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'text',
      placeholder: 'Your Phone Number',
      required: true
    },
    {
      label: 'Date',
      name: 'date',
      type: 'date',
      placeholder: '',
      required: true
    },
    {
      label: 'Referral Source',
      name: 'referral',
      type: 'text',
      placeholder: 'How did you hear about us?'
    },
    {
      label: 'Special Requests',
      name: 'specialRequests',
      type: 'textarea',
      placeholder: 'Any special requests?'
    }
  ];

  const questionsByEventType: { [key: string]: any[] } = {
    wedding: [
      {
        label: 'Wedding Theme',
        name: 'weddingTheme',
        type: 'text',
        placeholder: 'E.g., Rustic, Modern'
      },
      {
        label: 'Is it an indoor or outdoor wedding?',
        name: 'weddingLocationType',
        type: 'text',
        placeholder: 'Indoor/Outdoor'
      }
    ],
    engagement: [
      {
        label: 'Preferred Style',
        name: 'engagementStyle',
        type: 'text',
        placeholder: 'E.g., Casual, Formal'
      }
    ],
    portrait: [
      {
        label: 'Preferred Backdrop',
        name: 'portraitBackdrop',
        type: 'text',
        placeholder: 'E.g., Natural, Studio'
      }
    ],
    corporate: [
      {
        label: 'Event Purpose',
        name: 'corporatePurpose',
        type: 'text',
        placeholder: 'E.g., Seminar, Product Launch'
      }
    ]
  };

  // Fetch SEO data
  useEffect(() => {
    async function fetchSEO() {
      try {
        const response = await fetch('/seo.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch SEO data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setSeoData(data);
      } catch (err) {
        console.error('Error loading SEO data:', err);
      }
    }
    fetchSEO();
  }, []);

  // Update Event-Specific Questions
  useEffect(() => {
    const questions = questionsByEventType[formData.eventType] || [];
    setEventSpecificQuestions(questions);
  }, [formData.eventType]);

  // Fetch Random Background Image
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const images = await response.json();
        if (Array.isArray(images) && images.length > 0) {
          const randomImage = images[Math.floor(Math.random() * images.length)];
          setBackgroundImage(`/pictures-gallery/${randomImage}`);
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setBackgroundImage('/pictures-gallery/family.jpg');
      }
    }
    fetchImages();
  }, []);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue
    }));
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedBookings = JSON.parse(localStorage.getItem('bookingsList') || '[]');
    const updatedBookings = [...storedBookings, { ...formData, id: Date.now(), status: 'pending' }];
    localStorage.setItem('bookingsList', JSON.stringify(updatedBookings));
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      date: '',
      referral: '',
      specialRequests: '',
      eventType: '',
      customEvent: ''
    });
    alert('Thank you for booking! We’ll be in touch soon.');
  };

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>{seoData.defaultTitle}</title>
        <meta name="description" content={seoData.defaultDescription} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        <meta property="og:title" content={seoData.defaultTitle} />
        <meta property="og:description" content={seoData.defaultDescription} />
        <meta property="og:image" content={seoData.contact.social.ogImage} />
        <meta property="og:url" content={seoData.contact.website} />
        <meta name="twitter:card" content={seoData.contact.social.twitterCard} />
        <meta name="twitter:title" content={seoData.defaultTitle} />
        <meta name="twitter:description" content={seoData.defaultDescription} />
        <link rel="canonical" href={seoData.contact.website} />
        <script type="application/ld+json">{JSON.stringify(seoData.structuredData)}</script>
      </Head>

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-gray-900"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-white shadow-xl rounded-lg p-10 max-w-lg mx-auto w-full mt-32 sm:mt-48 backdrop-blur-md bg-opacity-80"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Book Your Session</h2>

          {commonQuestions.map((question, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                {question.label}
              </label>
              {question.type === 'textarea' ? (
                <textarea
                  name={question.name}
                  value={String(formData[question.name] || '')}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
                  placeholder={question.placeholder}
                />
              ) : (
                <input
                  type={question.type}
                  name={question.name}
                  value={String(formData[question.name] || '')}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
                  placeholder={question.placeholder}
                  required={question.required}
                />
              )}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
            >
              <option value="">Select an event type</option>
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="portrait">Portrait</option>
              <option value="corporate">Corporate</option>
              <option value="other">Other</option>
            </select>
            {formData.eventType === 'other' && (
              <input
                type="text"
                name="customEvent"
                value={formData.customEvent || ''}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
                placeholder="Specify event type"
              />
            )}
          </div>

          {eventSpecificQuestions.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-800">Additional Questions</h3>
              {eventSpecificQuestions.map((question, index) => (
                <div key={index} className="mb-2">
                  <label className="block text-sm font-medium text-gray-600">
                    {question.label}
                  </label>
                  <input
                    type={question.type}
                    name={question.name}
                    value={String(formData[question.name] || '')}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
                    placeholder={question.placeholder}
                  />
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold text-sm hover:bg-blue-700 transition-all shadow-lg"
          >
            Submit Booking
          </button>
        </form>
        <section className="bg-white "></section>
        <footer className="bg-white border-t border-gray-200 py-6">
  <div className="container mx-auto flex justify-center items-center px-4">
    {/* Centered Section */}
    <div className="text-base font-medium text-gray-700 text-center">
      Windsor, London, Toronto |{' '}
      <a
        href="mailto:fashamifatemeh@gmail.com"
        className="hover:text-green-600 transition"
      >
        fashamifatemeh@gmail.com
      </a>{' '}
      |{' '}
      <a href="tel:2267596075" className="hover:text-green-600 transition">
        Tel: 226-759-6075
      </a>
    </div>
  </div>
</footer>
      </div>
    </>
  );
}
