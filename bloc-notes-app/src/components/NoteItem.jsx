import { memo } from 'react'
import { truncateText } from '@/lib/utils'
import { cn } from '@/lib/utils'

export const NoteItem = memo(function NoteItem({ note, isActive, onSelect }) {
  const preview = truncateText(note.content, 15)
  return (
    <button
      type="button"
      onClick={() => onSelect(note.id)}
      className={cn(
        'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 border border-transparent',
        isActive
          ? 'bg-slate-700 text-slate-100 border-slate-600'
          : 'hover:bg-slate-800 text-slate-300 hover:text-slate-100'
      )}
    >
      <div className="font-medium truncate">{note.title || 'Sans titre'}</div>
      {preview && (
        <div className="text-sm text-slate-500 truncate mt-0.5">{preview}</div>
      )}
    </button>
  )
})
