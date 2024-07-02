import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const tw = (value: TemplateStringsArray) => twMerge(...value);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
