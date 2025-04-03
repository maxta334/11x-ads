import Link from 'next/link';
import { LightningLogo } from "@/components/Icons";

export default function License() {
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
        
        <h1 className="text-4xl font-bold text-white mb-8">CookFast Boilerplate License Agreement</h1>
        
        <div className="space-y-8 text-gray-300">
          <p>
            This License Agreement (&quot;Agreement&quot;) is entered into between CookFast, whose contact information 
            is cookfast965@gmail.com, and you, the user (&quot;Licensee&quot;), regarding the use of the CookFast coding 
            boilerplate (the &quot;Product&quot;). By downloading, accessing, or using the Product, Licensee agrees to 
            be bound by the terms and conditions of this Agreement.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Grant of License</h2>
            
            <div className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <h3 className="text-xl text-red-400 font-bold mb-3">⚠️ Important Legal Warning</h3>
                <p className="text-red-300 font-medium">
                  This license is strictly for single-user, personal use only. Any unauthorized sharing, redistribution, 
                  reselling, or cloning of the CookFast boilerplate or repository will result in immediate legal action. 
                  We actively monitor for violations and will pursue all legal remedies, including monetary damages.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-white mb-3">1.1 License Terms</h3>
                <p className="mb-3">
                  Subject to the terms and conditions of this Agreement, CookFast grants Licensee a non-exclusive, 
                  non-transferable, and non-sublicensable License to use the CookFast coding boilerplate 
                  for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create unlimited projects.</li>
                  <li>Build and develop applications or websites for personal use or commercial use.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Restrictions</h2>
            <p className="mb-3">Licensee shall not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Resell or redistribute the CookFast boilerplate as a standalone product.</li>
              <li>Remove, alter, or obscure any copyright, trademark, or other proprietary notices from the CookFast boilerplate.</li>
              <li>Use the CookFast boilerplate in any way that violates applicable laws, regulations, or third-party rights.</li>
              <li>Sub-license, rent, lease, or transfer the CookFast boilerplate or any rights granted under this Agreement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Ownership and Intellectual Property</h2>
            <p>
              CookFast retains all ownership and intellectual property rights in and to the CookFast boilerplate. 
              This Agreement does not grant Licensee any ownership rights in the CookFast boilerplate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Warranty and Disclaimer</h2>
            <p>
              THE CookFast BOILERPLATE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR 
              IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
              PURPOSE, OR NONINFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CookFast SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO THE USE OR INABILITY 
              TO USE THE CookFast BOILERPLATE, EVEN IF CookFast HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Governing Law and Jurisdiction</h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of California, without regard 
              to its conflict of law principles. Any dispute arising out of or in connection with this Agreement shall be 
              subject to the exclusive jurisdiction of the courts located in California.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Entire Agreement</h2>
            <p>
              This Agreement constitutes the entire agreement between Licensee and CookFast concerning the subject matter 
              herein and supersedes all prior or contemporaneous agreements, representations, warranties, and understandings.
            </p>
          </section>

          <div className="border-t border-gray-800 pt-8 mt-12">
            <p className="text-sm text-gray-400">Last updated: January 1, 2025</p>
            <div className="mt-4">
              <p className="font-medium text-white">CookFast</p>
              <p className="text-sm text-gray-400">Contact Information: cookfast965@gmail.com</p>
            </div>
          </div>
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
