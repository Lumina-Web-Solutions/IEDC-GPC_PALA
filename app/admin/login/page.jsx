'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard'); // Redirect to dashboard on success
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6 relative">
      
      {/* Back to Home Button */}
      <Link 
        href="/" 
        className="absolute top-8 left-6 md:top-12 md:left-12 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-500 uppercase hover:text-gray-900 transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md relative overflow-hidden"
      >
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-gray-900 mb-3">Admin Portal</h1>
          <p className="text-sm tracking-[0.2em] text-gray-400 uppercase">IEDC GPC Pala</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-xl text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="flex flex-col">
            <label className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 border-gray-200 py-3 focus:outline-none focus:border-gray-900 transition-colors bg-transparent text-gray-900 font-medium" 
              placeholder="admin@example.com"
              required 
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 border-gray-200 py-3 focus:outline-none focus:border-gray-900 transition-colors bg-transparent text-gray-900 font-medium" 
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gray-900 text-white font-bold tracking-widest uppercase py-4 rounded-full hover:bg-black transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? 'Authenticating...' : 'Secure Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
