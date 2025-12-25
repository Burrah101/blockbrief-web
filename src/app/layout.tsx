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
          {children}
          <footer className="text-sm text-gray-500 text-center py-8 mt-auto">
            <p>© Blockbreif 2025 · Built for real-time crypto signal delivery</p>
            <p>Contact: sansingh77@gmail.com</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="/" className="underline">Home</a>
              <a href="/brief" className="underline">Brief</a>
              <a href="/alerts" className="underline">Alerts</a>
              <a href="/agents" className="underline">Agents</a>
              <a href="/about" className="underline">About</a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
