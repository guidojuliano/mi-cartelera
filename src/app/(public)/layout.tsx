import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "../../context/ThemeContext";
import Navbar from "app/components/Navbar/Navbar";
import ThemeBackground from "app/components/ThemeBackground";
import { ReactQueryProvider } from "app/components/ReactQueryProvider";
import { Footer } from "app/components/Footer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "miCartelera.com.ar / El cine en Chaco y Corrientes",
    description: "El cine en Corrientes y Resistencia",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <ThemeProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="relative flex min-h-screen flex-col">
              <ThemeBackground />
              <div className="relative z-10">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </div>
          </body>
        </ThemeProvider>
      </ReactQueryProvider>
    </html>
  );
}
