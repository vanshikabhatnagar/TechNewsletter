import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Technology, AI & Innovation OBN – Events & Newsletter",
  description: "Stay updated with the latest tech events, AI innovation seminars, and networking opportunities at the University of Oxford",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative overflow-x-hidden`}>
        {/* Dark gradient background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 -z-10"></div>
        
        {/* Background patterns and effects */}
        <div className="fixed inset-0 bg-pattern bg-grid circuit-pattern -z-10 opacity-40"></div>
        
        {/* Animated gradient orbs */}
        <div className="fixed top-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl orb -z-10"></div>
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl orb -z-10" style={{ animationDelay: '10s' }}></div>
        <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl orb -z-10" style={{ animationDelay: '5s' }}></div>
        
        {/* Grid overlay */}
        <div className="fixed inset-0 bg-grid -z-10 opacity-20"></div>
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-0">
          <nav className="mb-8 flex items-center justify-between backdrop-blur-md bg-white/10 rounded-2xl px-6 py-4 shadow-lg border border-white/10">
            <a href="/" className="text-lg font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
            Technology, AI & Innovation OBN
            </a>
            <div className="flex items-center gap-6 text-sm font-medium">
              <a href="/" className="text-slate-300 hover:text-white transition-colors">List View</a>
              <a href="/calendar" className="text-slate-300 hover:text-white transition-colors">Calendar</a>
            </div>
          </nav>
          {children}
          <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400 text-center">
            <p className="mb-1">Data sourced from Google Sheets • Updates may take a few minutes to appear</p>
            <p className="text-slate-500">University of Oxford • Tech Society Newsletter</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
