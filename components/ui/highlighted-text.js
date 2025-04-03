'use client';

import { useEffect, useRef } from 'react';

const HighlightedText = ({ text, className = '' }) => {
  const containerRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!highlightRef.current) return;
          
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              if (highlightRef.current) {
                highlightRef.current.style.width = '100%';
              }
            });
          } else {
            requestAnimationFrame(() => {
              if (highlightRef.current) {
                highlightRef.current.style.width = '0%';
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const baseClasses = "relative inline-block";
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <span ref={containerRef} className={combinedClasses}>
      <span className="relative z-10">{text}</span>
      <span
        ref={highlightRef}
        className="absolute bottom-0 left-0 w-0 h-[8px] bg-[#1eb853] opacity-50 transition-all duration-1000"
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      />
    </span>
  );
};

export default HighlightedText; 