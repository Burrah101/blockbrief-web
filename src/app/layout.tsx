import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BlockBrief - Signal. No noise.",
  description: "Signal-driven crypto intelligence. Stay oriented, not addicted. Auto-published insights every 4 hours.",
  keywords: ["crypto", "blockchain", "bitcoin", "ethereum", "market intelligence", "defi", "web3"],
  openGraph: {
    title: "BlockBrief - Signal. No noise.",
    description: "Signal-driven crypto intelligence. Stay oriented, not addicted.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlockBrief - Signal. No noise.",
    description: "Signal-driven crypto intelligence. Stay oriented, not addicted.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans antialiased">
        <div className="max-w-[768px] mx-auto min-h-screen flex flex-col">
          {/* Top Navigation */}
          <nav className="sticky top-0 bg-black/95 backdrop-blur-sm z-50 py-4 border-b border-neutral-800">
            <div className="flex items-center justify-between px-4">
              {/* Logo */}
              <Link href="/" className="font-bold text-lg hover:text-gray-300 transition-colors">
                BlockBrief
              </Link>
              
              {/* Main Nav */}
              <div className="flex items-center gap-4 text-sm">
                <Link href="/brief" className="hover:text-gray-300 transition-colors">Brief</Link>
                <Link href="/alerts" className="hover:text-gray-300 transition-colors">Alerts</Link>
                <Link href="/agents" className="hover:text-gray-300 transition-colors">Agents</Link>
                <Link href="/sponsored" className="hover:text-gray-300 transition-colors">Sponsored</Link>
                <Link 
                  href="/advertise" 
                  className="px-3 py-1 bg-amber-500 text-black text-xs font-semibold rounded hover:bg-amber-600 transition-colors"
                >
                  Advertise
                </Link>
              </div>
            </div>
          </nav>

          {children}

          {/* Footer */}
          <footer className="border-t border-neutral-800 mt-auto">
            <div className="px-4 py-8">
              {/* Footer Links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <h4 className="font-bold text-sm mb-3">Product</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="/" className="hover:text-white transition-colors">The Current</Link></li>
                    <li><Link href="/brief" className="hover:text-white transition-colors">Live Brief</Link></li>
                    <li><Link href="/alerts" className="hover:text-white transition-colors">Alerts</Link></li>
                    <li><Link href="/agents" className="hover:text-white transition-colors">Agents</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-3">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                    <li><Link href="/advertise" className="hover:text-white transition-colors">Advertise</Link></li>
                    <li><Link href="/sponsored" className="hover:text-white transition-colors">Sponsors</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-3">Connect</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="https://twitter.com/blockbrief" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter/X</a></li>
                    <li><a href="https://blockbreif.substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Newsletter</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-3">Legal</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                    <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                  </ul>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-neutral-800 text-sm text-gray-500">
                <p>© BlockBrief 2025 · Signal-driven crypto intelligence</p>
                <p className="mt-2 md:mt-0">
                  <span className="font-semibold text-gray-400">Powered by Boost</span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
