INSTRUCTIONS CURSOR - PROJET BLOC-NOTES PRO 2026
Stack : Vite + React 19 + TypeScript + Tailwind CSS 4 + Shadcn UI + IndexedDB

PHASE 1 : SETUP INITIAL (Copy-paste dans terminal Cursor)
bash
# Création projet Vite React TypeScript
pnpm create vite@latest bloc-notes-app --template react-ts
cd bloc-notes-app

# Installation dépendances base
pnpm install

# Installation Tailwind CSS 4 (latest)
pnpm add -D tailwindcss@next @tailwindcss/postcss@next

# Installation Shadcn UI dependencies
pnpm add class-variance-authority clsx tailwind-merge lucide-react

# Installation state management & data
pnpm add zustand idb-keyval

# Installation markdown processing (remplacement Showdown obsolète)
pnpm add react-markdown remark-gfm rehype-raw rehype-sanitize

# Installation React Hook Form + Zod
pnpm add react-hook-form @hookform/resolvers zod

# Installation dev tools
pnpm add -D @biomejs/biome @types/node

# Init Biome (remplace ESLint+Prettier)
pnpm dlx @biomejs/biome init

# Init Git
git init && git add -A && git commit -m "chore: init vite react ts stack 2026"
PHASE 2 : CONFIGURATION TAILWIND CSS 4
Créer postcss.config.js à la racine :

javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
Remplacer contenu src/index.css :

css
@import "tailwindcss";

@theme {
  /* Custom theme variables si nécessaire */
  --color-primary: oklch(70% 0.15 200);
  --color-secondary: oklch(60% 0.1 260);
}

/* Base styles */
@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
PHASE 3 : CONFIGURATION BIOME
Remplacer contenu biome.json :

json
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
PHASE 4 : CONFIGURATION TYPESCRIPT
Ajouter dans tsconfig.json (section compilerOptions) :

json
{
  "compilerOptions": {
    // ... existing config
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
Mettre à jour vite.config.ts :

typescript
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
PHASE 5 : STRUCTURE DES DOSSIERS
Créer l'arborescence suivante dans src/ :

bash
src/
├── components/
│   ├── ui/           # Composants Shadcn UI
│   ├── NoteEditor.tsx
│   ├── NotePreview.tsx
│   ├── NoteSidebar.tsx
│   └── NoteItem.tsx
├── lib/
│   ├── utils.ts      # Helpers Tailwind (cn function)
│   └── db.ts         # IndexedDB wrapper
├── stores/
│   └── notesStore.ts # Zustand store
├── types/
│   └── note.ts       # Types TypeScript
├── App.tsx
├── main.tsx
└── index.css
PHASE 6 : CODE SOURCE COMPLET (À GÉNÉRER PAR CURSOR)
Instruction pour Cursor (prompt unique) :
text
Génère le code production-ready suivant pour une app Bloc-notes React moderne :

SPECS FONCTIONNELLES :
- Sidebar gauche avec liste des notes (titre + preview 15 mots)
- Zone principale avec prévisualisation markdown en haut + éditeur en bas
- Éditeur markdown avec input titre + textarea contenu
- Sauvegarde auto toutes les 2 secondes (debounce) dans IndexedDB
- Bouton "Nouvelle note" en haut du sidebar
- Clic sur note dans sidebar = chargement dans éditeur
- Preview markdown live avec react-markdown (support GFM + tables)
- UI moderne Tailwind CSS 4 avec dark mode par défaut

ARCHITECTURE :
1. Types (/src/types/note.ts) :
   - Interface Note { id: string, title: string, content: string, createdAt: number, updatedAt: number }

2. IndexedDB wrapper (/src/lib/db.ts) :
   - Fonctions : getAllNotes(), getNote(id), saveNote(note), deleteNote(id)
   - Utiliser idb-keyval avec store 'notes'
   - Chaque note = clé unique UUID

3. Zustand store (/src/stores/notesStore.ts) :
   - State : notes[], currentNoteId, isLoading
   - Actions : loadNotes(), selectNote(id), createNote(), updateNote(note), deleteNote(id)
   - Synchronisation avec IndexedDB automatique

4. Composants :
   
   A. NoteSidebar (/src/components/NoteSidebar.tsx) :
      - Liste scrollable des notes
      - Bouton "Nouvelle note" avec icon Lucide Plus
      - NoteItem pour chaque note (affiche titre + 15 premiers mots content)
      - Active state si note sélectionnée
      - Tailwind : bg-slate-900, w-80, border-r, hover effects

   B. NoteEditor (/src/components/NoteEditor.tsx) :
      - Input controlled pour titre (className: text-2xl font-bold)
      - Textarea controlled pour markdown (className: font-mono, min-h-[300px])
      - useEffect avec debounce 2s pour auto-save via store.updateNote()
      - React Hook Form + Zod validation (titre requis, max 100 chars)

   C. NotePreview (/src/components/NotePreview.tsx) :
      - ReactMarkdown avec plugins remark-gfm, rehype-raw, rehype-sanitize
      - Styles prose Tailwind : className="prose prose-invert max-w-none"
      - Affiche le markdown rendu en HTML live

   D. Layout principal (App.tsx) :
      - Flex layout : NoteSidebar (fixe) + split vertical NotePreview/NoteEditor
      - Split 50/50 avec résizer optionnel (ou simple border)
      - useEffect initial pour loadNotes()
      - Dark mode par défaut (bg-slate-950, text-slate-100)

5. Utils (/src/lib/utils.ts) :
   - Fonction cn() pour merge classNames (clsx + tailwind-merge)
   - Fonction generateId() pour UUID v4
   - Fonction truncateText(text, words) pour preview

6. Main.tsx :
   - Pas de StrictMode en dev (double render)
   - Import index.css

STANDARDS CODE 2026 :
- Functional components only, hooks React 19
- TypeScript strict mode
- Zustand selectors pour éviter re-renders
- Arrow functions, const/let, template literals
- Pas de any types, tout typé
- Comments uniquement pour logique complexe
- Error handling avec try/catch sur IndexedDB ops
- Loading states pendant fetch notes
- Empty states avec messages clairs

STYLING TAILWIND :
- Design system cohérent : slate color palette
- Dark mode par défaut (no toggle pour simplifier)
- Spacing consistent : p-4, gap-4, etc.
- Border radius : rounded-lg
- Shadows : shadow-md pour cartes
- Transitions : transition-colors duration-200
- Responsive pas nécessaire (desktop first)

PERFORMANCE :
- Lazy loading react-markdown si >10 notes
- Debounce auto-save 2s (lodash.debounce ou custom hook)
- Zustand selectors : const title = useNotesStore(s => s.notes.find(n => n.id === currentId)?.title)
- React.memo sur NoteItem si liste >50 notes

EDGE CASES :
- Première visite : créer note par défaut "Bienvenue"
- Suppression note courante : sélectionner première note restante
- Sidebar vide : message "Aucune note, créez-en une !"
- Erreur IndexedDB : fallback state in-memory + toast warning

OUTPUT ATTENDU :
- Génère tous les fichiers avec code complet ready-to-run
- Inclure imports corrects (paths alias @/)
- Aucun TODO, aucun placeholder
- Code production-grade, pas de console.log
- Typage exhaustif TypeScript

BONUS (si temps) :
- Bouton delete note (icon Trash Lucide) dans NoteItem
- Confirmation dialog avant delete (dialog Shadcn UI)
- Raccourcis clavier : Cmd+N nouvelle note, Cmd+S save manuelle
PHASE 7 : SHADCN UI COMPONENTS (Optionnel si besoin dialog/button)
Installer composants Shadcn manuellement (si pas de CLI setup) :

bash
# Setup Shadcn CLI
pnpm dlx shadcn@latest init

# Répondre prompts :
# - TypeScript: Yes
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes
# - Tailwind config: postcss.config.js
# - Components path: @/components
# - Utils path: @/lib/utils

# Installer composants utiles
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add toast
PHASE 8 : SCRIPTS PACKAGE.JSON
Ajouter dans package.json :

json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "biome check --write ./src",
    "format": "biome format --write ./src",
    "type-check": "tsc --noEmit"
  }
}
PHASE 9 : LANCEMENT & TEST
bash
# Lancer dev server
pnpm dev

