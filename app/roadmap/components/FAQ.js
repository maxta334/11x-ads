"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const faqList = [
  {
    question: "Do I need any coding experience to follow this roadmap?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>No prior experience needed. Our roadmap is designed for complete beginners:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Visual Learning</strong> – Clear, step-by-step tutorials with visual examples</li>
          <li><strong>Practical Approach</strong> – Learn by building real features you understand</li>
          <li><strong>Beginner Friendly</strong> – Start with the basics and progress at your own pace</li>
          <li><strong>Modern Tools</strong> – Use the latest AI development tools that make coding easier</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How long will it take to complete the entire roadmap?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>The roadmap is designed to fit your schedule:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Part-time Learning</strong> – Complete in 2-3 months spending 1-2 hours daily</li>
          <li><strong>Full-time Focus</strong> – Finish in 3-4 weeks with dedicated study</li>
          <li><strong>Weekend Projects</strong> – Build specific features in 2-3 days each</li>
          <li><strong>Flexible Pace</strong> – Skip sections you already know, focus on what you need</li>
        </ul>
      </div>
    ),
  },
  {
    question: "What kind of apps can I build after completing this?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>You'll be able to build various types of mobile apps:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Social Apps</strong> – Create apps with user profiles and real-time features</li>
          <li><strong>AI-Powered Tools</strong> – Build apps that integrate with AI services</li>
          <li><strong>Business Apps</strong> – Develop apps with authentication and data management</li>
          <li><strong>Custom Projects</strong> – Design and build your own app ideas from scratch</li>
        </ul>
      </div>
    ),
  }
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="border-b border-gray-800 last:border-b-0">
      <button
        className="relative flex gap-2 items-center w-full py-6 text-base font-semibold text-left md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span className={`flex-1 text-white ${isOpen ? "text-green-500" : ""}`}>
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-6 h-6 ml-auto fill-current transition-transform duration-200 ${
            isOpen ? "rotate-180 text-green-500" : "text-white"
          }`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 15.713L18.01 9.70299C18.3033 9.40969 18.7769 9.40969 19.07 9.70299C19.3631 9.99609 19.3631 10.4696 19.07 10.763L12.53 17.303C12.2369 17.5961 11.7633 17.5961 11.47 17.303L4.93 10.763C4.63669 10.4696 4.63669 9.99609 4.93 9.70299C5.2231 9.40969 5.69669 9.40969 5.99 9.70299L12 15.713Z" />
        </svg>
      </button>

      <div
        ref={accordion}
        className="transition-all duration-300 ease-in-out text-gray-300"
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-6 leading-relaxed text-base">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
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

  return (
    <>
      <section className="bg-[#1a1a1a] py-16 md:py-24" id="faq">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-5">
              <div className="sticky top-24">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="text-base text-gray-500">
                  Don&apos;t worry! Our roadmap is designed to guide you step by step, even if you&apos;re just starting out.
                </div>
              </div>
            </div>
            <div className="md:col-span-7 md:pl-8">
              <ul className="w-full">
                {faqList.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modified CTA Section */}
      <section className="bg-[#1a1a1a] py-16 md:py-24 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative">
          <div className="flex flex-col items-center text-center relative">
            {/* Lightning Icon */}
            <div className="mb-6">
              <svg 
                className="w-12 h-12 text-yellow-500" 
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
              <p className="mt-2 text-gray-400 max-w-2xl">
                Skip the learning curve and launch tomorrow with our production-ready template. 
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="w-full max-w-sm">
              <Link
                href="/"
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
              <div className="mt-3 flex items-center justify-center gap-1.5 text-sm">
                <span className="text-yellow-500">⚡</span>
                <span className="text-gray-400">Sale ends in</span>
                <span className="text-white font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ; 