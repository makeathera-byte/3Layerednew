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
  title: "3 Layered - Premium 3D Printing Services",
  description: "Transform your ideas into reality with precision 3D printing. Custom prototypes, functional components, and manufacturing excellence.",
  keywords: ["3D printing", "custom manufacturing", "prototypes", "precision printing"],
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
