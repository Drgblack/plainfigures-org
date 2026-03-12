import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy paths still linked externally. These aliases must never appear in sitemap output or canonicals.
      { source: "/professional-tools/pmg/scr", destination: "/scr", permanent: true },
      { source: "/professional-tools/pmg/cyber", destination: "/cyber", permanent: true },
      { source: "/professional-tools/pmg/business-interruption", destination: "/bi", permanent: true },
      { source: "/professional-tools/pmg/bi", destination: "/bi", permanent: true },

      // Temporary alias redirects for externally shared legacy slugs. Keep these out of internal links and sitemap files.
      { source: "/zinseszinsrechner", destination: "/compound?lang=de", permanent: false },
      { source: "/netto-gehaltsrechner", destination: "/take-home?lang=de", permanent: false },
      { source: "/hypotheken-rueckzahlungsrechner", destination: "/mortgage?lang=de", permanent: false },
    ];
  },
};

export default nextConfig;
