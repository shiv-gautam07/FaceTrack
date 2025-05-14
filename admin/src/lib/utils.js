import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculatePageSize(total, pageSize) {
  return Math.ceil(total / pageSize);
}
