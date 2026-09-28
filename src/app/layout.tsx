import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextGen Affiliate | Premium Tech & Financial Tools Directory",
  description: "Discover curated tech tools, SaaS platforms, and exclusive financial software deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Safely load Google AdSense without crashing hydration if blocked */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8251495052020406"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
        
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-extrabold text-xl tracking-tight">
                NextGen<span className="text-indigo-400 font-normal">Affiliate</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-indigo-400 transition-colors">
                Home
              </Link>
              <a href="#featured" className="hover:text-indigo-400 transition-colors">
                Directory
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <a
                href="#featured"
                className="text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all shadow-md shadow-indigo-500/20"
              >
                Explore Directory
              </a>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900/60 border-t border-slate-800/80 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-slate-100 text-base mb-3">
                  NextGen Affiliate
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Your trusted directory for discovering top-rated financial platforms and developer tools.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-200 text-sm mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
                  <li><a href="#featured" className="hover:text-indigo-400 transition-colors">Featured Deals</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-200 text-sm mb-3">System Status</h4>
                <div className="flex items-center space-x-2 text-sm text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>All Systems Operational</span>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-normal">
                  Disclosure: Some links on this site may earn us an affiliate commission at no extra cost to you.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
              <p>&copy; {new Date().getFullYear()} NextGen Affiliate. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
