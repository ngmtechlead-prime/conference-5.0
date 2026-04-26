import type { Metadata } from "next";
import { Epilogue, Archivo } from "next/font/google";
import Link from "next/link";
import { LayoutDashboard, FileText, LogOut } from "lucide-react";
import "../../globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NGM Admin Dashboard",
  description: "Admin dashboard for NGM applications",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-[#0F1990] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <Link href="/admin" className="font-bold text-lg">
                  NGM Admin
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-sm hover:text-gray-200 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/applications"
                    className="flex items-center gap-2 text-sm hover:text-gray-200 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Applications
                  </Link>
                </div>
              </div>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-2 text-sm hover:text-gray-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
