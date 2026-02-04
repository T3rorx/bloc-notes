# INSTRUCTIONS CURSOR - PROJET BLOC-NOTES PRO 2026

**Cours :** *React – Composants fonctionnels, Shadcn UI, Vite*  
**Stack :** Vite + React 19 + JavaScript + Tailwind CSS 4 + Shadcn UI + IndexedDB

> **Document optionnel** — Ce fichier n’est pas au programme du cours. Il propose une version « pro » du projet pour ceux qui veulent un guide pas à pas. **Zustand, Biome, React Hook Form + Zod** sont des choix de ce repo, pas imposés : le cours laisse les élèves libres (useState/Context, pas de lib de state imposée ; tooling au choix).

> **Alignement avec le sujet** : Cette recommandation implémente le projet *Crée ton bloc-notes (1/2)* (voir `Resources/Projet block notes.md`) en version « pro » : mêmes fonctionnalités (sidebar, liste notes, preview markdown, éditeur, persistance) + auto-save, IndexedDB, Zustand, validation. Noms de composants : *NoteDisplay* (sujet) = *NotePreview* (ici) ; *MarkdownInput* (sujet) = partie éditeur dans *NoteEditor*.

---

## PHASE 1 : SETUP INITIAL

*Dépendances optionnelles (Zustand, React Hook Form + Zod, Biome) : uniquement si tu suis cette recommandation « pro » ; le cours ne les exige pas.*

```bash
# Création projet Vite React (JavaScript)
npm create vite@latest bloc-notes-app --template react
cd bloc-notes-app

# Installation dépendances base
npm install

# Installation Tailwind CSS 4 (plugin Vite, pas PostCSS)
npm install -D tailwindcss @tailwindcss/vite

# Installation Shadcn UI dependencies
npm install class-variance-authority clsx tailwind-merge lucide-react

# Installation state management & data (Zustand optionnel)
npm install zustand idb-keyval

# Installation markdown processing (remplacement Showdown obsolète)
npm install react-markdown remark-gfm rehype-raw rehype-sanitize

# Installation React Hook Form + Zod (optionnel)
npm install react-hook-form @hookform/resolvers zod

# Installation dev tools (Biome optionnel)
npm install -D @biomejs/biome

# Init Biome (remplace ESLint+Prettier) — optionnel
npx @biomejs/biome init

# Init Git
git init && git add -A && git commit -m "chore: init vite react js stack 2026"
```

---

## PHASE 2 : CONFIGURATION TAILWIND CSS 4

Utiliser le plugin Vite (pas PostCSS). Remplacer le contenu de `src/index.css` par :

```css
@import "tailwindcss";

@layer base {
  body {
    @apply antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

---

## PHASE 3 : CONFIGURATION BIOME

Remplacer le contenu de `biome.json` par :

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": ["node_modules", "dist", "build"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  }
}
```

---

## PHASE 4 : CONFIGURATION VITE (alias @/ + Tailwind)

Mettre à jour `vite.config.js` à la racine :

