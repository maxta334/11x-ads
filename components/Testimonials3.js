import Image from 'next/image';
import HighlightedText from '@/components/ui/highlighted-text';

const RevenueTestimonial = () => {
  return (
    <section className="bg-black py-6 md:py-10">
      <div className="container mx-auto px-4 sm:px-4 lg:px-6 max-w-3xl">
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-6 text-gray-800">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#1eb853] mb-4">But Here's The Best Part...</h3>
              
              {/* First Image - Sales Rep Overwhelmed */}
              <div className="mb-6">
                <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
                  <Image
                    src="/assets/images/gpt5.png"
                    alt="Overwhelmed sales rep with tasks"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <p className="mb-4">While traditional sales teams come with:</p>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Long onboarding cycles",
                  "$75K+ base salary + commission",
                  "Burnout, turnover, and constant retraining",
                  "Inconsistent follow-up and pipeline drop-off"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-800">
                    <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-red-500 rounded-full">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="font-bold text-lg mb-4">
                <HighlightedText text="Julian and Alice don't." />
              </p>
              <p className="text-lg mb-6">
                <HighlightedText text="They come ready to close from Day One." />
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "No salaries",
                  "No benefits",
                  "No training required",
                  "No missed follow-ups",
                  "No days off",
                  "No ego, no burnout, no BS"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-800">
                    <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-[#1eb853] rounded-full">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Handshake Image */}
              <div className="mb-6">
                <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
                  <Image
                    src="/assets/images/gpt6.png"
                    alt="Partnership between human and AI"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="font-bold text-lg mb-4">
                <HighlightedText text="You only pay when they perform." />
              </p>
              <p className="mb-6">There are no setup fees. No contracts. No upfront costs.</p>
              <p className="text-lg mb-8">
                <HighlightedText text="Just outcomes. Delivered automatically." />
              </p>

              <p className="text-[#1eb853] font-bold text-xl mb-2">"Sounds too good to be true..."</p>
              <p className="text-lg mb-8">That's what most revenue leaders say—until they start seeing booked meetings appear in their calendar while they sleep.</p>

              {/* Mission Control Image */}
              <div className="mb-6">
                <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
                  <Image
                    src="/assets/images/gpt7.png"
                    alt="AI mission control dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="font-bold text-xl mb-4">
                <HighlightedText text="Imagine this:" />
              </p>
              
              <ul className="space-y-4 mb-8 text-lg">
                <li>A pipeline that grows while your team sleeps</li>
                <li>Every stale lead re-engaged on autopilot</li>
                <li>Inbounds answered 24/7—without needing to hire</li>
                <li>SDR workflows that just work, forever</li>
              </ul>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold">
                  <HighlightedText text="Want to see it in action?" />
                </h3>
                <p>Book your free demo call today.</p>
                <p>No pitch. No pressure. Just proof.</p>
                <p>Let Julian and Alice show you what they can do.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold mb-2">
                  <HighlightedText text="And if you're not blown away within 60 days?" />
                </p>
                <p className="text-lg">We'll pay you $1,000 for wasting your time.</p>
              </div>

              <p className="text-center text-lg mb-8">📞 Click the button below to meet your first digital worker.</p>
            </div>

            <a 
              href="https://cal.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#1eb853] text-white rounded-lg p-6 text-center block hover:bg-[#17a045] transition-colors"
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