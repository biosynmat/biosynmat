import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { LoadingIndicator } from "@/components/ui/loading-indicator";

export default function AdminLoginPage() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6">
            <LoadingIndicator label="Loading login..." className="py-2" />
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
