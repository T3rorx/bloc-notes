# Scripts

## seed-from-resources.js

Generates the app’s starter notes from the **Resources/** Markdown files (excluding **Old/**).

**Automatic:** The script runs before `npm run dev` and `npm run build` in `bloc-notes-app`. Resource-based notes stay in sync on each dev start or build.

**Manual** (from repo root): `node scripts/seed-from-resources.js` — or from `bloc-notes-app`: `npm run seed`.

This updates `bloc-notes-app/src/data/seedNotes.js` with the content of:

- Projet block notes.md  
- Projet Bonus Formulaire.md  
- Shadcn-UI.md  
- Composants-fonctionnels.md  
- recommandation.md  

**On refresh:** The app checks whether each seed note (by id) exists in the store; missing ones are added, existing ones are not overwritten. Run after editing any of these files so the app offers the latest versions as default notes (on first load or after clearing IndexedDB).
