"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

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
  const [hasError, setHasError] = useState(false);

  const initPayPal = () => {
    if (window.paypal && window.paypal.HostedButtons) {
      try {
        const container = document.getElementById("paypal-container-8KQJ5C3KWJWYU");
        if (container) {
          container.innerHTML = ""; // Clear existing instance/loader
        }
        window.paypal
          .HostedButtons({
            hostedButtonId: "8KQJ5C3KWJWYU",
          })
          .render("#paypal-container-8KQJ5C3KWJWYU");
        setIsLoaded(true);
      } catch (err) {
        console.error("PayPal Hosted Buttons render error:", err);
        setHasError(true);
      }
    }
  };

  useEffect(() => {
    // Check if script was already cached/loaded on client navigation
    if (window.paypal && window.paypal.HostedButtons) {
      initPayPal();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-slate-900/60 rounded-xl border border-slate-800 min-h-[50px]">
      <Script
        src="https://www.paypal.com/sdk/js?client-id=sb&components=hosted-buttons&enable-funding=venmo"
        onLoad={initPayPal}
        onError={() => setHasError(true)}
        strategy="lazyOnload"
      />

      <div id="paypal-container-8KQJ5C3KWJWYU" className="w-full max-w-xs flex justify-center items-center">
        {!isLoaded && !hasError && (
          <div className="text-slate-400 text-xs animate-pulse py-1">
            Loading PayPal...
          </div>
        )}
        {hasError && (
          <a
            href="https://www.paypal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:underline py-1"
          >
            Pay with PayPal ↗
          </a>
        )}
      </div>
    </div>
  );
}
