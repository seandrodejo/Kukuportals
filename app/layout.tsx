import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- ELITE META DATA ---
export const metadata: Metadata = {
  title: "Kuku Portals | High-Velocity Funnel Architecture",
  description: "Elite digital infrastructure and conversion funnels engineered for high-ticket acquisition. Operator: Sean.",
  icons: {
    icon: '/kuku.png', // This changes the browser tab to your logo
  },
  openGraph: {
    title: "Kuku Portals | Strategic Deployment",
    description: "We don't build websites. We build 6-figure revenue infrastructures.",
    url: "https://www.yourdomain.com", // Add your real domain here
    siteName: "Kuku Portals",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200", // This will show as the thumbnail in DMs
        width: 1200,
        height: 630,
        alt: "Kuku Portals Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}