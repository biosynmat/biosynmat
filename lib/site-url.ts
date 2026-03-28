const LOCALHOST_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = "https://biosynmat.vercel.app";

export function getSiteUrl(): URL {
  const isVercelProduction = process.env.VERCEL_ENV === "production";
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (isVercelProduction
      ? PRODUCTION_SITE_URL
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : undefined);

  if (!configuredUrl) {
    return new URL(LOCALHOST_URL);
  }

  try {
    return new URL(configuredUrl);
  } catch {
    return new URL(LOCALHOST_URL);
  }
}
