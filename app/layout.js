import { Inter } from "next/font/google";
import { getSEOTags } from "@/lib/seo";
import ClientLayout from "@/components/LayoutClient";
import { SupabaseProvider } from "@/lib/supabase/client";
import config from "@/config";
import "./globals.css";
import Script from 'next/script'

const font = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = {
  ...getSEOTags(),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.jpg',
    other: {
      rel: 'icon',
      url: '/favicon.ico',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://i.imgur.com" />
        <link rel="preconnect" href="https://client.crisp.chat" />
        
        {/* Preload critical images */}
        <link
          rel="preload"
          href="/assets/images/stack.png"
          as="image"
          type="image/png"
        />
      </head>
      <body className="overflow-x-hidden">
        <SupabaseProvider>
          <ClientLayout>{children}</ClientLayout>
        </SupabaseProvider>

        {/* Move heavy scripts to bottom */}
        <Script
          src="https://client.crisp.chat"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
