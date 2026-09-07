'use client';
import { motion } from 'framer-motion';

export default function Contact() {
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input type="text" className="border-b border-gray-300 py-2 focus:outline-none focus:border-gray-900 transition-colors bg-transparent" placeholder="First Name" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input type="text" className="border-b border-gray-300 py-2 focus:outline-none focus:border-gray-900 transition-colors bg-transparent" placeholder="Last Name" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" className="border-b border-gray-300 py-2 focus:outline-none focus:border-gray-900 transition-colors bg-transparent" placeholder="Your email address" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea rows="4" className="border-b border-gray-300 py-2 focus:outline-none focus:border-gray-900 transition-colors bg-transparent resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-gray-900 text-white font-bold tracking-widest uppercase py-4 rounded-full hover:bg-black transition-colors mt-4">
              Send Message
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}