import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNotesStore } from '@/stores/notesStore'

const schema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(100, 'Max 100 caractères'),
  content: z.string(),
})

const DEBOUNCE_MS = 2000

export function NoteEditor() {
  const currentNoteId = useNotesStore((s) => s.currentNoteId)
  const notes = useNotesStore((s) => s.notes)
  const updateNote = useNotesStore((s) => s.updateNote)
  const note = notes.find((n) => n.id === currentNoteId)
  const timeoutRef = useRef(null)

  const { register, watch, setValue, formState } = useForm({
    defaultValues: { title: '', content: '' },
    resolver: zodResolver(schema),
  })

  const title = watch('title')
  const content = watch('content')

  useEffect(() => {
    if (!note) {
      setValue('title', '')
      setValue('content', '')
      return
    }
    setValue('title', note.title)
    setValue('content', note.content)
  }, [note?.id, setValue, note?.title, note?.content])

  useEffect(() => {
    if (!currentNoteId || !note) return
    const id = currentNoteId
    const t = title
    const c = content
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (useNotesStore.getState().currentNoteId === id) {
        updateNote({ title: t, content: c })
      }
      timeoutRef.current = null
    }, DEBOUNCE_MS)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [title, content, currentNoteId, note?.id, updateNote])

  if (!currentNoteId) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-slate-500">
        Sélectionne une note ou crée-en une.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      <input
        {...register('title')}
        className="w-full text-2xl font-bold bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
        placeholder="Titre de la note"
      />
      {formState.errors.title && (
        <p className="text-sm text-red-400">{formState.errors.title.message}</p>
      )}
      <textarea
        {...register('content')}
        className="w-full font-mono min-h-[300px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-y"
        placeholder="Contenu en markdown..."
      />
    </div>
  )
}
