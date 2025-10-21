import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) {
        return path;
    }
    return `/storage/${path}`;
};