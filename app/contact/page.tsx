'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '@/app/components/NavBar';
import { supabase } from '@/app/admin/supabaseClient'; // Import Supabase client

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
    customEvent: '',
  });
  const [eventSpecificQuestions, setEventSpecificQuestions] = useState<any[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const commonQuestions = [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      placeholder: 'Your Full Name',
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Your Email',
      required: true,
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'text',
      placeholder: 'Your Phone Number',
      required: true,
    },
    {
      label: 'Date',
      name: 'date',
      type: 'date',
      placeholder: '',
      required: true,
    },
    {
      label: 'Referral Source',
      name: 'referral',
      type: 'text',
      placeholder: 'How did you hear about us?',
    },
    {
      label: 'Special Requests',
      name: 'specialRequests',
      type: 'textarea',
      placeholder: 'Any special requests?',
    },
  ];

  const questionsByEventType: { [key: string]: any[] } = {
    wedding: [
      {
        label: 'Wedding Theme',
        name: 'weddingTheme',
        type: 'text',
        placeholder: 'E.g., Rustic, Modern',
      },
      {
        label: 'Is it an indoor or outdoor wedding?',
        name: 'weddingLocationType',
        type: 'text',
        placeholder: 'Indoor/Outdoor',
      },
    ],
    engagement: [
      {
        label: 'Preferred Style',
        name: 'engagementStyle',
        type: 'text',
        placeholder: 'E.g., Casual, Formal',
      },
    ],
    portrait: [
      {
        label: 'Preferred Backdrop',
        name: 'portraitBackdrop',
        type: 'text',
        placeholder: 'E.g., Natural, Studio',
      },
    ],
    corporate: [
      {
        label: 'Event Purpose',
        name: 'corporatePurpose',
        type: 'text',
        placeholder: 'E.g., Seminar, Product Launch',
      },
    ],
  };

  useEffect(() => {
    const questions = questionsByEventType[formData.eventType] || [];
    setEventSpecificQuestions(questions);
  }, [formData.eventType]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.date) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      // Insert data into Supabase
      const { data, error } = await supabase.from('bookings').insert([
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          referral: formData.referral,
          specialRequests: formData.specialRequests,
          eventType: formData.eventType,
          customEvent: formData.customEvent || null,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw error;
      }

      // Reset form data
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        referral: '',
        specialRequests: '',
        eventType: '',
        customEvent: '',
      });

      alert('Thank you for booking! We’ll be in touch soon.');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <Head>
        <title>Book Your Session</title>
        <meta name="description" content="Book your session with us today!" />
      </Head>
      <Navbar />
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
              <option value="">Select Event Type</option>
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
      </div>
    </>
  );
}
