import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start border-b border-gray-800 pb-12 mb-8">
        
        {/* Brand */}
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-serif tracking-wide mb-2">IEDC GPC PALA</h2>
          <p className="text-gray-400 font-sans text-sm max-w-xs">
            Fostering a culture of innovation, technology, and entrepreneurship.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-8 text-sm font-semibold tracking-widest text-gray-400 uppercase">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#events" className="hover:text-white transition-colors">Events</Link>
          <Link href="#achievements" className="hover:text-white transition-colors">Achievements</Link>
          <Link href="#team" className="hover:text-white transition-colors">Team</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-sans">
        <p>© {new Date().getFullYear()} IEDC GPC Pala. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Designed & Developed by <a href="https://luminaweb.online" target="_blank" rel="noopener noreferrer">
          <img src="https://luminaweb.online/assets/NLogo.png" alt="Lumina Web Solutions" className="h-8 w-auto object-contain" /></a></p>
      </div>
    </footer>
  );
}