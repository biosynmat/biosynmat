import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
};

export default function PublicationsPage() {
  return (
    <div className="section-shell py-24 sm:py-32">
      <h1 className="text-center text-5xl font-bold tracking-tight text-teal-800 sm:text-7xl">
        Stay tuned
      </h1>
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-3 w-3 rounded-full bg-teal-700 animate-pulse [animation-duration:1.4s]" />
        <div className="h-3 w-3 rounded-full bg-teal-700 animate-pulse [animation-delay:200ms] [animation-duration:1.4s]" />
        <div className="h-3 w-3 rounded-full bg-teal-700 animate-pulse [animation-delay:400ms] [animation-duration:1.4s]" />
      </div>
    </div>
  );
}
