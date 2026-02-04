# Crée ton bloc-notes (1/2)

Dans le projet d'aujourd'hui, tu vas recréer l'application **Bloc-Notes** disponible sur tous les appareils. Tu pourras même y accéder en hors-ligne et toujours avoir tes données stockées. Tu utiliseras des **composants fonctionnels** et les **hooks** React (voir la ressource *Composants-fonctionnels*).

## 1. Introduction

L'une des applications les plus connues au monde est le simple bloc-notes. Disponible sur Windows comme sur Mac, ce dernier peut servir à n'importe quel moment, et pour tout le monde.

Ton objectif, aujourd'hui, sera de créer un bloc-notes. Dans celui-ci, tu pourras écrire en markdown, et ton texte sera affiché en live sous forme de HTML.

Si tu ne sais pas comment écrire en markdown, c'est facile, ne t'en fais pas : suis ce lien.

L'ensemble des notes sera stocké côté navigateur (localStorage ou IndexedDB). Ainsi, tu ne risques aucun souci avec le RGPD.

## 2. L'application

Ton application sera constituée de plusieurs parties.

- **À gauche** : une barre de navigation avec la liste des notes. L'utilisateur y voit un titre et le début du texte (~15 mots). Un bouton en haut permet de créer une nouvelle note.
- **À droite** (~80 % de la largeur) : en haut, le contenu de la note sélectionnée, rendu en HTML ; en bas, un champ pour le titre de la note et un textarea pour le contenu en markdown.

Pour transformer le markdown en HTML, tu utiliseras une lib adaptée à React (par ex. **react-markdown**) : le markdown s'affiche en live en haut. La sauvegarde se fait au clic sur un bouton « Save » (ou en option : sauvegarde automatique toutes les X secondes). Les notes sont persistées (localStorage ou IndexedDB) pour rester visibles après rechargement. L'utilisateur peut changer de note en cliquant dans la liste à gauche et modifier chaque note à sa guise.

## 3. Rendu attendu

Le rendu attendu est un repo GitHub contenant ton application.

- L'utilisateur peut ajouter une note.
- L'utilisateur peut modifier une note.
- L'utilisateur peut consulter une note.
- L'utilisateur peut basculer entre les notes pour voir celle qu'il veut.
- *[Optionnel]* Le bouton « Sauvegarder » n'existe plus : les notes sont sauvegardées automatiquement (par ex. toutes les 2 secondes après la dernière frappe).

## 4. La démarche à suivre

Ce projet peut sembler compliqué, j'ai donc décidé de t'assister un peu et de te guider jusqu'à ce que tu aies créé une note. Tu seras ensuite en autonomie pour la gestion de plusieurs notes. Ne te mets pas la pression : tu peux valider l'épreuve si tu arrives à faire une seule note correctement sauvegardée.

Pour commencer, initialise une application React (par ex. avec **Vite** : `pnpm create vite@latest bloc-notes-app --template react-ts`).

Ton composant `App` contiendra au moins deux parties pour la zone de droite : **NoteDisplay** (affichage du markdown rendu) et **MarkdownInput** (saisie du titre et du contenu markdown + bouton de sauvegarde). Tout sera écrit en **composants fonctionnels** avec des hooks (voir la ressource *Composants-fonctionnels*).

### 4.1. MarkdownInput

Commence par le **MarkdownInput**. Deux étapes :

1. **Composant contrôlé** : le textarea est piloté par un state (ex. `useState` pour le contenu). Chaque frappe met à jour ce state.
2. **Callback vers le parent** : le parent (ex. `App`) peut recevoir la valeur du textarea via une fonction passée en prop (ex. `onContentChange`). Dans un premier temps, cette fonction peut faire un `console.log` de la valeur.

Pour le composant contrôlé, tu peux t'appuyer sur la doc React ou sur la ressource *Composants-fonctionnels* (state avec `useState`). Pour le callback parent, la doc React sur les props et la remontée d’état s’applique pareil en composants fonctionnels.

### 4.2. NoteDisplay

Le parent (`App`) récupère la donnée du textarea (via le state ou le callback), puis la passe à **NoteDisplay** en prop (ex. `content` ou `markdown`).

Dans NoteDisplay, tu affiches ce markdown converti en HTML. Avec **react-markdown**, tu n'as pas besoin de `dangerouslySetInnerHTML` : le composant gère le rendu de façon sûre. Exemple :

```bash
pnpm add react-markdown remark-gfm
```

```tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function NoteDisplay({ markdown }: { markdown: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
```

À chaque fois que tu écris dans l'éditeur, tu devrais voir le rendu se mettre à jour en live au-dessus.

### 4.3. Sauvegarder les données

Ajoute un bouton « Save » dans **MarkdownInput**. Au clic, une fonction `handleSave` enregistre les données (titre + contenu markdown) dans le **localStorage** (ex. `localStorage.setItem('blocNote', ...)`). Vérifie avec `console.log(localStorage.getItem('blocNote'))` que les données sont bien enregistrées.

Au chargement de l'app, récupère ces données pour initialiser le state. Pour éviter d’appeler `localStorage.getItem()` à chaque rendu, utilise une **fonction d’initialisation** dans `useState` : `useState(() => JSON.parse(localStorage.getItem('blocNote') ?? 'null'))` (ou une structure adaptée à tes notes).

*Pour aller plus loin* : tu peux remplacer le localStorage par **IndexedDB** (par ex. avec `idb-keyval`) pour gérer plus de notes et plus de données — voir la *recommandation* du projet.

### 4.4. À toi de jouer

Avec tout ça, à toi de concevoir la liste de notes à gauche, la sélection de la note courante, et la gestion de plusieurs notes. Souviens-toi qu’il n’y a pas de trop petit composant.
