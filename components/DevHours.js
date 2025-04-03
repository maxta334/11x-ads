import Image from 'next/image';

const DevHours = () => {
  const features = [
    {
      number: "01",
      title: "We're Built for",
      highlightedTitle: "Modern Sales Teams",
      points: [
        "No hiring delays",
        "No burnout or turnover",
        "Full pipeline coverage — 24/7"
      ],
      tagline: "🧑‍🚀 Alice and Julian don't sleep. They scale with you instantly.",
      imagePosition: "right",
      emoji: "🔢"
    },
    {
      number: "02",
      title: "Outcome-Driven AI,",
      highlightedTitle: "Not Another Tool",
      points: [
        "Alice books meetings autonomously",
        "Julian handles calls and lead follow-up",
        "Trained on your ICP, tone, and pitch"
      ],
      tagline: "🚀 We don't sell seats. We deliver outcomes.",
      imagePosition: "left",
      emoji: "🔢"
    },
    {
      number: "03",
      title: "Enterprise-Ready,",
      highlightedTitle: "Fully Integrated",
      points: [
        "SOC 2-compliant security",
        "Works with your CRM, calendar & email",
        "Deployment in days — not months"
      ],
      tagline: "🔐 Digital workers that meet the highest standards of trust and compliance.",
      imagePosition: "right",
      emoji: "🔢"
    },
    {
      number: "04",
      title: "Ridiculous ROI",
      highlightedTitle: "(Without Adding Headcount)",
      points: [
        "$10M+ ARR generated in 12 months",
        "80+ meetings/week booked by Alice",
        "Cost of 1 SDR = 3 digital workers"
      ],
      tagline: "📈 Finally, scale sales without scaling hiring.",
      imagePosition: "left",
      emoji: "🔢"
    }
  ];

  return (
    <section className="bg-[#212121] py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <p className="text-[#1eb853] font-medium uppercase tracking-wider mb-2">🧠 The Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Here's What Makes Us Different:
          </h2>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#2a2a2a] rounded-lg shadow-md overflow-hidden">
              <div className={`flex flex-col ${feature.imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch`}>
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-[#1eb853] text-white text-xs font-medium px-2.5 py-1 rounded uppercase">
                      {feature.emoji} Number {feature.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-5">
                    {feature.title}{' '}
                    <span className="text-[#1eb853]">
                      {feature.highlightedTitle}
                    </span>
                  </h3>
                  <ul className="space-y-3 mb-5">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-[#1eb853] rounded-full">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#1eb853] font-medium mt-auto">{feature.tagline}</p>
                </div>
                <div className="lg:w-[40%] relative bg-[#1a1a1a] flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                  <span className="text-gray-600 absolute">Image {feature.number}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://cal.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center bg-[#1eb853] hover:bg-[#17a045] text-white font-semibold rounded-lg px-8 py-4 transition-colors text-lg"
          >
            🔒 Lock In Your Free Demo Call Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default DevHours; 