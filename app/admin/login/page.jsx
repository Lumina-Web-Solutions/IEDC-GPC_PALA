'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      setError('Authentication failed. Verify credentials and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] flex flex-col items-center justify-center p-4 font-sans relative">
      
      {/* Official e-Gov Background Texture */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      {/* Back to Home Button - Portal Style */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-xs font-bold tracking-wider text-[#003366] uppercase hover:text-orange-600 bg-white border border-[#CCCCCC] px-3 py-2 shadow-sm z-10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        RETURN TO PUBLIC SITE
      </Link>

      {/* Main Login Container */}
      <div className="bg-white border border-[#CCCCCC] shadow-md w-full max-w-md relative z-10 flex flex-col">
        
        {/* Official Header */}
        <div className="bg-[#003366] p-6 flex flex-col items-center border-b-4 border-orange-500">
          <img 
            src="/LogoN.png" 
            alt="IEDC GPC Pala Logo" 
            className="h-14 w-auto mb-3 brightness-0 invert"
          />
          <h1 className="text-xl font-bold text-white tracking-wide uppercase text-center m-0">
            Administrative Portal
          </h1>
          <p className="text-xs text-orange-400 font-bold mt-1 tracking-widest uppercase">
            IEDC GPC Pala
          </p>
        </div>

        <div className="p-6 md:p-8">
          
          {/* Security Notice */}
          <div className="bg-[#FFF4E5] border border-orange-400 p-3 mb-6 text-center">
            <p className="text-xs text-[#555555] font-bold uppercase tracking-wide m-0">
              <span className="text-orange-600">Restricted Access:</span> Authorized Personnel Only
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-[#FFEEEE] border border-[#CC0000] text-[#CC0000] text-xs font-bold text-center uppercase tracking-wide">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Official Email ID</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm text-[#333333] font-semibold focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-none" 
                placeholder="admin@institution.edu"
                required 
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Security Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm text-[#333333] font-semibold focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-none" 
                placeholder="••••••••"
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#003366] text-white font-bold text-sm tracking-wider uppercase py-3 border border-[#002244] hover:bg-orange-500 hover:border-orange-600 disabled:opacity-70 disabled:cursor-not-allowed mt-2 transition-none"
            >
              {isSubmitting ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
            </button>
          </form>
        </div>

        {/* Footer Security Log Note */}
        <div className="bg-[#F8F9FA] border-t border-[#CCCCCC] p-3 text-center">
          <p className="text-[10px] text-[#777777] font-bold uppercase tracking-wider m-0">
            Authentication events are logged and monitored.
          </p>
        </div>

      </div>

      <div className="bg-white border border-slate-200 rounded p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-slate-100 rounded flex items-center justify-center border border-slate-200">
             <img src="/LogoN.png" alt="Emblem" className="h-6 w-auto opacity-80" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800"> IEDC Website v1.0</p>
            <p className="text-xs text-slate-500">Government Polytechnic College, Pala</p>
          </div>
        </div>

    </div>
  );
}
