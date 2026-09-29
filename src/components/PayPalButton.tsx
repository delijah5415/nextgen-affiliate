"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: {
        style?: {
          layout?: string;
          color?: string;
          shape?: string;
          label?: string;
        };
        createOrder: () => Promise<string>;
        onApprove: (data: {
          orderID: string;
        }) => Promise<void>;
        onCancel?: () => void;
        onError?: (error: unknown) => void;
      }) => {
        render: (container: HTMLElement) => Promise<void>;
        close?: () => Promise<void>;
      };
    };
  }
}

export default function PayPalButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<{
    close?: () => Promise<void>;
  } | null>(null);

  const initializedRef = useRef(false);

  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (!sdkLoaded || !clientId) {
      return;
    }

    if (initializedRef.current) {
      return;
    }

    const paypal = window.paypal;
    const container = containerRef.current;

    if (!paypal?.Buttons || !container) {
      return;
    }

    initializedRef.current = true;

    let cancelled = false;

    const initialize = async () => {
      try {
        const buttons = paypal.Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          },

          createOrder: async () => {
            const response = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const data = await response.json();

            if (!response.ok || !data.id) {
              throw new Error(
                data.error || "Unable to create PayPal order."
              );
            }

            return data.id;
          },

          onApprove: async (data) => {
            const response = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(
                result.error || "Unable to capture PayPal payment."
              );
            }

            if (!cancelled) {
              setCompleted(true);
            }
          },

          onCancel: () => {
            if (!cancelled) {
              setHasError(false);
            }
          },

          onError: (error) => {
            console.error("PayPal Button Error:", error);

            if (!cancelled) {
              setHasError(true);
            }
          },
        });

        if (cancelled) {
          return;
        }

        buttonsRef.current = buttons;

        await buttons.render(container);
      } catch (error) {
        console.error("PayPal render error:", error);

        if (!cancelled) {
          initializedRef.current = false;
          setHasError(true);
        }
      }
    };

    void initialize();

    return () => {
      cancelled = true;

      const buttons = buttonsRef.current;

      if (buttons?.close) {
        void buttons.close().catch(() => {
          // PayPal may already have cleaned up its iframe.
        });
      }

      buttonsRef.current = null;
      initializedRef.current = false;
    };
  }, [sdkLoaded, clientId]);

  if (!clientId) {
    return (
      <div className="w-full p-4 rounded-xl border border-amber-800/50 bg-amber-950/30 text-amber-300 text-sm">
        PayPal is temporarily unavailable because the payment configuration
        is incomplete.
      </div>
    );
  }

  if (completed) {
    return (
      <div
        role="status"
        className="w-full p-5 rounded-xl border border-emerald-800/50 bg-emerald-950/30 text-center"
      >
        <p className="text-emerald-400 font-semibold">
          Thank you for your support.
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Your PayPal payment was completed successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800">
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
          clientId
        )}&currency=USD&components=buttons`}
        strategy="afterInteractive"
        onLoad={() => {
          setSdkLoaded(true);
        }}
        onError={() => {
          console.error("Unable to load the PayPal JavaScript SDK.");
          setHasError(true);
        }}
      />

      <div
        ref={containerRef}
        className="w-full max-w-xs min-h-[45px] flex items-center justify-center"
      />

      {!sdkLoaded && !hasError && (
        <div className="text-slate-400 text-xs animate-pulse text-center py-3">
          Loading PayPal...
        </div>
      )}

      {hasError && (
        <div className="text-center py-3">
          <p className="text-slate-400 text-xs mb-2">
            PayPal could not be loaded right now.
          </p>

          <a
            href="https://www.paypal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:underline"
          >
            Open PayPal
          </a>
        </div>
      )}
    </div>
  );
}