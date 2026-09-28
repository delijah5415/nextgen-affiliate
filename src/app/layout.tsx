import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextGen Affiliate | Micro Platform",
  description: "Curated affiliate directory and micro platform for tech & financial tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8251495052020406"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
