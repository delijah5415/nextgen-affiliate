import dynamic from "next/dynamic";
import productsData from "@/data/products.json";

// Disable SSR for PayPal button to prevent ad-blocker hydration crashes
const PayPalButton = dynamic(() => import("@/components/PayPalButton"), {
  ssr: false,
  loading: () => (
    <div className="w-full text-center py-3 text-xs text-slate-400 animate-pulse">
      Loading payment options...
    </div>
  ),
});

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          Curated Tech & Financial Tools
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          Discover hand-picked platforms, business software, and exclusive affiliate deals.
        </p>
      </section>

      {/* Featured Products */}
      <section id="featured" className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-800 pb-2">
          Featured Directory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map((product: any) => (
            <div
              key={product.id}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-800/50">
                  {product.category || "Tool"}
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-3 mb-2">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                {product.link && (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-600/20 text-sm"
                  >
                    Visit Website ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Payment / Support Section */}
      <section className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-100">Support Platform Development</h3>
        <p className="text-slate-400 text-sm">
          Support our work directly via PayPal or Venmo.
        </p>
        <PayPalButton />
      </section>
    </div>
  );
}
