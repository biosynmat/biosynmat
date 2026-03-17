export const queryKeys = {
  teamMembers: ["team-members"] as const,
  publications: ["publications"] as const,
  news: (limitCount?: number) => ["news", { limitCount: limitCount ?? null }] as const,
  gallery: ["gallery"] as const,
};
