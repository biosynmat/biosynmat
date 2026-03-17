import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeExternalUrl(value: string | undefined | null): string {
  const raw = (value ?? "").trim();
  if (!raw) {
    return "";
  }

  if (
    raw.startsWith("http://") ||
    raw.startsWith("https://") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:")
  ) {
    return raw;
  }

  if (raw.startsWith("//")) {
    return `https:${raw}`;
  }

  return `https://${raw}`;
}

function parseDisplayDate(value: string | undefined | null): number | null {
  const raw = (value ?? "").trim();
  if (!raw) {
    return null;
  }

  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) {
    return parsed;
  }

  const monthYearMatch = raw.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!monthYearMatch) {
    return null;
  }

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const month = monthNames.indexOf(monthYearMatch[1].toLowerCase());
  const year = Number(monthYearMatch[2]);
  if (month < 0 || Number.isNaN(year)) {
    return null;
  }

  return new Date(year, month, 1).getTime();
}

export function sortByDisplayDateDesc<T extends { date: string }>(items: T[]): T[] {
  return items
    .map((item, index) => ({
      item,
      index,
      sortTime: parseDisplayDate(item.date),
    }))
    .sort((a, b) => {
      if (a.sortTime !== null && b.sortTime !== null) {
        return b.sortTime - a.sortTime;
      }
      if (a.sortTime !== null) {
        return -1;
      }
      if (b.sortTime !== null) {
        return 1;
      }
      return a.index - b.index;
    })
    .map((entry) => entry.item);
}
