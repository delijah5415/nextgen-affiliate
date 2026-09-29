"use client";

import Script from "next/script";

export default function GoogleAdsense() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8251495052020406"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onError={() => {
        console.warn(
          "Google AdSense was blocked by the browser, privacy protection, or an ad blocker."
        );
      }}
    />
  );
}