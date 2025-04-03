const isDevelopment = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  error: (...args) => {
    // Always log errors in production, but with less detail
    if (isDevelopment) {
      console.error(...args);
    } else {
      // In production, only log the error message and timestamp
      const timestamp = new Date().toISOString();
      const errorMessage = args.map(arg => 
        arg instanceof Error ? arg.message : String(arg)
      ).join(' ');
      console.error(`[${timestamp}] ${errorMessage}`);
    }
  },
  warn: (...args) => {
    // Always log warnings
    if (isDevelopment) {
      console.warn(...args);
    } else {
      const timestamp = new Date().toISOString();
      const warnMessage = args.map(arg => String(arg)).join(' ');
      console.warn(`[${timestamp}] ${warnMessage}`);
    }
  },
  // Add other methods as needed
};
