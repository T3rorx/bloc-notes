#!/usr/bin/env node
/**
 * Génère src/data/seedNotes.js dans bloc-notes-app à partir des .md de Resources/ (hors Old/)
 * À lancer depuis la racine du repo : node scripts/seed-from-resources.js
 */

const fs = require('fs')
const path = require('path')

const RESOURCES_DIR = path.join(__dirname, '..', 'Resources')
const OLD_DIR = path.join(RESOURCES_DIR, 'Old')
const OUT_FILE = path.join(__dirname, '..', 'bloc-notes-app', 'src', 'data', 'seedNotes.js')

const files = [
  'Projet block notes.md',
  'Projet Bonus Formulaire.md',
  'Shadcn-UI.md',
  'Composants-fonctionnels.md',
  'recommandation.md',
]

function generateId() {
  return 'seed-' + Math.random().toString(36).slice(2, 11)
}

const now = Date.now()
const notes = []

for (const file of files) {
  const filePath = path.join(RESOURCES_DIR, file)
  if (!fs.existsSync(filePath)) continue
  const content = fs.readFileSync(filePath, 'utf-8')
  const title = file.replace(/\.md$/, '')
  const id = 'seed-' + title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  notes.push({
    id,
    title,
    content,
    createdAt: now,
    updatedAt: now,
  })
}

const lines = [
  '// Généré par scripts/seed-from-resources.js - ne pas éditer à la main',
  'export const seedNotes = [',
  ...notes.map((n) => {
    const contentEscaped = JSON.stringify(n.content)
    return `  { id: ${JSON.stringify(n.id)}, title: ${JSON.stringify(n.title)}, content: ${contentEscaped}, createdAt: ${n.createdAt}, updatedAt: ${n.updatedAt} },`
  }),
  ']',
]

const outDir = path.dirname(OUT_FILE)
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf-8')
console.log('Seed généré:', OUT_FILE, `(${notes.length} notes)`)
