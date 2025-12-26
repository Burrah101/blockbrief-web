import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blockbreif",
  description: "Signal. No noise.",
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
          <nav className="sticky top-0 bg-black z-50 py-4 flex justify-center gap-6 border-b border-neutral-800 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="/brief" className="hover:underline">Brief</a>
            <a href="/alerts" className="hover:underline">Alerts</a>
            <a href="/agents" className="hover:underline">Agents</a>
            <a href="/about" className="hover:underline">About</a>
          </nav>

          {children}

          <footer className="text-sm text-gray-500 text-center py-8 mt-auto">
            <p>© Blockbreif 2025 · Built for real-time crypto signal delivery</p>
            <p className="font-bold mt-1">Powered by Boost</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
