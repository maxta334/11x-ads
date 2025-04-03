import { logger } from "./lib/logger";

const config = {
  appName: "CookFast", 
  appDescription: "The ultimate Expo boilerplate.",
  domainName: "cookfast.dev",
  lemonsqueezy: {
    storeId: "132644",
    products: {
      boilerplate: {
        id: "461136",
        variants: [
          {
            id: 713019,
            name: "Boilerplate"
          }
        ]
      }
    }
  },
  crisp: {
    id: "",
    onlyShowOnRoutes: ["/"],
  },
  mailgun: {
    subdomain: "mg",
    fromNoReply: `CookFast <noreply@mg.CookFast.xyz>`,
    fromAdmin: `Support at CookFast <cookfast965@gmail.com>`,
    supportEmail: "cookfast965@gmail.com",
    forwardRepliesTo: "cookfast965@gmail.com",
  },
  colors: {
    theme: "mytheme",
    main: "#1eb853",
  },
  auth: {
    loginUrl: "/signin",
    callbackUrl: "/dashboard", 
  },
};

logger.log(
  "[CONFIG] Loading LEMONSQUEEZY config with products:",
  config.lemonsqueezy.products
);

export const LEMONSQUEEZY = {
  storeId: config.lemonsqueezy.storeId,
  boilerplate: {
    productId: config.lemonsqueezy.products.boilerplate.id,
    variantId: config.lemonsqueezy.products.boilerplate.variants[0].id
  },
  webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/lemonsqueezy`,
  checkoutSuccess: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  checkoutCancel: `${process.env.NEXT_PUBLIC_APP_URL}/`,
};

logger.log("[CONFIG] LEMONSQUEEZY config initialized:", LEMONSQUEEZY);

export const AUTH_PROVIDERS = {
  google: {
    enabled: true,
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

export default config;
