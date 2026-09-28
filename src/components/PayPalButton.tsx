"use client";

import Script from "next/script";
import { useState } from "react";

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
    <div className="flex flex-col items-center justify-center p-2 bg-slate-900/60 rounded-xl border border-slate-800">
      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAA&components=hosted-buttons&enable-funding=venmo"
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />
      <div id="paypal-container-8KQJ5C3KWJWYU" className="min-h-[40px] w-full max-w-xs flex justify-center items-center">
        {!isLoaded && (
          <div className="text-slate-400 text-xs animate-pulse py-1">
            Loading PayPal...
          </div>
        )}
      </div>
    </div>
  );
}
