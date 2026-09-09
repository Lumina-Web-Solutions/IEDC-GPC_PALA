import { useState, useEffect } from 'react';

export default function KineticHero() {
  // An array of drastically different web-safe and system fonts
  const fonts = [
    'Arial, sans-serif',
    '"Courier New", monospace',
    'Georgia, serif',
    'Impact, sans-serif',
    '"Trebuchet MS", sans-serif',
    '"Times New Roman", serif',
    'Papyrus, fantasy',
    'Brush Script MT, cursive'
  ];

  const [currentFont, setCurrentFont] = useState(fonts[0]);

  useEffect(() => {
    // Changes the font every 150 milliseconds for that rapid, glitchy look
    const interval = setInterval(() => {
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      setCurrentFont(randomFont);
    }, 150); 
    
    return () => clearInterval(interval);
  }, [fonts]);

  return (
    <section className="relative flex flex-col items-center justify-between w-full h-[80vh] min-h-[500px] bg-black text-white overflow-hidden py-10">
      
      {/* Abstract Glowing Tech Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 z-0">
        <div className="w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute w-[300px] h-[300px] bg-purple-600 rounded-full blur-[100px] translate-x-1/2 mix-blend-screen"></div>
      </div>

      {/* Top spacer to push text to center */}
      <div className="flex-1"></div>

      {/* Fast Changing IEDC Text */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1">
        <h1 
          className="text-8xl md:text-[150px] tracking-tight transition-all duration-75"
          style={{ fontFamily: currentFont }}
        >
          IEDC
        </h1>
      </div>

      {/* Static Footer Text */}
      <div className="relative z-10 flex-1 flex items-end pb-8">
        <p className="uppercase tracking-[0.3em] text-sm md:text-base text-gray-400 font-sans font-medium">
          Govt Polytechnic College Pala
        </p>
      </div>

    </section>
  );
}
