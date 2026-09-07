'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard'); // Redirect to dashboard on success
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
      <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-sm tracking-widest text-gray-500 uppercase">IEDC GPC Pala</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b border-gray-300 py-2 focus:outline-none focus:border-gray-900 transition-colors bg-transparent text-gray-900" 
              required 
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b border-gray-300 py-2 focus:outline-none focus:border-gray-900 transition-colors bg-transparent text-gray-900" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white font-bold tracking-widest uppercase py-4 rounded-full hover:bg-black transition-colors mt-8"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}