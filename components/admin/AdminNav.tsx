"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  TicketCheck,
} from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return null;
  }

  return (
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
              <Link
                href="/admin/registrations"
                className="flex items-center gap-2 text-sm hover:text-gray-200 transition-colors"
              >
                <TicketCheck className="w-4 h-4" />
                Registrations
              </Link>
              <Link
                href="/admin/contact"
                className="flex items-center gap-2 text-sm hover:text-gray-200 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Messages
              </Link>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ redirectTo: "/admin/login" })}
            className="flex items-center gap-2 text-sm hover:text-gray-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
