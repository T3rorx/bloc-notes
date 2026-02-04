import { useEffect } from 'react'
import { useNotesStore } from '@/stores/notesStore'
import { NoteSidebar } from '@/components/NoteSidebar'
import { NotePreview } from '@/components/NotePreview'
import { NoteEditor } from '@/components/NoteEditor'

export default function App() {
  const loadNotes = useNotesStore((s) => s.loadNotes)
  const isLoading = useNotesStore((s) => s.isLoading)
  const currentNoteId = useNotesStore((s) => s.currentNoteId)
  const notes = useNotesStore((s) => s.notes)
  const currentContent = notes.find((n) => n.id === currentNoteId)?.content ?? ''

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

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
        <div className="flex-1 overflow-auto border-b border-slate-700 p-4">
          <NotePreview markdown={currentContent} />
        </div>
        <div className="flex-1 overflow-auto min-h-0">
          <NoteEditor />
        </div>
      </main>
    </div>
  )
}
