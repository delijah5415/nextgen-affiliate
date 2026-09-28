"use client";

import { useState } from "react";
import productsData from "../data/products.json";
import PayPalButton from "../components/PayPalButton"; // <-- Import PayPal Button

const categories = ["All", "Banking", "Fintech", "Software", "Crypto"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nicheTag.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header / Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              NextGen Affiliate
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct PayPal Payment / Support Button */}
            <PayPalButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs rounded-full uppercase tracking-wider font-semibold">
          Curated Micro Platform
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
          Handpicked Financial & Tech Offers for Niche Builders
        </h1>
        <p className="text-slate-400 mt-4 text-lg">
          Discover exclusive deals, high-reward banking accounts, and software tailored directly for your specific workflow.
        </p>

        <div className="mt-8 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search by niche, product, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm shadow-inner"
          />
        </div>
      </section>

      {/* Categories & Product List */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-20 flex-grow w-full">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            No offers found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-6 flex flex-col justify-between transition group hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl p-2 bg-slate-800/60 rounded-xl">
                        {product.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-300 text-sm">
                          {product.company}
                        </h3>
                        <span className="text-xs text-indigo-400 font-medium">
                          {product.nicheTag}
                        </span>
                      </div>
                    </div>
                    {product.badge && (
                      <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                    {product.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2 border border-slate-700 hover:border-indigo-500"
                >
                  <span>Explore Product</span>
                  <span>↗</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-8 text-center text-slate-500 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} NextGen Affiliate. Minimalist Directory.</p>
          <a
            href="mailto:partner@yourdomain.com?subject=Feature%20Request"
            className="text-slate-400 hover:text-indigo-400 transition"
          >
            Want your product featured? Submit a link →
          </a>
        </div>
      </footer>
    </div>
  );
}