/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 1080, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.discordapp.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 3600,
  },
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
    emotion: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/lib': path.resolve(__dirname, 'lib')
    };

    if (!dev && !isServer) {
      config.optimization.concatenateModules = true;
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';

      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 30000,
        maxSize: 180000,
        maxAsyncRequests: 20,
        cacheGroups: {
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|next|@mui)[\\/]/,
            name: 'framework',
            priority: 50,
            reuseExistingChunk: true,
            enforce: true
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 40,
            reuseExistingChunk: true
          }
        }
      };

      // Remove ModuleConcatenationPlugin if it exists (already enabled in Next.js 14+)
      config.plugins = config.plugins.filter(
        plugin => plugin.constructor.name !== 'ModuleConcatenationPlugin'
      );

      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      );
    }

    return config;
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizeServerReact: true,
    adjustFontFallbacks: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material']
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()'
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://*.googleusercontent.com https://client.crisp.chat https://checkout.lemonsqueezy.com https://www.youtube.com https://s.ytimg.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob: https: https://*.crisp.chat https://*.imgur.com https://*.ytimg.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://*.supabase.co https://api.lemonsqueezy.com https://*.crisp.chat wss://*.crisp.chat;
              frame-src 'self' https://checkout.lemonsqueezy.com https://*.supabase.co https://go.crisp.chat https://www.youtube.com https://youtube.com;
              media-src 'self' blob: https://*.crisp.chat https://*.imgur.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=59',
          },
        ]
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp)',
        headers: [{
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }]
      },
      {
        source: '/_next/image/:path*',
        headers: [{
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }]
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
