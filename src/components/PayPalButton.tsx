"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export default function PayPalButton() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const initPayPal = () => {
    if (typeof window !== "undefined") {
      const paypal = (window as any).paypal;
      if (paypal && typeof paypal.Buttons === "function") {
        try {
          const container = document.getElementById("paypal-button-container");
          if (container) {
            container.innerHTML = "";
          }
          paypal
            .Buttons({
              style: {
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "paypal",
              },
              createOrder: (_data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "10.00",
                      },
                    },
                  ],
                });
              },
              onApprove: async (_data: any, actions: any) => {
                const details = await actions.order.capture();
                alert(`Transaction completed by ${details.payer.name.given_name}`);
              },
              onError: (err: any) => {
                console.error("PayPal Button Error:", err);
                setHasError(true);
              },
            })
            .render("#paypal-button-container");

          setIsLoaded(true);
        } catch (err) {
          console.error("PayPal render error:", err);
          setHasError(true);
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const paypal = (window as any).paypal;
      if (paypal && typeof paypal.Buttons === "function") {
        initPayPal();
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800">
      <Script
        src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"
        onLoad={initPayPal}
        onError={() => setHasError(true)}
        strategy="lazyOnload"
      />

      <div id="paypal-button-container" className="w-full max-w-xs min-h-[40px] flex items-center justify-center">
        {!isLoaded && !hasError && (
          <div className="text-slate-400 text-xs animate-pulse text-center py-3">
            Loading PayPal Button...
          </div>
        )}
        {hasError && (
          <div className="text-center py-2">
            <a
              href="https://www.paypal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:underline"
            >
              Pay via PayPal ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
