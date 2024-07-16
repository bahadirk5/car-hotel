export const carStatuses = ["available", "rented", "maintenance", "reserved", "unlisted"] as const;
export type CarStatus = typeof carStatuses[number];