# Ouvrir http://localhost:5173

# Tester workflow :
# 1. App lance, charge notes depuis IndexedDB (vide première fois)
# 2. Créer nouvelle note via bouton sidebar
# 3. Taper titre + markdown dans éditeur
# 4. Vérifier preview live en haut
# 5. Attendre 2s auto-save (ou Cmd+S)
# 6. Recharger page, note persiste
# 7. Créer 2-3 notes supplémentaires
# 8. Switcher entre notes via sidebar
# 9. Tester delete note si implémenté

# Vérifier IndexedDB dans DevTools :
# Application > Storage > IndexedDB > notes > keyval
PHASE 10 : AMÉLIORATIONS POST-MVP
Si projet terminé en avance, ajouter :

Search notes : Input en haut sidebar, filter par titre/contenu

Tags system : Array tags dans Note type, badges Tailwind

Export notes : Bouton download en .md ou .json

Rich markdown toolbar : Boutons bold, italic, link (insert syntax)

Note templates : Dropdown "New from template" (Meeting, Todo, etc.)

Sync cloud : Upload notes vers Supabase/Firebase (optionnel)

Keyboard shortcuts : useHotkeys hook pour Cmd+K search, Cmd+Delete, etc.

CHECKLIST QUALITÉ FINALE
 Aucune erreur TypeScript (pnpm type-check)

 Aucune erreur Biome (pnpm lint)

 Toutes notes persistent après refresh

 Auto-save fonctionne (attendre 2s sans typer)

 Preview markdown affiche correctement : headers, lists, code blocks, tables

 Sidebar scrollable si >10 notes

 UI cohérente Tailwind (spacing, colors, fonts)

 Loading state initial visible

 Empty state si aucune note

 Performance fluide (pas de lag typing)

 Code commenté uniquement si logique non-évidente

 Imports organisés (Biome auto-sort)

 Aucun console.log en production

 Build production OK (pnpm build) sans warnings

TECH STACK FINAL
text
Frontend:
  - React 19 (Functional components + Hooks)
  - TypeScript 5.7+ (strict mode)
  - Vite 6 (dev server instantané)
  - Tailwind CSS 4 (PostCSS, no config file)

UI:
  - Shadcn UI (components ownership)
  - Lucide React (icons modernes)
  - Dark mode par défaut

State:
  - Zustand (client state 2KB)
  - IndexedDB via idb-keyval (persistence)

Markdown:
  - react-markdown (rendering)
  - remark-gfm (GitHub Flavored Markdown)
  - rehype-raw + rehype-sanitize (sécurité HTML)

Forms:
  - React Hook Form (performance)
  - Zod (validation type-safe)

Quality:
  - Biome (linter + formatter 20x faster)
  - TypeScript strict
  - Git hooks optionnel (Husky + lint-staged)
RESOURCES COMPLÉMENTAIRES
Vite docs : https://vitejs.dev

Tailwind CSS 4 : https://tailwindcss.com/docs

Shadcn UI : https://ui.shadcn.com

Zustand : https://docs.pmnd.rs/zustand

idb-keyval : https://github.com/jakearchibald/idb-keyval

react-markdown : https://github.com/remarkjs/react-markdown

Biome : https://biomejs.dev