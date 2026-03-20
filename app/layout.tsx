import type { Metadata } from "next";
import { Lora, Source_Sans_3, Geist } from "next/font/google";
import "@uploadthing/react/styles.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SitePreloader } from "@/components/public/site-preloader";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const headingFont = Lora({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "BioSynMat Research Group",
    template: "%s | BioSynMat",
  },
  description:
    "BioSynMat explores synthetic protocell systems to mimic natural cellular behavior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <QueryProvider>
          <SitePreloader />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 flex justify-center">
              <div className="w-full max-w-7xl">{children}</div>
            </main>
            <SiteFooter />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
