import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy professional-tool paths still linked externally.
      { source: "/professional-tools/pmg/scr", destination: "/scr", permanent: true },
      { source: "/professional-tools/pmg/cyber", destination: "/cyber", permanent: true },
      { source: "/professional-tools/pmg/business-interruption", destination: "/bi", permanent: true },
      { source: "/professional-tools/pmg/bi", destination: "/bi", permanent: true },

      // German slug aliases
      { source: "/zinseszinsrechner", destination: "/compound?lang=de", permanent: false },
      { source: "/netto-gehaltsrechner", destination: "/take-home?lang=de", permanent: false },
      { source: "/hypotheken-rueckzahlungsrechner", destination: "/mortgage?lang=de", permanent: false },
    ];
  },
};

export default nextConfig;
