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

  const ddMmYyyyMatch = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddMmYyyyMatch) {
    const day = Number(ddMmYyyyMatch[1]);
    const month = Number(ddMmYyyyMatch[2]);
    const year = Number(ddMmYyyyMatch[3]);
    const parsed = new Date(year, month - 1, day);
    if (
      parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
    ) {
      return parsed.getTime();
    }
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

export function sortByDisplayDateDesc<T extends { date: string }>(
  items: T[],
): T[] {
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

/**
 * Convert a display-friendly date string (e.g. "March 2026" or ISO)
 * into the `YYYY-MM-DD` format expected by `<input type="date">`.
 */
export function toDateInputValue(value: string): string {
  const raw = value.trim();
  if (!raw) {
    return "";
  }
  const ddMmYyyyMatch = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddMmYyyyMatch) {
    return `${ddMmYyyyMatch[3]}-${ddMmYyyyMatch[2]}-${ddMmYyyyMatch[1]}`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString().slice(0, 10);
  }

  return "";
}

export function toDdMmYyyy(value: string): string {
  const raw = value.trim();
  if (!raw) {
    return "";
  }

  const ddMmYyyyMatch = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddMmYyyyMatch) {
    return raw;
  }

  const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return `${isoMatch[3]}-${isoMatch[2]}-${isoMatch[1]}`;
  }

  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) {
    const date = new Date(parsed);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }

  return raw;
}

export function isValidDdMmYyyy(value: string): boolean {
  const raw = value.trim();
  const match = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) {
    return false;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
