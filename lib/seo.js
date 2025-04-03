import config from "@/config";
import { LEMONSQUEEZY } from "@/config";

/**
 * Generate comprehensive SEO tags for pages
 * @param {Object} options - SEO configuration options
 * @returns {Object} Next.js metadata object
 */
export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  robots,
  verification,
  extraTags,
} = {}) => {
  const defaultTitle = title || config.appName;
  const defaultDescription = description || config.appDescription;
  const baseUrl = `https://${config.domainName}`;

  return {
    // Basic Metadata
    title: defaultTitle,
    description: defaultDescription,
    keywords: keywords || [config.appName, "boilerplate", "starter kit", "template", "codebase"],
    applicationName: config.appName,
    authors: [{ name: "CookFast Team" }],
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    
    // Base URL for metadata
    metadataBase: new URL(baseUrl),

    // Open Graph
    openGraph: {
      title: openGraph?.title || defaultTitle,
      description: openGraph?.description || defaultDescription,
      url: openGraph?.url || baseUrl,
      siteName: openGraph?.siteName || defaultTitle,
      images: [
        {
          url: `${baseUrl}/assets/images/1.jpeg`,
          width: 1200,
          height: 630,
          alt: config.appName,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      site: "@CookFast",
      creator: "@CookFast",
      title: openGraph?.title || defaultTitle,
      description: openGraph?.description || defaultDescription,
      images: [`${baseUrl}/assets/images/1.jpeg`],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      ...robots,
    },

    // Verification
    verification: {
      google: verification?.google,
      yandex: verification?.yandex,
      yahoo: verification?.yahoo,
      other: verification?.other,
    },

    // Icons
    icons: {
      icon: "/assets/images/logo.png",
      shortcut: "/assets/images/logo.png",
      apple: "/assets/images/logo.png",
      other: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/assets/images/logo.png",
        },
      ],
    },

    // Manifest
    manifest: "/manifest.json",

    // Canonical URL
    ...(canonicalUrlRelative && {
      alternates: { 
        canonical: canonicalUrlRelative,
        languages: {
          "en-US": `${baseUrl}${canonicalUrlRelative}`,
        },
      },
    }),

    // Additional tags
    ...extraTags,
  };
};

/**
 * Generate structured data for rich results in search engines
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
export const renderSchemaTags = () => {
  const boilerplanVariant = LEMONSQUEEZY.boilerplate.variantId
    ? config.lemonsqueezy.products.boilerplate.variants.find(
        v => v.id === LEMONSQUEEZY.boilerplate.variantId
      )
    : null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: config.appName,
          description: config.appDescription,
          image: `https://${config.domainName}/assets/images/1.jpeg`,
          url: `https://${config.domainName}/`,
          applicationCategory: "Boilerplate",
          offers: [
            boilerplanVariant && {
              "@type": "Offer",
              name: boilerplanVariant.name,
              price: boilerplanVariant.price,
              priceCurrency: "USD",
              priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              availability: "https://schema.org/InStock",
            },
          ].filter(Boolean),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "530000",
            bestRating: "5",
            worstRating: "1",
          },
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Michael Thompson",
            },
            reviewBody: "Excellent boilerplate! Saved me countless hours of setup and configuration!",
          },
          creator: {
            "@type": "Organization",
            name: config.appName,
            url: `https://${config.domainName}/`,
          },
          datePublished: "2024-01-01",
          dateModified: new Date().toISOString(),
        }),
      }}
    />
  );
};

export const viewport = {
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover"
};
