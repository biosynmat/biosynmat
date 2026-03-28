import type { MetadataRoute } from "next";

const BASE_URL = "https://biosynmat.vercel.app";
const LAST_MODIFIED = "2026-03-28";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/research`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/research/funding`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/publications`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/meet-ananya-mishra`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/opportunities`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
