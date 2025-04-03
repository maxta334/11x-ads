"use client";

import { useState, useEffect, useRef } from "react";
import { BsStarFill } from "react-icons/bs";
import React from "react";
import Image from 'next/image';

// Platform type definitions
const refTypes = {
  video: {
    id: "video",
  },
};

const Testimonials11 = () => {
  const companies = [
    {
      name: "Otter.AI",
      logo: "/assets/images/otter.jpg",
      type: "Monthly 6 Figure Earner",
      stats: "250% outreach scale & $500k saved in hiring costs"
    },
    {
      name: "Airwallex",
      logo: "/assets/images/airwallex.jpg",
      type: "Monthly 6 Figure Earner",
      stats: "83% YoY revenue increase in APAC region"
    },
    {
      name: "Datastax",
      logo: "/assets/images/datastax.jpg",
      type: "Monthly 6 Figure Earner",
      stats: "100+ qualified meetings per month"
    },
    {
      name: "Connecteam",
      logo: "/assets/images/connect.jpg",
      type: "Monthly 6 Figure Earner",
      stats: "5x engagement increase with AI phone rep"
    },
    {
      name: "ZoomInfo",
      logo: "/assets/images/zoominfo.jpg",
      type: "Monthly 6 Figure Earner",
      stats: "2.3x pipeline growth in 90 days"
    },
    {
      name: "Airtable",
      logo: "/assets/images/airtable.jpg",
      type: "Monthly 6 Figure Earner",
      stats: "3x more demos booked per month"
    }
  ];

  const CompanyCard = ({ company }) => (
    <div className="bg-[#121212] rounded-lg border border-gray-800 overflow-hidden">
      <div className="relative w-full aspect-video">
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-white font-medium">{company.name}</h3>
          <p className="text-gray-400 text-sm">{company.type}</p>
        </div>
        <p className="text-[#1eb853] text-sm font-medium">{company.stats}</p>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-[#1eb853] font-medium uppercase tracking-wider mb-3">TESTIMONIALS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            But Don't Take Our<br />Word For It...
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="https://cal.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center bg-[#1eb853] hover:bg-[#1ba548] text-white font-semibold rounded-lg px-8 py-3 transition-colors"
          >
            🔒 Lock In Your Free Demo Call Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials11;
