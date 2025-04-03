'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FAQ from './components/FAQ';
import MobileView from './components/MobileView';

export default function Roadmap() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Check if we're on the wrong domain
    if (typeof window !== 'undefined' && window.location.hostname !== 'roadmap.cookfast.dev') {
      // Redirect to roadmap.cookfast.dev while preserving the path
      window.location.href = `https://roadmap.cookfast.dev${window.location.pathname}`;
      return;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <div className="hidden md:flex h-screen items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">📱 Mobile Only Experience</h2>
              <p className="text-gray-400 max-w-md">Please visit this page on your mobile device for the best experience.</p>
            </div>
          </div>
          <div className="md:hidden">
            <MobileView
              nodes={[]}
              edges={[]}
              onNodeClick={() => {}}
              showVideo={showVideo}
              setShowVideo={setShowVideo}
              bricolageGrotesque={null}
            />
          </div>
        </div>
        
        <div className="md:hidden">
          <FAQ className="mt-24" />
        </div>
      </div>
    </div>
  );
}
