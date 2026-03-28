import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const PUBLIC_ROUTES = [
  "",
  "/research",
  "/research/funding",
  "/publications",
  "/news",
  "/team",
  "/gallery",
  "/meet-ananya-mishra",
  "/opportunities",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${siteUrl.origin}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
