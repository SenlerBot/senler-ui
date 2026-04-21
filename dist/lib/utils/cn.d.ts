import { type ClassValue } from "clsx";
/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500')
 * cn('px-2', 'px-4') // => 'px-4' (последний класс имеет приоритет)
 */
export declare function cn(...inputs: ClassValue[]): string;
