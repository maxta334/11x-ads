import Link from 'next/link';
import { LightningLogo } from "@/components/Icons";

export default function PrivacyPolicy() {
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
        
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300">
          <p>
            Your privacy is important to us. It is CookFast&apos;s policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 my-6">
            <h3 className="text-xl text-yellow-400 font-bold mb-3">Repository Access Monitoring</h3>
            <p className="text-yellow-300">
              To protect our intellectual property rights, we monitor repository access patterns, sharing attempts, 
              and usage analytics. This includes tracking repository clones, access frequency, and potential redistribution 
              attempts. Any detected violation of our single-user license terms will be investigated and may result in 
              legal action.
            </p>
          </div>

          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we&apos;re collecting it and how it will be used.
          </p>

          <p>
            You can sign up with your Google account so your CookFast&apos;s account username will be prefilled with your name and your public profile picture.
          </p>

          <p>
            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we&apos;ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
          </p>

          <p>
            We don&apos;t share any personally identifying information publicly or with third-parties, except when required to by law.
          </p>

          <p>
            We act in the capacity of a business under the California Consumer Privacy Act (CCPA) and comply with California privacy laws. California residents have specific rights regarding their personal information, including the right to know what personal information is collected, request deletion of their data, and opt out of the sale of their personal information.
          </p>

          <p>
            Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
          </p>

          <p>
            You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
          </p>

          <p>
            Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us at{' '}
            <a href="mailto:cookfast965@gmail.com" className="text-green-500 hover:text-green-400">
              cookfast965@gmail.com
            </a>
          </p>

          <p className="text-sm text-gray-400 mt-8">
            This policy is effective as of January 1, 2025.
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