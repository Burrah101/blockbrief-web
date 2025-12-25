import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"; // Updated fonts
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Blockbreif",
  description: "Crypto market briefs and alerts in under 60 seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-black font-sans text-white antialiased overflow-x-hidden selection:bg-white/20`}>
        {/* Subtle Background Grid */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(circle_800px_at_50%_200px,#ffffff05,transparent)]"></div>
        {children}
      </body>
    </html>
  );
}
