import { clsx, type ClassValue } from "clsx";

/** Merge Tailwind class names safely */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
