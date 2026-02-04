import { createStore } from 'idb-keyval'

const store = createStore('bloc-notes-db', 'notes')

export async function getAllNotes() {
  try {
    const keys = await store.keys()
    const notes = await Promise.all(keys.map((key) => store.get(key)))
    return notes.filter(Boolean).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
  } catch (err) {
    return []
  }
}

export async function getNote(id) {
  try {
    return await store.get(id)
  } catch {
    return null
  }
}

export async function saveNote(note) {
  try {
    await store.set(note.id, note)
    return note
  } catch (err) {
    throw err
  }
}

export async function deleteNote(id) {
  try {
    await store.del(id)
  } catch (err) {
    throw err
  }
}
