'use client';

import { useEffect, useState } from "react";
import localFont from 'next/font/local';
import HighlightedText from '@/components/ui/highlighted-text';

const bricolageGrotesque = localFont({
  src: '../public/assets/fonts/Bricolage Grotesque.ttf',
  variable: '--font-bricolage'
});

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const MobileHero = () => (
    <section className="w-full max-w-4xl mx-auto px-3 pb-0 pt-4">
      <div className="flex flex-col items-center text-center">
        <div className="w-full rounded-lg bg-[#1eb853] text-white text-xs font-medium px-3 py-2 mb-4">
          ⚠️ ATTENTION: Sales Leaders, Founders, and RevOps Teams Struggling to Scale Without Hiring...
        </div>
        
        <h1 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight text-white mb-2 ${bricolageGrotesque.variable} font-bricolage`}>
          <HighlightedText 
            text="Meet Julian – The AI Sales Rep" 
            className="mb-1 block font-black"
          />
          <span className="block mt-1">
            That 11Xs Your Pipeline Without Adding Headcount
          </span>
        </h1>
        
        <p className="text-sm sm:text-base text-gray-400 mb-4 max-w-md">
          🎥 Watch the Demo Below to See Why Top Teams Are Replacing SDRs with Digital Workers Like Julian and Alice
        </p>

        {/* Video Container with 16:9 aspect ratio */}
        <div className="w-full rounded-lg overflow-hidden bg-black mb-4 relative" style={{ aspectRatio: '16/9' }}>
          <iframe 
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/umt73Eu4BRg?playsinline=1"
            title="11x.ai Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            playsInline
          ></iframe>
        </div>
        
        <a 
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#1eb853] hover:bg-[#17a045] text-white font-semibold rounded-lg px-5 py-3 text-base mb-6 transition-all shadow-md"
        >
          <span>Lock In Your Free Demo Call Now</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2"/>
            <path d="M16 12L10 16V8L16 12Z" fill="white"/>
          </svg>
        </a>
        
        <div className="w-full bg-[#2a2a2a] rounded-lg py-4 px-3 shadow-lg">
          <div className="text-[#1eb853] text-3xl sm:text-4xl font-bold mb-1">80+ Qualified Meetings/Week</div>
          <div className="text-gray-400 text-base">Delivered by Alice, Our AI SDR</div>
        </div>
      </div>
    </section>
  );

  const DesktopHero = () => (
    <section className="w-full max-w-5xl mx-auto px-6 py-8">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-[#1eb853] text-white text-sm font-medium px-5 py-1.5 mb-6">
          ⚠️ ATTENTION: Sales Leaders, Founders, and RevOps Teams Struggling to Scale Without Hiring...
        </div>
        
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-4 max-w-4xl ${bricolageGrotesque.variable} font-bricolage`}>
          <HighlightedText 
            text="Meet Julian – The AI Sales Rep" 
            className="mb-1.5 block font-black"
          />
          <span className="block mt-1.5">
            That 11Xs Your Pipeline Without Adding Headcount
          </span>
        </h1>
        
        <p className="text-lg text-gray-400 mb-8 max-w-2xl">
          🎥 Watch the Demo Below to See Why Top Teams Are Replacing SDRs with Digital Workers Like Julian and Alice
        </p>
        
        <div className="w-full max-w-3xl rounded-lg overflow-hidden bg-black mb-8 aspect-video relative">
          <iframe 
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/umt73Eu4BRg"
            title="11x.ai Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <a 
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#1eb853] hover:bg-[#17a045] text-white font-semibold rounded-lg px-8 py-3 text-base mb-10 transition-all"
        >
          <span>Lock In Your Free Demo Call Now</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2"/>
            <path d="M16 12L10 16V8L16 12Z" fill="white"/>
          </svg>
        </a>
        
        <div className="bg-[#2a2a2a] rounded-lg py-4 px-8 shadow-lg text-center">
          <div className="text-[#1eb853] text-4xl lg:text-5xl font-bold mb-1">80+ Qualified Meetings/Week</div>
          <div className="text-gray-400 text-base">Delivered by Alice, Our AI SDR</div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#212121]">
      {isMobile ? <MobileHero /> : <DesktopHero />}
    </div>
  );
};

export default Hero;
