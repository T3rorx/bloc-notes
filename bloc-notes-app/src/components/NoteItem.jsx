import { memo } from 'react'
import { Trash2 } from 'lucide-react'
import { truncateText } from '@/lib/utils'
import { cn } from '@/lib/utils'

export const NoteItem = memo(function NoteItem({ note, isActive, onSelect, onDeleteRequest }) {
  const preview = truncateText(note.content, 15)
  return (
    <div
      className={cn(
        'flex w-full items-stretch gap-1 rounded-lg border border-transparent transition-colors duration-200',
        isActive ? 'bg-slate-700 border-slate-600' : 'hover:bg-slate-800'
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(note.id)}
        className={cn(
          'min-w-0 flex-1 text-left px-3 py-2 rounded-l-md transition-colors',
          isActive ? 'text-slate-100' : 'text-slate-300 hover:text-slate-100'
        )}
      >
        <div className="font-medium truncate">{note.title || 'Sans titre'}</div>
        {preview && (
          <div className="text-sm text-slate-500 truncate mt-0.5">{preview}</div>
        )}
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onDeleteRequest?.(note.id)
        }}
        aria-label={`Supprimer « ${note.title || 'Sans titre'} »`}
        className="flex shrink-0 items-center justify-center rounded-r-md px-2 text-slate-500 hover:bg-red-500/20 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
})
