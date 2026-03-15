"use client";

import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { firebaseAuth } from "@/lib/firebase/client";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        router.replace(`/admin/login?next=${encodeURIComponent(pathname || "/admin/team")}`);
        return;
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="section-shell py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Checking admin session...</div>
      </div>
    );
  }

  return <>{children}</>;
}
