"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Mail, MailOpen, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filter === "unread") params.set("isRead", "false");
      if (filter === "read") params.set("isRead", "true");
      params.set("page", page.toString());

      const res = await fetch(`/api/admin/contact?${params}`);
      const data = await res.json();
      setMessages(data.messages ?? []);
      setPagination(data.pagination);
      setUnreadCount(data.unreadCount ?? 0);
    } catch (error) {
      console.error("Failed to fetch contact messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search, filter, page]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function handleSelect(msg: ContactMessage) {
    setSelected(msg);
    if (!msg.isRead) {
      await fetch(`/api/admin/contact/${msg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setSelected({ ...msg, isRead: true });
    }
  }

  function handleFilterChange(value: "all" | "unread" | "read") {
    setFilter(value);
    setPage(1);
    setSelected(null);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
    setSelected(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-600 mt-1">
          {unreadCount > 0
            ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
            : "All messages read"}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or subject…"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F1990]/30"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-white text-[#0F1990] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Message list */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1990]" />
              </div>
            ) : messages.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <Mail className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No messages found</p>
              </div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors ${
                    selected?.id === msg.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5 shrink-0">
                        {msg.isRead ? (
                          <MailOpen className="w-4 h-4 text-gray-400" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#0F1990] mt-1" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-sm truncate ${
                            msg.isRead
                              ? "text-gray-700"
                              : "font-semibold text-gray-900"
                          }`}
                        >
                          {msg.fullName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {msg.email}
                        </p>
                        <p
                          className={`text-sm mt-0.5 truncate ${
                            msg.isRead ? "text-gray-500" : "text-gray-800"
                          }`}
                        >
                          {msg.subject}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 mt-0.5">
                      {new Date(msg.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.totalPages} &middot;{" "}
                {pagination.total} message{pagination.total !== 1 ? "s" : ""}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pagination.page <= 1}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={pagination.page >= pagination.totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-96 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <div className="flex items-start justify-between gap-2 mb-4">
                <h2 className="text-base font-semibold text-gray-900 leading-snug">
                  {selected.subject}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-gray-900">
                  {selected.fullName}
                </p>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-sm text-[#0F1990] hover:underline"
                >
                  {selected.email}
                </a>
                <p className="text-xs text-gray-400">
                  {new Date(selected.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#0F1990] text-white text-sm font-medium rounded-lg hover:bg-[#0d1680] transition-colors"
              >
                Reply via email
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
