import { useEffect, useState, useRef, useCallback } from 'react'
import { Trash2 } from 'lucide-react'
import { useNotesStore } from '@/stores/notesStore'
import { NoteSidebar } from '@/components/NoteSidebar'
import { NotePreview } from '@/components/NotePreview'
import { NoteEditor } from '@/components/NoteEditor'
import { ConfirmDialog } from '@/components/ConfirmDialog'

const MIN_PREVIEW_PERCENT = 20
const MAX_PREVIEW_PERCENT = 80

export default function App() {
  const loadNotes = useNotesStore((s) => s.loadNotes)
  const isLoading = useNotesStore((s) => s.isLoading)
  const currentNoteId = useNotesStore((s) => s.currentNoteId)
  const notes = useNotesStore((s) => s.notes)
  const deleteNote = useNotesStore((s) => s.deleteNote)
  const currentNote = notes.find((n) => n.id === currentNoteId)
  const currentTitle = currentNote?.title ?? 'Sans titre'
  const currentContent = currentNote?.content ?? ''

  const [previewPercent, setPreviewPercent] = useState(50)
  const [isResizing, setIsResizing] = useState(false)
  const [headerDeleteConfirmOpen, setHeaderDeleteConfirmOpen] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  const handleResizeStart = useCallback((e) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  useEffect(() => {
    if (!isResizing) return
    const main = mainRef.current
    if (!main) return

    const handleMove = (e) => {
      const rect = main.getBoundingClientRect()
      const y = e.clientY - rect.top
      const percent = Math.round((y / rect.height) * 100)
      setPreviewPercent(Math.min(MAX_PREVIEW_PERCENT, Math.max(MIN_PREVIEW_PERCENT, percent)))
    }
    const handleEnd = () => setIsResizing(false)

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.body.style.cursor = 'ns-resize'
    document.body.style.userSelect = 'none'
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        Chargement des notes...
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100">
      <NoteSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-700/80 px-4 py-4">
          <div className="w-8 shrink-0" aria-hidden />
          <h1 className="note-title flex-1 min-w-0">
            {currentTitle}
          </h1>
          <button
            type="button"
            onClick={() => currentNoteId && setHeaderDeleteConfirmOpen(true)}
            disabled={!currentNoteId}
            aria-label="Supprimer la note"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-red-500/20 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-40 disabled:pointer-events-none"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </header>
        <div
          ref={mainRef}
          className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden"
        >
          <div
            className="overflow-auto border-slate-700 p-4 shrink-0"
            style={{ height: `${previewPercent}%`, minHeight: 80 }}
          >
            <NotePreview markdown={currentContent} />
          </div>
          <button
            type="button"
            aria-label="Ajuster la part prévisualisation / éditeur"
            className="resizer w-full h-2 shrink-0 flex items-center justify-center border-y border-slate-700 bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-inset cursor-ns-resize select-none"
            onMouseDown={handleResizeStart}
          >
            <span className="w-12 h-1 rounded-full bg-slate-600" />
          </button>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <NoteEditor />
          </div>
        </div>
      </main>
      <ConfirmDialog
        open={headerDeleteConfirmOpen}
        title="Supprimer la note ?"
        message="Cette action est irréversible. La note sera définitivement supprimée."
        onConfirm={() => {
          if (currentNoteId) deleteNote(currentNoteId)
          setHeaderDeleteConfirmOpen(false)
        }}
        onCancel={() => setHeaderDeleteConfirmOpen(false)}
      />
    </div>
  )
}
