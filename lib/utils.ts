import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const copyText = async (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (err: any) {
    alert(`Failed to copy text: ${err.message}`);
  }
};