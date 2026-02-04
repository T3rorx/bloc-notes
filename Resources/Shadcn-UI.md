# Shadcn UI

Parfois, nous n'avons pas besoin de tout designer from scratch dans nos applications React. Des bibliothèques de composants nous permettent d'avancer vite tout en gardant la main sur le code. **Shadcn UI** est une collection de composants réutilisables que tu copies dans ton projet (tu en deviens propriétaire) et que tu styles avec **Tailwind CSS**.

## 1. Introduction

Shadcn UI n'est pas une dépendance npm classique : ce sont des composants **copiés dans ton repo** (souvent dans `src/components/ui/`). Tu les installes via une CLI qui ajoute uniquement le code dont tu as besoin. Basés sur **Radix UI** (accessibilité, comportements) et **Tailwind CSS** (styles), ils sont entièrement personnalisables car le code vit chez toi. Idéal pour des apps React modernes (Vite, React 18/19, TypeScript).

## 2. Historique et contexte

Shadcn UI est maintenu activement et s'aligne sur l'écosystème actuel : React 19, Tailwind CSS 4, TypeScript. Pas de bundle CSS global à importer : tout est en utilitaires Tailwind et variables CSS. Les composants ciblent les navigateurs modernes (plus de support IE11). Si tu veux une UI cohérente, accessible et facile à thématiser (ex. dark mode), Shadcn est un choix solide en 2025–2026.

## 3. La ressource

### 3.1. Prérequis et installation

Tu dois avoir un projet **Vite + React + TypeScript** avec **Tailwind CSS** déjà configuré. Ensuite, initialiser Shadcn une seule fois à la racine du projet :

```bash
pnpm dlx shadcn@latest init
```

Réponds aux questions (TypeScript : Yes, style : Default, base color : Slate, CSS variables : Yes, etc.). La CLI crée notamment :

- `components.json` (config des chemins)
- `src/lib/utils.ts` avec la fonction `cn()` pour fusionner les classes Tailwind

Ensuite, installe uniquement les composants dont tu as besoin, par exemple Button et un sélecteur :

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add select
```

Chaque composant est ajouté dans `src/components/ui/` (ou le chemin que tu as choisi). Aucun `import '.../global.css'` type Ant Design : le style vient de Tailwind et du thème défini dans ton CSS.

### 3.2. Utilisation

Après l'installation, les composants sont dans ton code. Exemple avec un **Select** (équivalent conceptuel au Cascader pour un cas simple) et un **Button** :

```tsx
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function App() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <p>Composants Shadcn UI + Tailwind</p>

      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Choisis une option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="thp">THP</SelectItem>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="rails">Rails</SelectItem>
        </SelectContent>
      </Select>

      <Button>Clique moi</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}
```

Pour découvrir tous les composants disponibles (Input, Dialog, Card, etc.), consulte la doc officielle et utilise la CLI pour les ajouter au projet au fur et à mesure.

### 3.3. Icons : Lucide React

Pour les icônes, la stack moderne recommande **Lucide React** : cohérent avec Shadcn, léger, tree-shakeable.

Installation :

```bash
pnpm add lucide-react
```

Utilisation : importe l’icône dont tu as besoin et utilise-la comme composant. Tu peux lui passer des props (taille, couleur) via `className` ou `style` :

```tsx
import { Plus, Trash2, Twitter } from 'lucide-react'

function MyComponent() {
  return (
    <div className="flex gap-2 items-center">
      <Plus className="h-5 w-5 text-primary" />
      <Trash2 size={20} className="text-destructive" />
      <Twitter style={{ fontSize: '24px', color: '#08c' }} />
    </div>
  )
}
```

Pas de package séparé à configurer : une seule dépendance `lucide-react`, et tu n’importes que les icônes utilisées.

## 4. Ce qu'il faut retenir

- Shadcn UI = composants **copiés dans ton repo**, pas une grosse lib à importer. Tu gardes le contrôle du code et du style.
- Stack typique : Vite + React + TypeScript + Tailwind CSS + Shadcn (Radix + Tailwind) + Lucide pour les icônes.
- Pas d’import CSS global dédié : tout passe par Tailwind et ton thème (variables CSS, dark mode, etc.).
- Pour un nouveau projet React moderne, Shadcn UI + Lucide est une alternative solide et à jour aux anciennes libs (Ant Design, Material UI) dans beaucoup de cas.

## 5. Pour aller plus loin

- Documentation officielle : [ui.shadcn.com](https://ui.shadcn.com)
- Composants disponibles : parcourir le site et ajouter au besoin avec `pnpm dlx shadcn@latest add <component>`.
- Lucide : [lucide.dev](https://lucide.dev) pour chercher les icônes et copier le nom du composant à importer depuis `lucide-react`.

Si tu veux comparer avec d’autres approches, tu peux regarder **Radix UI** (primitives sans style) ou **Material UI** (MUI) ; Shadcn apporte une couche Radix + Tailwind prête à l’emploi et facile à adapter.
