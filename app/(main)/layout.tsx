import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Epilogue, Archivo } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NGM - Nasir Giwa Mentorship Platform",
  description:
    "Empowering Nigerian Entrepreneurs: Mentorship, Funding, and Growth Opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${epilogue.variable} ${archivo.variable} h-full antialiased`}
    >
      <Analytics />
      <SpeedInsights />
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
