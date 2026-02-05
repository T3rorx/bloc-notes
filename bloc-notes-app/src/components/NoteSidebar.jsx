import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useNotesStore } from '@/stores/notesStore'
import { NoteItem } from './NoteItem'
import { ConfirmDialog } from './ConfirmDialog'

export function NoteSidebar() {
  const notes = useNotesStore((s) => s.notes)
  const currentNoteId = useNotesStore((s) => s.currentNoteId)
  const selectNote = useNotesStore((s) => s.selectNote)
  const createNote = useNotesStore((s) => s.createNote)
  const deleteNote = useNotesStore((s) => s.deleteNote)
  const [pendingDeleteId, setPendingDeleteId] = useState(null)

  return (
    <aside className="w-80 flex-shrink-0 border-r border-slate-700 bg-slate-900 flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <button
          type="button"
          onClick={createNote}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          Nouvelle note
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {notes.length === 0 ? (
          <p className="text-slate-500 text-sm p-4 text-center">
            Aucune note, créez-en une !
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                isActive={note.id === currentNoteId}
                onSelect={selectNote}
                onDeleteRequest={setPendingDeleteId}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmDialog
        open={pendingDeleteId != null}
        title="Supprimer la note ?"
        message="Cette action est irréversible. La note sera définitivement supprimée."
        onConfirm={() => {
          if (pendingDeleteId) deleteNote(pendingDeleteId)
          setPendingDeleteId(null)
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </aside>
  )
}
