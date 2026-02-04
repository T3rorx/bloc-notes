# Les composants fonctionnels (Function Components)

Aujourd’hui, la façon recommandée d’écrire des composants React est d’utiliser des **fonctions** plutôt que des classes. On parle de **Function Components**. Avec les **hooks** (depuis React 16.8), tu gères le state et le cycle de vie directement dans ces fonctions, sans `this` ni constructeur.

## 1. Introduction

Un composant fonctionnel est une fonction JavaScript qui reçoit des **props** en argument et retourne du **JSX**. Pour le state et les effets de bord (appels API, timers, abonnements), tu utilises des **hooks** fournis par React : `useState`, `useEffect`, `useRef`, etc. C’est le modèle standard pour tout nouveau code React en 2025–2026.

## 2. Historique et contexte

Avant React 16.8, le state et le cycle de vie n’étaient disponibles que dans les **Class Components**. Les Function Components servaient surtout à des composants “simples” sans state. Depuis l’arrivée des hooks, les Function Components permettent de tout faire (state, lifecycle, contexte) avec un code plus court et plus lisible, sans `this` ni `bind`. React recommande désormais les Function Components pour les nouveaux projets ; les Class Components restent utiles pour **lire** d’anciens projets ou pour une migration progressive.

## 3. La ressource

### 3.1. Mettre en place un Function Component

On part d’un composant minimal : un titre et un paragraphe. Avec un projet Vite + React, le point d’entrée utilise `createRoot` (React 18+) :

```tsx
import { createRoot } from 'react-dom/client'
import App from './App'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(<App />)
}
```

Le composant `App` est une simple fonction qui retourne du JSX :

```tsx
function App() {
  return (
    <div>
      <h1>Hello world</h1>
      <p>How are you?</p>
    </div>
  )
}

export default App
```

Tu peux aussi écrire en fléchée : `const App = () => { ... }`. Pas de classe, pas de `render()`, pas de `this` : la fonction *est* le composant.

### 3.2. Les props

Les props sont le premier argument de la fonction. Tu les déstructure souvent pour plus de clarté :

```jsx
function HelloName({ name }) {
  return <h2>Hello {name}!</h2>
}

export default HelloName
```

Le parent passe les props comme d’habitude : `<HelloName name="Alice" />`. En JavaScript, les props sont des objets ; tu peux les déstructurer dans les paramètres. XXX d’avoir l’autocomplétion et de détecter les erreurs.

### 3.3. Le state : useState

Pour un state local, tu utilises le hook **useState**. Il renvoie la valeur actuelle et une fonction pour la mettre à jour. Exemple compteur :

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div>
      <button type="button" onClick={increment}>+</button>
      <button type="button" onClick={decrement}>-</button>
      <p>Compteur : {count}</p>
    </div>
  )
}

export default Counter
```

Contrairement aux Class Components, tu peux avoir autant de `useState` que nécessaire, chacun pour une donnée précise. Pour des mises à jour basées sur la valeur précédente (éviter les race conditions), passe une fonction à `setCount` :

```tsx
setCount((prev) => prev + 1)
```

Plusieurs valeurs de state : plusieurs hooks :

```tsx
function MyComponent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Jean')
  const [items, setItems] = useState([])

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  return (
    <div>
      <p>{name}, compteur : {count}</p>
      {/* ... */}
    </div>
  )
}
```

Pas d’objet `this.state` unique : chaque state est isolé et plus facile à raisonner.

### 3.4. Pas de constructeur : initialisation et refs

En Function Component, il n’y a pas de constructeur. Le code en haut du corps de la fonction s’exécute à chaque rendu. Pour une valeur qui ne doit pas déclencher de re-render (référence à un élément DOM, identifiant de timer, etc.), tu utilises **useRef** :

```tsx
import { useRef } from 'react'

function MyComponent() {
  const inputRef = useRef(null)
  const intervalIdRef = useRef(null)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return <input ref={inputRef} type="text" />
}
```

Pour l’initialisation du state à partir d’une opération coûteuse (ex. lecture du `localStorage`), tu peux passer une **fonction** à `useState` : elle ne sera exécutée qu’au premier rendu :

```tsx
const [data, setData] = useState(() => {
  return JSON.parse(localStorage.getItem('key') ?? '[]')
})
```

### 3.5. Le cycle de vie : useEffect

Le hook **useEffect** remplace les méthodes de cycle de vie des classes (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) en un seul endroit. La fonction que tu passes est exécutée après le rendu ; le tableau de dépendances indique *quand* la ré-exécuter, et la fonction de cleanup (optionnelle) correspond au démontage.

**Après le montage uniquement** (équivalent de `componentDidMount`) :

```tsx
import { useState, useEffect } from 'react'

function UsersPage() {
  const [data, setData] = useState<unknown[]>([])

  useEffect(() => {
    fetch('https://my-api.com/acme')
      .then((res) => res.json())
      .then((data) => setData(data))
  }, []) // tableau vide = une seule fois au montage

  return (
    <div className="UsersPage">
      {data.length > 0 ? <UsersList data={data} /> : <Loading />}
    </div>
  )
}
```

**Réagir à un changement de prop** (équivalent de `componentDidUpdate` ciblé) :

```tsx
function UserPage({ userId }) {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setUserData)
  }, [userId]) // re-exécuté quand userId change

  return (
    <div className="UserPage">
      {userData && <UserProfile data={userData} />}
    </div>
  )
}
```

**Cleanup au démontage** (équivalent de `componentWillUnmount`) :

```tsx
function MyComponent() {
  const intervalIdRef = useRef(null)

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      fetchNotifications()
    }, 5000)

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current)
    }
  }, [])

  return <div>...</div>
}
```

La fonction retournée par `useEffect` est appelée au démontage du composant (et avant de ré-exécuter l’effet si les dépendances changent). C’est là qu’on nettoie les timers, abonnements, etc., pour éviter les fuites mémoire.

Résumé rapide :

- **Montage** : `useEffect(fn, [])`
- **Mise à jour** (quand une valeur change) : `useEffect(fn, [propOuState])`
- **Démontage / cleanup** : `return () => { ... }` dans le `useEffect`

## 4. Ce qu’il faut retenir

- Les **Function Components** sont des fonctions qui prennent des props et retournent du JSX. C’est la forme recommandée pour tout nouveau code React.
- Le **state** se gère avec **useState** (une ou plusieurs valeurs), sans `this.state` ni `this.setState`.
- Les **props** sont le premier argument de la fonction (objet JavaScript).
- Il n’y a **pas de constructeur** : initialisation via `useState(() => ...)` si besoin, et **useRef** pour références ou valeurs qui ne déclenchent pas de rendu.
- Le **cycle de vie** se gère avec **useEffect** : tableau de dépendances pour “quand” exécuter, fonction de retour pour le cleanup (démontage).

Connaître les Class Components reste utile pour lire d’anciens projets ; pour écrire du nouveau code, privilégie toujours les Function Components et les hooks.

## 5. Pour aller plus loin

- Documentation React (hooks) : [react.dev/reference/react](https://react.dev/reference/react)
- Règles des hooks : ne les appeler qu’en haut du composant (pas dans des conditions ou boucles).
- Autres hooks utiles : `useContext`, `useMemo`, `useCallback`, `useReducer` pour des cas plus avancés.

Si tu tombes sur du code avec des Class Components, tu peux le migrer progressivement vers des Function Components en remplaçant `this.state` / `setState` par `useState`, et les méthodes de lifecycle par `useEffect`.
