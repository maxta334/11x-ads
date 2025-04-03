import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { BsStarFill } from "react-icons/bs";
import RoadmapDiagram from './RoadmapDiagram';
import MobileHeader from './MobileHeader';
import ReactFlow, { Background } from 'reactflow';
import { LightningLogo } from "@/components/Icons";
import config from "@/config";
import html2canvas from 'html2canvas';

// Drop-in replacement for Image components
const ProfileImage = ({ src, alt, size = 64 }) => (
  <div 
    className="relative rounded-full overflow-hidden" 
    style={{ width: size, height: size, minWidth: size, minHeight: size }}
  >
    <Image 
      src={src} 
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
      priority
    />
  </div>
);

export default function MobileView({ 
  nodes, 
  edges, 
  onNodeClick, 
  showVideo, 
  setShowVideo,
  bricolageGrotesque 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [activeUserCount, setActiveUserCount] = useState(412);
  const [showCalculator, setShowCalculator] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isTabActive, setIsTabActive] = useState(true);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Countdown timer that pauses when tab is inactive
  useEffect(() => {
    let interval;
    if (isTabActive && timeLeft >= 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            return 900; // Reset to 15 minutes
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTabActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulated active user count update
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUserCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Certification tiers data
  const certificationTiers = [
    {
      name: "AI Developer I",
      requirements: "Complete core modules",
      badge: "🎯",
      current: true
    },
    {
      name: "AI Developer II",
      requirements: "Build 3 demo apps",
      badge: "⚡",
      unlocked: false
    },
    {
      name: "Production Engineer",
      requirements: "Deploy app with monitoring",
      badge: "🚀",
      unlocked: false
    },
    {
      name: "Architect",
      requirements: "Optimize complex system",
      badge: "🏗️",
      unlocked: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Ex-Google Engineer",
      company: "Coinbase",
      image: "/assets/sarah.jpg",
      quote: "Used this stack to ship 3 MVPs during my internship at Coinbase. Saved weeks of setup time.",
      badge: "FAANG Alumni"
    },
    {
      name: "Alex Kim",
      role: "MIT Student",
      company: "Y Combinator W24",
      image: "/assets/alex.jpg",
      quote: "From zero to deployed in 4 hours. My professor couldn't believe it wasn't built by a team.",
      badge: "Rising Star"
    }
  ];

  const savingsCalculator = {
    setupTime: 72,
    hourlyRate: 150,
    totalSaved: 72 * 150
  };

  const handleDownloadRoadmap = () => {
    const link = document.createElement('a');
    link.download = 'roadmap.jpeg';
    link.href = '/assets/images/roadmap.jpeg';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <MobileHeader />
      {/* Main Content */}
      <div className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-green-500 text-sm font-medium mb-2">
              <span className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {activeUserCount} developers learning right now
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                <span className="block">Learn to Code</span>
                <span className="block">with AI</span>
              </h1>
              <div className="flex items-center gap-2">
                <Image 
                  src="/assets/images/yc.png" 
                  alt="Y Combinator" 
                  width={28} 
                  height={28} 
                  className="h-7 w-7"
                />
                <span className="text-sm text-gray-400">Backed by YC</span>
              </div>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              Learn how to build production-ready apps using AI tools and best practices. Follow our step-by-step roadmap to master modern development workflows.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                <div className="w-8 h-8 flex items-center justify-center bg-yellow-500/10 rounded-lg">
                  <span className="text-yellow-500 text-lg">⚡</span>
                </div>
                <span className="text-xs text-gray-400 text-center">Hands-on Learning</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500/10 rounded-lg">
                  <span className="text-blue-500 text-lg">🛡️</span>
                </div>
                <span className="text-xs text-gray-400 text-center">Best Practices</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                <div className="w-8 h-8 flex items-center justify-center bg-red-500/10 rounded-lg">
                  <span className="text-red-500 text-lg">🎯</span>
                </div>
                <span className="text-xs text-gray-400 text-center">Free Resources</span>
              </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col items-center text-center border border-gray-800">
                <div className="text-3xl font-bold text-green-500 mb-1">410h</div>
                <div className="text-xs text-gray-400">Average Time Saved</div>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col items-center text-center border border-gray-800">
                <div className="text-3xl font-bold text-green-500 mb-1">$10.8K</div>
                <div className="text-xs text-gray-400">Dev Cost Saved</div>
              </div>
            </div>

            {/* Roadmap Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Learning Roadmap</h2>
              </div>
              <div className="roadmap-container h-[400px] w-full bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800">
                <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
                  <RoadmapDiagram isMobile={true} />
                </div>
              </div>
            </div>

            {/* Featured Student Projects */}
            <div className="space-y-4 mb-8">
              {/* First Project */}
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-white font-medium mb-4">Featured Success Story</h3>
                <div className="flex items-start gap-3">
                  <ProfileImage 
                    src="/assets/images/adi.jpg" 
                    alt="Adi Patel" 
                    size={48}
                  />
                  <div>
                    <h4 className="text-white font-medium">GlowAI</h4>
                    <p className="text-sm text-gray-400 mb-2">By Adi Patel</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 bg-green-500/10 text-green-500 text-xs rounded-xl font-medium">$50K MRR</span>
                        <span className="px-3 py-1.5 bg-blue-500/10 text-blue-500 text-xs rounded-xl font-medium">Sophmore</span>
                      </div>
                      <p className="text-xs text-gray-400">From zero code to Stripe internship in 3 weeks using our stack.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Project */}
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-white font-medium mb-4">Latest Success Story</h3>
                <div className="flex items-start gap-3">
                  <ProfileImage 
                    src="/assets/images/zack.jpeg" 
                    alt="Zack Hargett" 
                    size={48}
                  />
                  <div>
                    <h4 className="text-white font-medium">Coconote</h4>
                    <p className="text-sm text-gray-400 mb-2">By Zack Hargett</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 bg-green-500/10 text-green-500 text-xs rounded-xl font-medium">Hit $100K MRR</span>
                        <span className="px-3 py-1.5 bg-purple-500/10 text-purple-500 text-xs rounded-xl font-medium">Top Maker</span>
                      </div>
                      <p className="text-xs text-gray-400">Launched mobile app in 24 hours, now making more than his previous tech salary.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Boilerplate CTA */}
            <div className="mb-8 bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="text-white font-medium">Ready to Join Them?</h3>
                  <p className="text-sm text-green-500">{activeUserCount} developers building right now</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Skip 72+ hours of setup time. Get our production-ready template and launch your first app tomorrow.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Production-ready AI integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Best practices included</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Learn by example</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="https://www.cookfast.dev"
                  className="flex-1 bg-white text-[#0d1117] py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all text-center group"
                >
                  <span>Use Template</span>
                </Link>
                <div className="text-right">
                  <div className="text-white font-medium">$199</div>
                  <div className="text-xs text-gray-400">
                    <span className="line-through text-gray-600">$299</span>
                    <span className="text-green-500 ml-1">33% off</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-sm">
                <span className="text-yellow-500">⚡</span>
                <span className="text-gray-400">Special offer ends in</span>
                <span className="text-white font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 mb-12">
              <Link
                href="https://www.cookfast.dev"
                className="block w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-all text-center"
              >
                Start Learning
              </Link>
              <button 
                onClick={handleDownloadRoadmap}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-all"
              >
                Download Roadmap
              </button>
            </div>

            {/* Video Testimonials */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Join 1,000+ Successful Launches...
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "Connor",
                    videoPoster: "/assets/images/connor.png",
                    videoSrc: "https://i.imgur.com/EGTN1o0.mp4",
                    videoHeight: 1920,
                    videoWidth: 1080,
                    videoType: "video/mp4",
                    stars: 5
                  },
                  {
                    name: "Diego",
                    videoPoster: "/assets/images/diego.png",
                    videoSrc: "https://i.imgur.com/ZgeGowf.mp4",
                    videoHeight: 1920,
                    videoWidth: 1080,
                    videoType: "video/mp4",
                    stars: 5
                  },
                  {
                    name: "Jadon",
                    videoPoster: "/assets/images/jadon.png",
                    videoSrc: "https://i.imgur.com/cJpAoKF.mp4",
                    videoHeight: 1920,
                    videoWidth: 1080,
                    videoType: "video/mp4",
                    stars: 5
                  },
                  {
                    name: "Caleb",
                    videoPoster: "/assets/images/caleb.png",
                    videoSrc: "https://i.imgur.com/uSTPhYz.mp4",
                    videoHeight: 1920,
                    videoWidth: 1080,
                    videoType: "video/mp4",
                    stars: 5
                  }
                ].map((testimonial, index) => (
                  <VideoTestimonial key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Video Modal */}
            {showVideo && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="bg-[#1a1a1a] w-full max-w-3xl rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">How to Build Production AI Apps</h3>
                      <button 
                        onClick={() => setShowVideo(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="aspect-video bg-black">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/uCjcc1TXk5c?autoplay=1"
                      title="How to Build Production AI Apps"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certification Modal */}
      {showCertModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] w-full max-w-lg rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Certification Path</h3>
                <button 
                  onClick={() => setShowCertModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {certificationTiers.map((tier, index) => (
                  <div 
                    key={tier.name}
                    className={`p-4 rounded-lg ${tier.current ? 'bg-green-500/10 border border-green-500/20' : 'bg-[#2a2a2a]'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{tier.badge}</span>
                        <h4 className="text-white font-medium">{tier.name}</h4>
                      </div>
                      {tier.current && (
                        <span className="text-xs text-green-500">Current Level</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{tier.requirements}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] w-full max-w-lg rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Calculate Your Savings</h3>
                <button 
                  onClick={() => setShowCalculator(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Hourly Rate
                  </label>
                  <input 
                    type="number"
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Estimated Setup Time (hours)
                  </label>
                  <input 
                    type="number"
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="72"
                  />
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">$10,800</div>
                    <p className="text-sm text-gray-400">Potential Savings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal with Social Proof */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] w-full max-w-lg rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Start Building Now</h3>
                <button 
                  onClick={() => setShowPricingModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="inline-block px-3 py-1 bg-green-500/10 text-green-500 text-sm rounded-full mb-2">
                  Limited Time Offer
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Save 72+ Hours of Setup Time
                </h4>
                <p className="text-gray-400">
                  Get instant access to our production-ready template
                </p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Production-ready AI integration</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>1-on-1 deployment support</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Lifetime updates & support</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-2xl font-bold text-white">$297</div>
                  <div className="text-sm text-gray-400">One-time payment</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 line-through">$997</div>
                  <div className="text-sm text-green-500">70% off today</div>
                </div>
              </div>
              <button className="w-full bg-white text-[#0d1117] py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all mb-4">
                Get Instant Access
              </button>
              <p className="text-center text-xs text-gray-500">
                30-day money-back guarantee • Secure payment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoTestimonial({ testimonial }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    // Extract the video ID from the URL
    const videoId = testimonial.videoSrc.split('/').pop().replace('.mp4', '');
    
    // Use the direct video URL format
    const directVideoUrl = `https://i.imgur.com/${videoId}.mp4`;
    setVideoUrl(directVideoUrl);
    setLoading(false);
  }, [testimonial.videoSrc]);

  const handlePlayVideo = () => {
    if (videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {
        setError(true);
        setLoading(false);
      });
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#121212] rounded-lg border-[1px] border-gray-800 mb-4 break-inside-avoid-column overflow-hidden flex flex-col h-fit">
      <div className="relative w-full aspect-[9/16]">
        {loading && (
          <div className="z-40 h-24 w-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        {videoUrl && (
          <video
            ref={videoRef}
            poster={testimonial.videoPoster}
            className="w-full h-full object-cover"
            width={testimonial.videoWidth}
            height={testimonial.videoHeight}
            playsInline
            preload="metadata"
            onLoadedData={() => setLoading(false)}
            onEnded={handleVideoEnd}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support video playback
          </video>
        )}
        {!isPlaying && !error && videoUrl && (
          <button
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 transition-opacity"
            title="Play video"
            aria-label="Play video"
            onClick={handlePlayVideo}
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-90">
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </button>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-sm">Failed to load video</div>
          </div>
        )}
      </div>
      <div className="bg-[#121212] text-gray-200 font-medium p-3">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(testimonial.stars || 5)].map((_, i) => (
            <BsStarFill key={i} className="text-green-500 w-4 h-4" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm">
            {testimonial.name}
          </span>
        </div>
      </div>
    </div>
  );
} 