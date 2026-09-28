"use client";

import Script from "next/script";
import { useState } from "react";

// Extend global window interface for TypeScript
declare global {
  interface Window {
    paypal?: {
      HostedButtons: (config: { hostedButtonId: string }) => {
        render: (containerSelector: string) => void;
      };
    };
  }
}

export default function PayPalButton() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleScriptLoad = () => {
    setIsLoaded(true);
    if (window.paypal && window.paypal.HostedButtons) {
      window.paypal
        .HostedButtons({
          hostedButtonId: "8KQJ5C3KWJWYU",
        })
        .render("#paypal-container-8KQJ5C3KWJWYU");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800">
      {/* PayPal SDK Script with Hosted Buttons component enabled */}
      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAA&components=hosted-buttons&enable-funding=venmo"
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />

      {/* Target Container where PayPal renders the button */}
      <div id="paypal-container-8KQJ5C3KWJWYU" className="min-h-[50px] w-full max-w-xs flex justify-center">
        {!isLoaded && (
          <div className="text-slate-400 text-sm animate-pulse py-2">
            Loading PayPal Button...
          </div>
        )}
      </div>
    </div>
  );
}