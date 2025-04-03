import Link from 'next/link';
import { LightningLogo } from "@/components/Icons";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-[#212121] py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <LightningLogo className="w-8 h-8" />
            <span className="text-white text-xl font-black" style={{ fontFamily: 'Bricolage Grotesque' }}>
              CookFast
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/" className="text-green-500 hover:text-green-400 mb-8 inline-block">
          ← Back
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8">Terms and Conditions</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <h3 className="text-xl text-red-400 font-bold mb-3">⚠️ Zero Tolerance Policy</h3>
              <p className="text-red-300 font-medium">
                Each CookFast license is strictly tied to a single user account. We employ advanced monitoring systems 
                to detect unauthorized sharing, redistribution, or reselling of our boilerplate code. Any violation 
                will result in immediate account termination and aggressive legal action. Don&apos;t risk it - we take 
                our intellectual property rights extremely seriously.
              </p>
            </div>
            <p>
              By using CookFast you confirm your acceptance of, and agree to be bound by, these terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Agreement to Terms and Conditions</h2>
            <p>
              This Agreement takes effect on the date on which you first use the CookFast application. By accessing 
              the repository, you explicitly agree to keep all code and materials strictly confidential and for your 
              personal use only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Unlimited Access Software License with Termination Rights</h2>
            <p className="space-y-4">
              <span className="block">
                The CookFast Software License facilitates the acquisition of CookFast software through a single purchase, 
                granting users unrestricted and perpetual access to its comprehensive functionalities. Tailored for independent 
                creators, entrepreneurs, and small businesses, CookFast empowers users to create compelling mobile and web applications.
              </span>
              <span className="block">
                This license entails a straightforward and flexible arrangement, exempting users from recurring fees or subscriptions. 
                However, it is important to acknowledge that the licensor retains the right to terminate the license without conditions 
                or prerequisites. This termination provision enables the licensor to exercise control over software distribution and utilization.
              </span>
              <span className="block">
                Opting for the CookFast Software License enables users to enjoy the benefits of the software while recognizing the 
                licensor&apos;s unrestricted termination rights, which provide adaptability and address potential unforeseen circumstances.
              </span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Refunds</h2>
            <p>
              Due to the nature of digital products, the CookFast boilerplate cannot be refunded or exchanged once access is granted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Disclaimer</h2>
            <p>
              It is not warranted that CookFast will meet your requirements or that its operation will be uninterrupted or error free. 
              All express and implied warranties or conditions not stated in this Agreement (including without limitation, loss of profits, 
              loss or corruption of data, business interruption or loss of contracts), so far as such exclusion or disclaimer is permitted 
              under the applicable law are excluded and expressly disclaimed. This Agreement does not affect your statutory rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Warranties and Limitation of Liability</h2>
            <p>
              CookFast does not give any warranty, guarantee or other term as to the quality, fitness for purpose or otherwise of the software. 
              CookFast shall not be liable to you by reason of any representation (unless fraudulent), or any implied warranty, condition or 
              other term, or any duty at common law, for any loss of profit or any indirect, special or consequential loss, damage, costs, 
              expenses or other claims (whether caused by CookFast&apos;s negligence or the negligence of its servants or agents or otherwise) 
              which arise out of or in connection with the provision of any goods or services by CookFast. CookFast shall not be liable or 
              deemed to be in breach of contract by reason of any delay in performing, or failure to perform, any of its obligations if the 
              delay or failure was due to any cause beyond its reasonable control. Notwithstanding contrary clauses in this Agreement, in the 
              event that CookFast are deemed liable to you for breach of this Agreement, you agree that CookFast&apos;s liability is limited 
              to the amount actually paid by you for your services or software, which amount calculated in reliance upon this clause. You hereby 
              release CookFast from any and all obligations, liabilities and claims in excess of this limitation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Responsibilities</h2>
            <p>
              CookFast is not responsible for what the user does with the user-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Price Adjustments</h2>
            <p>
              As we continue to improve CookFast and expand our offerings, the price may increase. The discount is provided to help 
              customers secure the current price without being surprised by future increases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. General Terms and Law</h2>
            <p>
              This Agreement is governed by the laws of California. You acknowledge that no joint venture, partnership, employment, 
              or agency relationship exists between you and CookFast as a result of your use of these services. You agree not to 
              hold yourself out as a representative, agent or employee of CookFast. You agree that CookFast will not be liable by 
              reason of any representation, act or omission to act by you.
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            Last updated: January 1, 2025
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#212121] py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            Return to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
