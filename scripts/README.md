# Scripts

## seed-from-resources.js

Génère les notes de démarrage de l’app à partir des fichiers **Resources/** (hors **Old/**).

**Automatique** : le script est lancé avant `npm run dev` et `npm run build` dans `bloc-notes-app`. Les notes Ressources restent à jour à chaque lancement ou build.

**Manuel** (depuis la racine du repo) : `node scripts/seed-from-resources.js` — ou depuis `bloc-notes-app` : `npm run seed`.

Cela met à jour `bloc-notes-app/src/data/seedNotes.js` avec le contenu de :

- Projet block notes.md  
- Projet Bonus Formulaire.md  
- Shadcn-UI.md  
- Composants-fonctionnels.md  
- recommandation.md  

**Au refresh** : l'app vérifie si chaque note de seed (par id) existe en base ; les manquantes sont ajoutées, les existantes ne sont pas écrasées. À lancer après avoir modifié un de ces fichiers pour que l’app propose les dernières versions en notes par défaut (au premier chargement ou après vidage d’IndexedDB).
