'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CompactContactSection: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    message: string;
    eventType: string;
    customEvent: string;
  }>({
    name: '',
    email: '',
    phone: '',
    message: '',
    eventType: '',
    customEvent: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      eventType: '',
      customEvent: ''
    });
  };

  return (
    <section className="bg-green-950 font-body text-white py-16 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-body mb-6">Let&apos;s Connect</h2>
        <p className="text-lg md:text-xl mb-10">
          Have questions or want to book a session? Fill out the form below, and let&apos;s create
          something amazing together!
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white text-gray-800 p-8 rounded-lg shadow-lg"
        >
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium">
              Your Name
            </label>
            <motion.input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-green-400"
              placeholder="Enter your name"
              required
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium">
              Your Email
            </label>
            <motion.input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-green-400"
              placeholder="Enter your email"
              required
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 font-medium">
              Phone Number
            </label>
            <motion.input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-green-400"
              placeholder="Enter your phone number"
              required
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          {/* Event Type Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="eventType" className="mb-2 font-medium">
              Event Type
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-green-400"
              required
            >
              <option value="">Select Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="portrait">Portrait</option>
              <option value="corporate">Corporate</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Custom Event Field */}
          {formData.eventType === 'other' && (
            <div className="flex flex-col">
              <label htmlFor="customEvent" className="mb-2 font-medium">
                Specify Event Type
              </label>
              <motion.input
                id="customEvent"
                type="text"
                name="customEvent"
                value={formData.customEvent}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-green-400"
                placeholder="Describe your event"
                whileFocus={{ scale: 1.05 }}
              />
            </div>
          )}

          {/* Message Field */}
          <div className="flex flex-col">
            <label htmlFor="message" className="mb-2 font-medium">
              Your Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-green-900"
              placeholder="Write your message here"
              rows={4}
              required
              whileFocus={{ scale: 1.05 }}
            ></motion.textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-green-700 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:ring focus:ring-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </form>

        {/* Contact Information */}
        <motion.div
          className="mt-8 text-lg space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default CompactContactSection;