```javascript
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## PHASE 5 : STRUCTURE DES DOSSIERS

Créer l'arborescence suivante dans `src/` :

```
src/
├── components/
│   ├── ui/           # Composants Shadcn UI
│   ├── NoteEditor.jsx
│   ├── NotePreview.jsx
│   ├── NoteSidebar.jsx
│   └── NoteItem.jsx
├── lib/
│   ├── utils.js      # Helpers Tailwind (cn function)
│   └── db.js         # IndexedDB wrapper
├── stores/
│   └── notesStore.js # Zustand store
├── App.jsx
├── main.jsx
└── index.css
```

---

## PHASE 6 : CODE SOURCE COMPLET (À GÉNÉRER PAR CURSOR)

Instruction pour Cursor (prompt unique) :

**SPECS FONCTIONNELLES :**

- Sidebar gauche avec liste des notes (titre + preview 15 mots)
- Zone principale avec prévisualisation markdown en haut + éditeur en bas
- Éditeur markdown avec input titre + textarea contenu
- Sauvegarde auto toutes les 2 secondes (debounce) dans IndexedDB
- Bouton "Nouvelle note" en haut du sidebar
- Clic sur note dans sidebar = chargement dans éditeur
- Preview markdown live avec react-markdown (support GFM + tables)
- UI moderne Tailwind CSS 4 avec dark mode par défaut

**ARCHITECTURE :**

1. **Modèle de note (objet JS)** : `{ id, title, content, createdAt, updatedAt }` (id string, dates en number)
2. **IndexedDB** (`/src/lib/db.js`) : `getAllNotes()`, `getNote(id)`, `saveNote(note)`, `deleteNote(id)` — idb-keyval, store `notes`, clé = UUID
3. **Zustand** (`/src/stores/notesStore.js`) : state `notes[]`, `currentNoteId`, `isLoading` ; actions `loadNotes`, `selectNote`, `createNote`, `updateNote`, `deleteNote` ; sync IndexedDB
4. **Composants** :
   - **NoteSidebar** : liste scrollable, bouton "Nouvelle note" (Lucide Plus), NoteItem (titre + 15 mots), état actif, Tailwind bg-slate-900, w-80
   - **NoteEditor** : input titre, textarea markdown, debounce 2s auto-save, React Hook Form + Zod (titre requis, max 100)
   - **NotePreview** : ReactMarkdown + remark-gfm, rehype-raw, rehype-sanitize, prose
   - **App.jsx** : layout Sidebar + (Preview / Editor), loadNotes au montage, dark mode
5. **Utils** (`/src/lib/utils.js`) : `cn()`, `generateId()`, `truncateText(text, words)`
6. **main.jsx** : pas de StrictMode, import index.css

**STANDARDS :** Functional components, hooks React 19, JavaScript, Zustand selectors, try/catch IndexedDB, loading/empty states.

**BONUS (si temps) :** Delete note + dialog confirmation, Cmd+N / Cmd+S.

---

## PHASE 7 : SHADCN UI COMPONENTS

Si besoin (dialog, button, etc.) :

- Setup : `npx shadcn@latest init` (répondre : Style Default, Base color Slate, CSS variables Yes, Tailwind = plugin @tailwindcss/vite, Components @/components, Utils @/lib/utils)
- Puis installer : `npx shadcn@latest add button`, `add dialog`, `add input`, `add textarea`, `add toast`

```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add toast
```

---

## PHASE 8 : SCRIPTS PACKAGE.JSON

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "biome check --write ./src",
    "format": "biome format --write ./src"
  }
}
```

---

## PHASE 9 : LANCEMENT & TEST

Lancer le serveur de dev avec `npm run dev`, puis ouvrir http://localhost:5173.

```bash
npm run dev
```

**Workflow à tester :** charger notes → créer note → éditer + preview → attendre 2s (auto-save) → recharger page (persistance) → switcher entre notes. Vérifier IndexedDB dans DevTools : **Application** > **Storage** > **IndexedDB** > `bloc-notes-db` > `notes`.

---

## PHASE 10 : AMÉLIORATIONS POST-MVP

- Search notes (filter titre/contenu)
- Tags (array dans note, badges Tailwind)
- Export .md / .json
- Rich markdown toolbar (bold, italic, link)
- Note templates (Meeting, Todo…)
- Sync cloud (Supabase/Firebase)
- Raccourcis (Cmd+K search, Cmd+Delete…)

---

## CHECKLIST QUALITÉ FINALE

- [ ] Aucune erreur Biome (`npm run lint`)
- [ ] Notes persistent après refresh
- [ ] Auto-save 2s OK
- [ ] Preview markdown (headers, lists, code blocks, tables)
- [ ] Sidebar scrollable si >10 notes
- [ ] Loading + empty states
- [ ] Build OK (`npm run build`) sans warnings

---

## TECH STACK FINAL

| Domaine   | Stack |
|----------|--------|
| Frontend | React 19, JavaScript, Vite 6, Tailwind CSS 4 |
| UI       | Shadcn UI, Lucide React, dark mode |
| State    | Zustand, IndexedDB (idb-keyval) |
| Markdown | react-markdown, remark-gfm, rehype-raw, rehype-sanitize |
| Forms    | React Hook Form, Zod |
| Quality  | Biome |

---

## RESSOURCES COMPLÉMENTAIRES

- [Vite](https://vitejs.dev)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Zustand](https://docs.pmnd.rs/zustand)
- [idb-keyval](https://github.com/jakearchibald/idb-keyval)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [Biome](https://biomejs.dev)
