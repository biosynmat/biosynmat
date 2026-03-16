import { generateUploadButton } from "@uploadthing/react";
import type { UploadRouter } from "@/app/api/uploadthing/core";

export const UploadThingButton = generateUploadButton<UploadRouter>();

type UploadResult = {
  serverData?: { url?: string };
  ufsUrl?: string;
  url?: string;
};

export function extractUploadUrl(results: UploadResult[] | undefined): string {
  const first = results?.[0];
  return first?.serverData?.url || first?.ufsUrl || first?.url || "";
}

export function extractUploadUrls(results: UploadResult[] | undefined): string[] {
  if (!results?.length) {
    return [];
  }

  return results
    .map((item) => item.serverData?.url || item.ufsUrl || item.url || "")
    .filter((url): url is string => Boolean(url));
}
