'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RoadmapDiagram, { initialNodes, initialEdges } from '../components/RoadmapDiagram';
import MobileHeader from '../components/MobileHeader';

const VSL_VIDEO_URL = 'https://i.imgur.com/k7Ra6CL.mp4';

export default function VSLPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [viewerCount, setViewerCount] = useState(414);
  const [completionRate, setCompletionRate] = useState(72);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [showCTA, setShowCTA] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [activities, setActivities] = useState([
    { id: 1, name: 'Emma', colorClass: 'bg-emerald-500', text: 'just deployed their first AI app' },
    { id: 2, name: 'Liam', colorClass: 'bg-orange-500', text: 'completed the certification' },
    { id: 3, name: 'Sophia', colorClass: 'bg-purple-500', text: 'started building an AI chatbot' }
  ]);

  const names = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
    'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Alex', 'Amelia',
    'Benjamin', 'Harper', 'Lucas', 'Evelyn', 'Henry', 'Abigail', 'Sebastian'
  ];

  const activityTypes = [
    { text: 'just deployed their first AI app' },
    { text: 'launched a new project' },
    { text: 'completed the certification' },
    { text: 'mastered the AI basics' },
    { text: 'started building an AI chatbot' },
    { text: 'created an AI-powered dashboard' }
  ];

  // Distinct color sets that work well together
  const colorSets = [
    ['bg-emerald-500', 'bg-orange-500', 'bg-purple-500'],
    ['bg-blue-500', 'bg-amber-500', 'bg-pink-500'],
    ['bg-indigo-500', 'bg-rose-500', 'bg-teal-500'],
    ['bg-cyan-500', 'bg-fuchsia-500', 'bg-yellow-500']
  ];

  // Simulate active viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  // Simulate video progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowCTA(true);
          return 100;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Add new activity and remove oldest one
  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      
      setActivities(prev => {
        // Get current colors in use
        const currentColors = prev.map(a => a.colorClass);
        
        // Select a color set that doesn't contain any of the current colors
        const availableColorSets = colorSets.filter(set => 
          !set.some(color => currentColors.includes(color))
        );
        
        // Pick a random color set and color from it
        const selectedSet = availableColorSets[Math.floor(Math.random() * availableColorSets.length)] || colorSets[0];
        const randomColor = selectedSet[Math.floor(Math.random() * selectedSet.length)];
        
        const newActivity = {
          id: Date.now(),
          name: randomName,
          colorClass: randomColor,
          text: randomActivity.text,
          isEntering: true
        };
        
        // Mark the oldest activity as exiting
        const updated = prev.map((activity, index) => 
          index === prev.length - 1 ? { ...activity, isExiting: true } : activity
        );
        
        return [newActivity, ...updated.slice(0, 2)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if we're on the wrong domain
    if (typeof window !== 'undefined' && window.location.hostname !== 'learn.cookfast.dev') {
      // Redirect to learn.cookfast.dev while preserving the path
      window.location.href = `https://learn.cookfast.dev${window.location.pathname}`;
      return;
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop View - Mobile Only Message */}
        <div className="hidden md:flex h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">📱 Mobile Only Experience</h2>
            <p className="text-gray-400 max-w-md">Please visit this page on your mobile device for the best experience.</p>
          </div>
        </div>

        {/* Mobile View - Full Content */}
        <div className="md:hidden">
          <div className="relative">
            <MobileHeader />
            <div className="max-w-4xl mx-auto">
              {/* Initial View - Learning Content */}
              <div className="space-y-6 mb-12">
                {/* Live Viewer Count */}
                <div className="flex items-center gap-2 text-green-500 text-sm font-medium mt-4">
                  <span className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {viewerCount} developers watching right now
                  </span>
                </div>

                {/* Video Placeholder */}
                <div className="aspect-video bg-[#1a1a1a] rounded-lg overflow-hidden relative">
                  <video
                    className="w-full h-full object-cover"
                    width={1920}
                    height={1080}
                    playsInline
                    controls
                  >
                    <source src={VSL_VIDEO_URL} type="video/mp4" />
                    Your browser does not support video playback
                  </video>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                    <div 
                      className="h-full bg-green-500 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-sm text-gray-400">
                      {completionRate}% of developers completed this guide
                    </span>
                    <span className="text-sm text-green-500">
                      You&apos;re in the top {Math.max(10, 100 - progress)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Roadmap Diagram */}
                <div className="border border-gray-800 rounded-lg overflow-hidden">
                  <RoadmapDiagram
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={() => {}}
                    isMobile={true}
                    showTooltip={false}
                  />
                </div>
              </div>

              {/* Below Initial View - Sales Content */}
              <div className="space-y-6 mb-12">
                {/* Time Investment Comparison */}
                <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-800">
                  <h3 className="text-lg font-bold mb-3">Time to Launch Comparison</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Building from scratch</span>
                      <span className="text-gray-400 line-through">4-6 weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Using no-code tools</span>
                      <span className="text-gray-400 line-through">2-3 weeks</span>
                    </div>
                    <div className="flex items-center justify-between text-green-500 font-bold">
                      <span>With our template</span>
                      <span>24 hours</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-400">
                    Skip weeks of setup and configuration. Our template includes everything you need to launch fast: authentication, database, AI integration, and more.
                  </p>
                </div>

                {/* Live Activity Feed */}
                <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 max-h-40 overflow-hidden">
                  <h3 className="text-sm font-medium mb-3">Live Activity</h3>
                  <div className="space-y-2">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-center gap-2 text-sm ${
                          activity.isEntering ? 'animate-fade-in-slide' : 
                          activity.isExiting ? 'animate-fade-out-slide' : ''
                        }`}
                      >
                        <span className={`w-2 h-2 ${activity.colorClass} rounded-full`}></span>
                        <span className="text-gray-400">
                          <span className="text-white">{activity.name}</span> {activity.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="animate-fade-in space-y-6 text-center bg-[#1a1a1a] rounded-lg p-8 border border-gray-800">
                  {/* Lightning Icon */}
                  <div className="mb-2">
                    <svg 
                      className="w-12 h-12 text-yellow-500 mx-auto" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  {/* Heading with Guarantee */}
                  <div className="mb-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      Want to Launch Faster?
                    </h2>
                    <p className="text-xl text-green-500 font-semibold">
                      Get Your App Live in 24 Hours
                    </p>
                    <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
                      Skip weeks of setup and launch tomorrow with our production-ready template.
                      Everything you need is included.
                    </p>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="w-full max-w-sm mx-auto">
                    <Link
                      href="https://www.cookfast.dev"
                      className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 text-lg font-medium text-black bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                    >
                      <svg 
                        className="w-5 h-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Launch in 24 Hours →</span>
                    </Link>
                    <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                      <span className="text-yellow-500">⚡</span>
                      <span className="text-gray-400">Special offer ends in</span>
                      <span className="text-white font-medium">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
