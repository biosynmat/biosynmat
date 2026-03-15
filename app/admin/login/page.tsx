import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div className="section-shell py-12">
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Loading login...
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
