"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase/client";

const adminNav = [
  { href: "/admin/team", label: "Team" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/gallery", label: "Gallery" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(firebaseAuth);
    router.replace("/admin/login");
  };

  return (
    <div className="section-shell py-8 sm:py-10">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Admin Panel</h1>
          <p className="text-sm text-slate-600">Manage team members, publications, news, and gallery.</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-4 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:mt-0"
        >
          Sign out
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {adminNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active ? "teal-link bg-teal-700" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
