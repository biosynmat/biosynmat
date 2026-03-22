import type { Metadata } from "next";
import { Lora, Source_Sans_3, Geist } from "next/font/google";
import "@uploadthing/react/styles.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SitePreloader } from "@/components/public/site-preloader";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/site-url";

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

const siteUrl = getSiteUrl();
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "BioSynMat",
      url: siteUrl.origin,
      description:
        "BioSynMat explores synthetic protocell systems to mimic natural cellular behavior.",
    },
    {
      "@type": "ResearchOrganization",
      name: "BioSynMat Research Group",
      url: siteUrl.origin,
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "SRM Institute of Science and Technology",
      },
    },
    {
      "@type": "Person",
      name: "Dr. Ananya Mishra",
      jobTitle: "Assistant Professor (Research), Department of Chemistry",
      worksFor: {
        "@type": "CollegeOrUniversity",
        name: "SRM Institute of Science and Technology",
      },
      affiliation: {
        "@type": "ResearchOrganization",
        name: "BioSynMat Research Group",
      },
      url: `${siteUrl.origin}/meet-ananya-mishra`,
      sameAs: ["https://www.researchgate.net/profile/Ananya-Mishra-48"],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "BioSynMat Research Group",
    template: "%s | BioSynMat",
  },
  description:
    "BioSynMat explores synthetic protocell systems to mimic natural cellular behavior.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "BioSynMat",
    "BioSynMat Lab",
    "Ananya Mishra",
    "Ananya Mishra SRM",
    "Ananya Mishra SRM professor",
    "protocells research",
    "colloidosome research",
    "SRM research",
    "research group SRM",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "BioSynMat",
    title: "BioSynMat Research Group",
    description:
      "BioSynMat explores synthetic protocell systems to mimic natural cellular behavior.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BioSynMat Research Group",
    description:
      "BioSynMat explores synthetic protocell systems to mimic natural cellular behavior.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
