'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  // State for the form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Combine first and last name to match our database column
    const fullName = `${firstName} ${lastName}`.trim();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, message }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
        // Hide success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (err) {
      setError('Failed to send message.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFAFA] px-6 md:px-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex flex-col justify-center"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Get in Touch</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">
            Let's build something <br/> great together.
          </h3>
          
          <div className="space-y-6 text-lg text-gray-600 font-sans">
            <div>
              <p className="font-semibold text-gray-900">Address</p>
              <p>Government Polytechnic College</p>
              <p>Kanattupara, Pala P.O, Kottayam  District-686575 </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <a href="mailto:iedc.gpcpala@gmail.com" className="hover:text-blue-600 transition-colors">iedc.gpcpala@gmail.com</a>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Phone</p>
              <p>0482-2200802</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
        >
          {/* Success / Error Messages */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-green-800 text-center rounded-lg border border-green-200 font-semibold text-sm">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 text-center rounded-lg border border-red-200 font-semibold text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors bg-transparent" 
                  placeholder="First Name" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors bg-transparent" 
                  placeholder="Last Name" 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors bg-transparent" 
                placeholder="Your email address" 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea 
                rows="4" 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors bg-transparent resize-none" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white font-bold tracking-widest uppercase py-4 rounded-full hover:bg-black transition-colors mt-4 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}