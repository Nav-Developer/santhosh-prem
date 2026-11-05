import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat, Big_Shoulders } from "next/font/google";

import ThemeRegistry from "@/theme/ThemeRegistry";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://santhoshprem.fit"),
  title: "Fitness Influence | Santhosh Prem",
  description: "Personal fitness training and coaching by Santhosh Prem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${montserrat.variable} ${display.variable}`}
    >
      <body>
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
