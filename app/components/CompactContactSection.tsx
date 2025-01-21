'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '@/app/admin/supabaseClient';
import { fail } from 'assert';

// Define possible event types
type EventType = 'wedding' | 'engagement' | 'portrait' | 'corporate' | 'other';

// Define the type for form data
type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  referral: string;
  specialRequests: string;
  eventType: EventType;
  customEvent?: string;
  weddingTheme?: string;
  weddingLocationType?: string;
  engagementStyle?: string;
  portraitBackdrop?: string;
  corporatePurpose?: string;
};

// Define the type for questions
type Question = {
  label: string;
  name: keyof ContactFormData;
  type: string;
  placeholder: string;
  required?: boolean;
};

// Event-specific questions configuration
const eventQuestionsConfig: Record<EventType, Question[]> = {
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
  ],
  other: []
};

const CompactContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    referral: '',
    specialRequests: '',
    eventType: 'other',
    customEvent: ''
  });

  const [eventSpecificQuestions, setEventSpecificQuestions] = useState<Question[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const questions = eventQuestionsConfig[formData.eventType] || [];
    setEventSpecificQuestions(questions);
  }, [formData.eventType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.date) {
      toast.error('Please fill out all required fields.');
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
          submittedAt: new Date().toISOString()
        }
      ]);

      if (error) {
        throw error;
      }

      toast.success("Thank you for reaching out! We've received your booking.");
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        referral: '',
        specialRequests: '',
        eventType: 'other',
        customEvent: ''
      });
    } catch (err) {
      console.error('Error submitting booking:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-green-950 font-body text-white py-16 px-6">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />

      <motion.div
        className="max-w-4xl mx-auto text-center bg-white text-gray-800 p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl mb-6 text-green-700">Let&apos;s Connect</h2>
        <p className="text-lg md:text-xl font-sans mb-10">
          Have questions or want to book a session? Fill out the form below, and let&apos;s create
          something amazing together!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-2 font-sans">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-sans">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 font-sans">
              Phone<span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-2 font-sans">
              Date<span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Referral */}
          <div className="flex flex-col">
            <label htmlFor="referral" className="mb-2 font-sans">
              Referral Source
            </label>
            <input
              id="referral"
              type="text"
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="How did you hear about us?"
            />
          </div>

          {/* Special Requests */}
          <div className="flex flex-col">
            <label htmlFor="specialRequests" className="mb-2 font-sans">
              Special Requests
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Any special requests?"
              rows={4}
            ></textarea>
          </div>

          {/* Event Type */}
          <div className="flex flex-col">
            <label htmlFor="eventType" className="mb-2 font-sans">
              Event Type<span className="text-red-500">*</span>
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="portrait">Portrait</option>
              <option value="corporate">Corporate</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Custom Event Type */}
          {formData.eventType === 'other' && (
            <div className="flex flex-col">
              <label htmlFor="customEvent" className="mb-2 font-sans">
                Specify Event Type<span className="text-red-500">*</span>
              </label>
              <input
                id="customEvent"
                type="text"
                name="customEvent"
                value={formData.customEvent}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Specify your event type"
              />
            </div>
          )}

          {/* Event-Specific Questions */}
          {eventSpecificQuestions.length > 0 && (
            <div className="space-y-4">
              {eventSpecificQuestions.map((question, index) => (
                <div key={index} className="flex flex-col">
                  <label htmlFor={question.name} className="mb-2 font-sans">
                    {question.label}
                  </label>
                  <input
                    id={question.name}
                    type={question.type}
                    name={question.name}
                    value={formData[question.name] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={question.placeholder}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition transform"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </section>
  );
};






export default CompactContactSection;
