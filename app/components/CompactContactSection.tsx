// File: app/components/CompactContactSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define possible event types
type EventType = 'wedding' | 'engagement' | 'portrait' | 'corporate' | 'other';

// Define the type for form data
type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
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
  name: keyof ContactFormData; // Ensures 'name' is a valid key
  type: string;
  placeholder: string;
  required?: boolean;
};

// Define the type for event questions configuration
type EventQuestionsConfig = Record<EventType, Question[]>;

// Define the event-specific questions configuration
const eventQuestionsConfig: EventQuestionsConfig = {
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
  other: [], // Define specific questions for 'other' if needed
};

const CompactContactSection: React.FC = () => {
  // Initialize form data state
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    eventType: 'other', // Default to 'other' to prompt user input
    customEvent: '',
  });

  // Initialize event-specific questions state
  const [eventSpecificQuestions, setEventSpecificQuestions] = useState<Question[]>([]);

  // Handle input changes with proper event typing
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof ContactFormData; // Cast 'name' to keyof ContactFormData

    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Update event-specific questions based on selected event type
  useEffect(() => {
    const eventKey = formData.eventType as EventType; // Cast to EventType
    const questions = eventQuestionsConfig[eventKey] || [];
    setEventSpecificQuestions(questions);
  }, [formData.eventType]);

  // Handle form submission with proper event typing
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.eventType ||
      (formData.eventType === 'other' && !formData.customEvent)
    ) {
      toast.error('Please fill out all required fields.');
      return;
    }

    // Retrieve existing bookings from localStorage or initialize empty array
    const storedBookings: (ContactFormData & { id: number; status: string; submittedAt: string })[] =
      JSON.parse(localStorage.getItem('bookingsList') || '[]');

    // Create new booking submission with additional fields
    const newBooking: ContactFormData & { id: number; status: string; submittedAt: string } = {
      ...formData,
      id: Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // Update bookings list
    const updatedBookings = [...storedBookings, newBooking];
    localStorage.setItem('bookingsList', JSON.stringify(updatedBookings));

    // Reset form data
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      specialRequests: '',
      eventType: 'other',
      customEvent: '',
    });

    // Show success notification
    toast.success("Thank you for reaching out! We'll get back to you soon.");
  };

  return (
    <section className="bg-green-950 font-body text-white py-16 px-6">
      {/* Toast Notifications Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />

      <motion.div
        className="max-w-4xl mx-auto text-center bg-white text-gray-800 p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl mb-6 text-green-700">Let's Connect</h2>
        <p className="text-lg md:text-xl font-sans mb-10">
          Have questions or want to book a session? Fill out the form below, and let's create something amazing together!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-2 font-sans">
              Your Full Name<span className="text-red-500">*</span>
            </label>
            <motion.input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your full name"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-sans">
              Your Email<span className="text-red-500">*</span>
            </label>
            <motion.input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 font-sans">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <motion.input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your phone number"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Event Type Dropdown */}
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
              <option value="">Select Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="prewedding">PreWedding</option>
              <option value="maternity">Maternity</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Custom Event Field */}
          {formData.eventType === 'other' && (
            <div className="flex flex-col">
              <label htmlFor="customEvent" className="mb-2 font-sans">
                Specify Event Type<span className="text-red-500">*</span>
              </label>
              <motion.input
                id="customEvent"
                type="text"
                name="customEvent"
                value={formData.customEvent || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Describe your event"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          )}

          {/* Special Requests */}
          <div className="flex flex-col">
            <label htmlFor="specialRequests" className="mb-2 font-sans">
              Special Requests
            </label>
            <motion.textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Any special requests?"
              rows={4}
              whileFocus={{ scale: 1.02 }}
            ></motion.textarea>
          </div>

          {/* Event-Specific Questions */}
          {eventSpecificQuestions.length > 0 && (
            <div className="space-y-4">
              {eventSpecificQuestions.map((question, index) => (
                <div key={index} className="flex flex-col">
                  <label htmlFor={question.name} className="mb-2 font-sans">
                    {question.label}
                    {question.required && <span className="text-red-500">*</span>}
                  </label>
                  <motion.input
                    id={question.name}
                    type={question.type}
                    name={question.name}
                    value={formData[question.name] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={question.placeholder}
                    required={question.required || false}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-green-700 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition transform"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit
          </motion.button>
        </form>

        {/* Additional Contact Information (Optional) */}
        <motion.div
          className="mt-8 text-lg space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Add any additional contact information or links here */}
          <p>Contact us at <a href="mailto:fashamifatemeh@gmail.com" className="underline">fashamifatemeh@gmail.com</a></p>
          <p>Follow us on <a href="https://instagram.com/fatimaphotography.ca" target="_blank" rel="noopener noreferrer" className="underline">Instagram</a></p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CompactContactSection;
