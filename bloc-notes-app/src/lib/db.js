import { createStore, get, set, keys, del } from 'idb-keyval'

const customStore = createStore('bloc-notes-db', 'notes')

export async function getAllNotes() {
  try {
    const keysList = await keys(customStore)
    const notes = await Promise.all(keysList.map((key) => get(key, customStore)))
    const filtered = notes.filter(Boolean)
    return filtered.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
  } catch (err) {
    return []
  }
}

export async function getNote(id) {
  try {
    return await get(id, customStore)
  } catch {
    return null
  }
}

export async function saveNote(note) {
  try {
    await set(note.id, note, customStore)
    return note
  } catch (err) {
    throw err
  }
}

export async function deleteNote(id) {
  try {
    await del(id, customStore)
  } catch (err) {
    throw err
  }
}
