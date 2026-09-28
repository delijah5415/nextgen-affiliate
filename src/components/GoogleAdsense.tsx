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
    <div id="google-adsense-container" suppressHydrationWarning>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8251495052020406"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onError={(e) => {
          // Catch and ignore expected ad-blocker network blocks
          console.warn("Google AdSense script was blocked by client/ad-blocker.", e);
        }}
      />
    </div>
  );
}
