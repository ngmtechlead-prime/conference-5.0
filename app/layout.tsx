import type { Metadata } from "next";
import { Epilogue, Archivo } from "next/font/google";
import "./globals.css";

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
      className={`${epilogue.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
