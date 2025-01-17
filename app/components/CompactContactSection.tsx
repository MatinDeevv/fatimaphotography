'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '@/app/admin/supabaseClient';

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
  name: keyof ContactFormData;
  type: string;
  placeholder: string;
  required?: boolean;
};

// Define the type for event questions configuration
type EventQuestionsConfig = Record<EventType, Question[]>;

// Event-specific questions configuration
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
  other: [],
};

const CompactContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    eventType: 'other',
    customEvent: '',
  });

  const [eventSpecificQuestions, setEventSpecificQuestions] = useState<Question[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof ContactFormData;
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    const eventKey = formData.eventType as EventType;
    const questions = eventQuestionsConfig[eventKey] || [];
    setEventSpecificQuestions(questions);
  }, [formData.eventType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    try {
      // Insert data into Supabase
      const { data, error } = await supabase.from('bookings').insert([
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
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
        specialRequests: '',
        eventType: 'other',
        customEvent: '',
      });

      toast.success("Thank you for reaching out! We've received your booking.");
    } catch (error) {
      console.error('Error submitting form:', error);
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
        <h2 className="text-4xl mb-6 text-green-700">Let's Connect</h2>
        <p className="text-lg md:text-xl font-sans mb-10">
          Have questions or want to book a session? Fill out the form below, and let's create something amazing together!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          {/* Full Name */}
          {/* Email */}
          {/* Phone */}
          {/* Event Type */}
          {/* Special Requests */}
          {/* Event-Specific Questions */}
          {/* Submit Button */}
        </form>
      </motion.div>
    </section>
  );
};

export default CompactContactSection;
