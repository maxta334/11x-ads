import Image from 'next/image';
import HighlightedText from '@/components/ui/highlighted-text';

const RevenueTestimonial = () => {
  return (
    <section className="bg-[#212121] pt-0 pb-6 md:py-10">
      <div className="container mx-auto px-4 sm:px-4 lg:px-6 max-w-3xl">
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
          {/* Email Header */}
          <div className="px-6 pt-3 pb-2">
            <div className="text-gray-800">
              <p className="font-medium">From: Hasan Sukkar, Founder of 11x.ai</p>
              <p>Re: Your Sales Team's Future</p>
            </div>
          </div>
          
          {/* Email Body */}
          <div className="px-6 py-3 text-gray-800">
            <p className="mb-4">
              <span className="text-xl font-bold">Dear Revenue Leader,</span>
            </p>
            
            <div className="mb-6">
              <p className="font-bold text-lg">Your sales team isn't broken.</p>
              <p className="font-bold text-lg">But the system they operate in?</p>
              <p className="text-[#1eb853] font-bold text-lg">It's completely outdated.</p>
            </div>
            
            <div className="space-y-2 mb-6">
              <p>Not because your reps aren't talented.</p>
              <p>Not because your leads are low quality.</p>
              <p>Not because your offer doesn't work.</p>
              <p className="font-medium">But because human teams have human limits.</p>
            </div>
            
            <p className="font-medium mb-4">And in 2025, those limits are costing you a fortune:</p>
            
            <div className="space-y-4 mb-6">
              <p className="font-bold">70% of your sales team's time is spent on admin—not selling.</p>
              <p className="font-bold">Every demo that slips through the cracks is lost revenue.</p>
              <p className="font-bold">Every after-hours lead that doesn't hear back is a missed close.</p>
              <p className="font-bold">Every manual task your reps repeat is a drag on pipeline velocity.</p>
            </div>
            
            <p className="mb-4">Meanwhile, your competitors are moving faster.</p>
            
            <p className="mb-4">Why?</p>
            
            <p className="font-bold text-lg mb-6">Because they've hired digital workers.</p>

            {/* First Image */}
            <div className="mb-6">
              <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
                <Image
                  src="/assets/images/gpt1.png"
                  alt="Your sales team is working 9-5 while digital workers never stop"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <p>At 11x.ai, we don't sell tools.</p>
              <p>We don't build dashboards.</p>
              <p>We don't give you "a slightly better CRM."</p>
            </div>
            
            <p className="font-medium text-lg mb-6">
              <HighlightedText text="We give you sales reps." />
            </p>
            
            <p className="font-medium mb-6">
              Real, revenue-generating reps—just not human ones.
            </p>

            {/* Second Image */}
            <div className="mb-6">
              <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
                <Image
                  src="/assets/images/gpt2.png"
                  alt="AI Sales Representatives Alice and Julian"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="font-bold">Meet Alice, your AI SDR who prospects, researches, and books meetings on autopilot.</p>
              <p className="font-bold">Meet Julian, your AI voice agent who calls leads, qualifies them, and keeps your pipeline warm—24/7.</p>
            </div>
            
            <div className="space-y-2 mb-6">
              <p className="font-bold">They don't take breaks.</p>
              <p className="font-bold">They don't ask for PTO.</p>
              <p className="font-bold">They don't miss quota.</p>
              <p className="font-bold">And they never burn out.</p>
            </div>
            
            <p className="mb-4">We built 11x because the old way wasn't working.</p>
            
            <div className="mb-6">
              <p>Because Salesforce brought sales software to the cloud in 1999…</p>
              <p>And in 2025, it's time to go further.</p>
            </div>
            <blockquote className="border-l-4 border-[#1eb853] pl-4 mb-6">
              <p className="font-bold text-lg">
                We don't build software. We code labor.
              </p>
              <p className="font-bold text-lg">
                We don't sell tools. We deliver outcomes.
              </p>
              <p className="text-sm mt-2">— Hasan Sukkar, Founder of 11x.ai</p>
            </blockquote>

            {/* Third Image */}
            <div className="mb-6">
              <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
                <Image
                  src="/assets/images/gpt3.png"
                  alt="Growth from $0 to $10M+ ARR"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <p className="font-bold text-lg">
                In the first 12 months, Alice and Julian helped our clients go from $0 to $10M+ in ARR
              </p>
              <p className="font-bold text-lg">→ without hiring a single SDR.</p>
            </div>
            
            <div className="space-y-2 mb-6">
              <p>We've replaced thousands of hours of cold calls, emails, and admin work.</p>
              <p>We've helped high-performing teams scale without scaling headcount.</p>
              <p>And we've done it with AI that sounds, writes, and thinks like your best rep.</p>
            </div>
            
            <p className="font-bold text-lg italic mb-4">Sound too good to be true?</p>
            <p className="font-bold text-lg italic mb-6">That's what most people say—until they try it.</p>
            
            <p className="mb-6">Then they wonder how they ever did it the old way.</p>

            <a 
              href="https://cal.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#1eb853] text-white rounded-lg p-6 text-center block hover:bg-[#1ba548] transition-colors"
            >
              <p className="text-2xl font-bold">🔒 Lock In Your Free Demo Call Now</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueTestimonial;