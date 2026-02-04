import { create } from 'zustand'
import * as db from '@/lib/db'
import { generateId } from '@/lib/utils'
import { seedNotes } from '@/data/seedNotes'

export const useNotesStore = create((set, get) => ({
  notes: [],
  currentNoteId: null,
  isLoading: true,

  loadNotes: async () => {
    set({ isLoading: true })
    try {
      let notes = await db.getAllNotes()
      const existingIds = new Set(notes.map((n) => n.id))
      if (seedNotes.length > 0) {
        for (const seed of seedNotes) {
          if (!existingIds.has(seed.id)) {
            await db.saveNote(seed)
            notes = [seed, ...notes]
            existingIds.add(seed.id)
          }
        }
        notes = notes.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      }
      if (notes.length === 0) {
        const welcome = {
          id: generateId(),
          title: 'Bienvenue',
          content: '# Bienvenue\n\nÉcris tes notes en **markdown** ici. Elles sont sauvegardées automatiquement.',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        await db.saveNote(welcome)
        set({ notes: [welcome], currentNoteId: welcome.id, isLoading: false })
        return
      }
      set({
        notes,
        currentNoteId: get().currentNoteId || notes[0]?.id,
        isLoading: false,
      })
    } catch {
      set({ notes: [], isLoading: false })
    }
  },

  selectNote: (id) => set({ currentNoteId: id }),

  createNote: async () => {
    const newNote = {
      id: generateId(),
      title: 'Sans titre',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    try {
      await db.saveNote(newNote)
      set((state) => ({
        notes: [newNote, ...state.notes],
        currentNoteId: newNote.id,
      }))
    } catch {
      set((state) => ({ notes: [newNote, ...state.notes], currentNoteId: newNote.id }))
    }
  },

  updateNote: async (payload) => {
    const { currentNoteId, notes } = get()
    if (!currentNoteId) return
    const prev = notes.find((n) => n.id === currentNoteId)
    if (!prev) return
    const updated = {
      ...prev,
      ...payload,
      updatedAt: Date.now(),
    }
    try {
      await db.saveNote(updated)
      set({
        notes: notes.map((n) => (n.id === currentNoteId ? updated : n)),
      })
    } catch {
      set({
        notes: notes.map((n) => (n.id === currentNoteId ? updated : n)),
      })
    }
  },

  deleteNote: async (id) => {
    const { notes, currentNoteId } = get()
    try {
      await db.deleteNote(id)
      const next = notes.filter((n) => n.id !== id)
      const newCurrent =
        currentNoteId === id ? (next[0]?.id ?? null) : currentNoteId
      set({ notes: next, currentNoteId: newCurrent })
    } catch {
      const next = notes.filter((n) => n.id !== id)
      const newCurrent =
        currentNoteId === id ? (next[0]?.id ?? null) : currentNoteId
      set({ notes: next, currentNoteId: newCurrent })
    }
  },
}))
