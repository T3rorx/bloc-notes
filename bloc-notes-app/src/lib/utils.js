import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  return crypto.randomUUID()
}

export function truncateText(text, words = 15) {
  if (!text || typeof text !== 'string') return ''
  const parts = text.trim().split(/\s+/)
  if (parts.length <= words) return text.trim()
  return parts.slice(0, words).join(' ') + '…'
}
