import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SlideProvider } from "@/contexts/SlideContext";
import { LogoController } from "@/components/LogoController";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "3 Layered - Premium 3D Printed Miniature Temples & Architectural Models | Pimpri-Chinchwad",
  description: "Museum-quality 3D printed miniature temples and architectural models. Sacred geometry, precision-engineered replicas of Asian architectural heritage. Custom 3D printing services in Pimpri-Chinchwad, Maharashtra.",
  keywords: [
    "3D printing services Pimpri-Chinchwad",
    "miniature temple models",
    "architectural model makers Maharashtra",
    "sacred geometry replicas",
    "Asian architectural heritage",
    "museum-quality 3D printing",
    "precision-engineered replicas",
    "custom 3D printing quote",
    "3D printed temples",
    "Asian pagoda models",
    "miniature fort replicas",
    "architectural heritage 3D printing"
  ],
  // TODO: Add Open Graph tags and JSON-LD structured data for LocalBusiness
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <AuthProvider>
          <SlideProvider>
            <LogoController />
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
            <Footer />
          </SlideProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
