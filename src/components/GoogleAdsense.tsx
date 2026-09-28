"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export default function GoogleAdsense() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8251495052020406"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onError={(e) => {
        // Silently swallow ad-blocker network block errors
        console.warn("Google AdSense script was blocked by browser/ad-blocker.", e);
      }}
    />
  );
}
