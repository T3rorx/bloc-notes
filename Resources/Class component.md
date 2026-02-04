Les Class Components

Réduire la ressource
Original
IA
Voir le contenu
Proposer une amélioration du cours

Personnaliser avec l'IA
L'assistant IA sera bientôt disponible.

Les Class Components
1. Introduction
Aujourd'hui, nous allons voir les Class Components. Il s'agit simplement de composants qui sont faits avec des classes JS plutôt qu'avec des fonctions.

2. Historique et contexte
Durant ce cours, jusque-là, tu as fait uniquement des Function Components. Je t'ai parlé plusieurs fois des Class Components, et je t'ai toujours dit que nous les verrons plus tard. Il est temps d'en parler!

Avant la version 16.8 de React il n'existait aucun moyen de gérer le lifeCycle et le state des composants sans passer par une classe, car les hooks n'existaient pas. Les "Function Components" n'étaient utilisés que pour des composants très simples (les "dumb components") qui n'utilisaient pas de state. Mais depuis l'avènement des hooks, les développeurs se sont de plus en plus tournés vers les "Function Components", car ils permettent de produire un code plus concis, plus lisible, et donc facile à maintenir.

Les deux types de composants cohabitent très bien dans une application, et il est assez simple de passer de l'un à l'autre en général. Un grand nombre de projets existants (dont celui de Facebook) utilisent encore beaucoup de "Class Components", c'est pourquoi il est important de savoir comment ils fonctionnent.

3. La ressource
3.1. Mettre en place un Class Component
Nous allons pour le moment créer un petit composant classique, qui affiche juste un titre h1 avec un "Hello world!" et un p, comme avant-hier.

Pour cela, il te suffit de créer un dossier contenant un index.jsx, comme d'habitude. Dedans, nous allons déclarer une classe JS. Nous allons reprendre simplement le composant App de la racine du projet, et en faire un "Class Component":

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <p>How are you?</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
Voilà, tu as fait ton premier "Class Component"! Analysons un peu tout ça:

Tout d'abord, on voit que notre classe étend une classe Component fournie par React. Cela est important, car c'est ce qui va permettre d'utiliser plein de propriétés et méthodes fournies par le framework.

Ensuite, on voit que notre classe implémente une méthode render(). C'est un prérequis (le seul, d'ailleurs) pour que le composant puisse fonctionner. Sans cette méthode (qui doit obligatoirement retourner quelque chose), pas de composant.

3.2. Les props
Pour utiliser les props dans un "Class Component", on va pouvoir utiliser la propriété de classe this.props, fournie par la classe parente React.Component. Voici un second composant, enfant de App qui utilise une prop name:

import React from 'react';

class HelloName extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <h2>Hello {name}!</h2>
    );
  }
}

export default HelloName;
3.3. Le state
Tu te rappelles, nous avions fait un composant "compteur" qui affichait deux boutons permettant d'incrémenter / décrémenter un nombre. Nous utilisions le hook useState() pour avoir un state count et sa fonction setCount(). Nous allons faire le même composant en "Class Component", en utilisant la propriété de classe this.state et la méthode this.setState() fournie par React:

import React from 'react';

class Counter extends React.Component {
  state: { count: 0 }

  increment = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }

  decrement = () => {
    const { count } = this.state;
    this.setState({ count: count - 1 });
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <p>Counting: {count}</p>
      </div>
    );
  }
}

export default Counter;
Comme tu peux le voir, contrairement aux "Function Components", la classe n'a qu'un seul state: c'est la propriété this.state, qui est un objet contenant toutes nos valeurs du state.

Ensuite, pour pouvoir modifier le state, on utilise la méthode this.setState(), à laquelle on doit passer en argument la totalité des nouvelles valeurs du state.

Voici comment utiliser plusieurs valeurs de state:

class MyComponent extends React.Component {
  state: {
    count: 0,
    name: "Jean",
    shoppingCart: [],
  }

  increment = () => {
    const { count } = this.state;
    this.setState((prevState) => (
      { ...prevState, count: count + 1 }
    );
  }

  // ... other methods

  render() {
    const { count, name, shoppingCart } = this.state;

    return (/* ... component render */);
  }
};
Dans la méthode increment, on utilise setState() en lui passant une fonction anonyme permettant de récupérer la valeur précédente du state (nommée ici prevState). Cette fonction retourne un objet qui contient toutes les valeurs du state (grâce à l'opérateur de décomposition ... devant prevState), modifié avec une nouvelle valeur pour la clé count.

3.4. Le constructeur
Si jamais tu as besoin d'effectuer des opérations lors de l'instanciation de ton composant, il te faudra utiliser un constructeur.

Lors de l'instanciation d'un composant, React passera en paramètre du constructeur les props fournies par le composant parent. Ce qui veut dire que notre méthode de constructeur aura le paramètre props, utilisable à l'intérieur.

Quand on utilise un constructeur de "Class Component", quoi qu'on fasse il faut impérativement toujours appeler la fonction super(props). Cette fonction permet tout simplement d'appeler le constructeur de la classe parente React.Component, que l'on étend. Attention à ne pas oublier de lui passer les props! Sans quoi le composant ne fonctionnera pas.

Je vais commenter mon code en français pour que cela soit plus simple à comprendre:

import React from 'react';
import cat from 'assets/img/cat.jpg';

class MyComponent extends React.Component {
  // On peut déclarer le state directement en tant que propriété de classe
  state = {
    isShow: false,
    userName: null,
  }

  // Les props sont fournies en paramètres du constructeur
  constructor(props) {
    // On passe nos props au constructeur de la classe React.Component
    // en appelant la fonction spéciale `super()`
    super(props);

    // Pour les méthodes qui ne sont pas déclarées en tant que propriété de classe
    // (c'est-à-dire sans fonction fléchée), il faut utiliser la fonction `bind()`
    // afin de rendre disponible la référence à `this` dans la méthode.
    this.sayHeyOnClick = this.sayHello.bind(this);
  }

  sayHello() {
    // Ici on a accès à `this`, grâce au `bind` utilisé dans le constructor.
    console.log("Hello!", this.state.userName);
  }

  sayHey = () => {
    // Pas besoin de "bind" pour cette méthode, car on utilise une fonction fléchée
    console.log("Hey!", this.state.userName);
  };

  render() {
    const { text, userName } = this.props
    return (
      <p>
        {text}
        <button type="button" onClick={this.sayHello}>Log hello {userName}!</button>
        <button type="button" onClick={this.sayHey}>Log hey {userName}!</button>
      </p>
    );
  }
}

export default Paragraphs;
Pour plus d'informations sur l'utilité de l'appel à la méthode super() dans le constructeur, tu peux aller voir cet article de Dan Abramov qui en parle.

3.5. Le lifeCycle
On a vu hier ce qu'est le "cycle de vie" des composants React. Les "Class Components" n'échappent pas à la règle, et ont exactement le même cycle de vie. Mais au lieu d'utiliser des hooks (qui sont réservés aux "Function Components"), la classe React.Component nous fournit des méthodes permettant d'interagir avec les 3 phases du cycle de vie.

Contrairement au hook useEffect qui permet de manipuler toutes les phases du cycle de vie en son sein, React nous fournit plusieurs méthodes différentes pour les "Class Components", dont voici les principales:

Phase de "mounting": constructor(), puis render(), et enfin componentDidMount()
Phase d'"updating": componentDidUpdate()
Phase d'"unmounting": componentWillUnmount()
Voici un schéma qui résume bien les différentes méthodes du lifeCycle des "Class Components":



Nous avons déjà vu les méthodes constructor() et render() plus tôt. Voyons maintenant en détail les autres méthodes.

3.5.1. componentDidMount
Le code que l'on écrit dans cette méthode sera exécuté juste après le premier rendu du composant. C'est l'équivalent de la fonction passée à useEffect() quand il n'a pas de dépendance ([] en second paramètre).

Cette méthode n'a pas de paramètre, on peut l'utiliser directement dans notre classe. Exemple de récupération de données sur une API, déclenché dès le composant est monté:

class UsersPage extends React.Component {
  state: { data: [] }

  componentDidMount() {
    fetch('https://my-api.com/acme')
      .then((response) => response.json())
      .then((data) => { this.setState({ data }) });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="UsersPage">
        {data.length > 0 ? <UsersList data={data}> : <Loading />}
      </div>
    );
  }
}
3.5.2. componentDidUpdate
Cette méthode est appelée à chaque fois que le composant a été re-rendu. Contrairement au useEffect(), qui peut réagir uniquement quand une prop ou un state en particulier change (spécifié dans ses dépendances), la méthode componentDidUpdate() sera exécutée à chaque changement, Sans exception! Donc si on veut n'exécuter la fonction que si une prop en particulier a changé par exemple, il nous faut ajouter une condition autour de notre code à exécuter.

Cette méthode a plusieurs paramètres à disposition: prevProps, prevState et snapshot. Les deux premiers sont simplement un moyen de récupérer l'état précédent des props et du state, afin de pouvoir les comparer avec les props et le state actuel. Le troisième paramètre snapshot n'est disponible que si le composant implémente aussi la méthode getSnapshotBeforeUpdate(), je te laisse voir ce qu'il en est dans le doc.

Voici un exemple d'utilisation:

class UserPage extends React.Component {
  state: { userData: null }

  fetchUser = (id) => {
    // Async fetching of user's data, with given ID
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    if (userId !== prevProps.userId) {
      // Refresh user's data when ID passed in props changed
      this.fetchUser(userId);
    }
  }

  render() {
    const { userData } = this.state;
    return (
      <div className="UserPage">
        {userData && <UserProfile data={userData}>}
      </div>
    );
  }
}
3.5.3. componentWillUnmount
Cette méthode sera appelée juste avant que le composant soit démonté ou détruit. Elle ne prend aucun paramètre. Voici un exemple d'utilisation:

class MyComponent extends React.Component {
  intervalId: null

  componentDidMount() {
    // Starts a recurrent fetching of notifications (every 5 sec.)
    this.intervalId = setInterval(
      this.fetchNotifications,
      5000,
    );
  }

  componentWillUnmount() {
    // Stops the recurrent fetching of notifications to avoid memory leak
    clearInterval(this.intervalId);
  }

  render() {
    return (
      // ...
    );
  }
}
4. Ce qui faut retenir
Les "Class Components" sont une autre forme d'écriture des composants React. Ils sont de moins en moins utilisés au profit des "Function Components", mais il est toujours bon de comprendre comment ils fonctionnent pour pouvoir lire du vieux code, et savoir comment transformer une classe en fonction lors d'une session de refactoring.

Les classes de composants React ont besoin d'une méthode render() à minima, et utilisent les propriétés de classe this.props ainsi que this.state pour gérer les props et le state. Des méthodes fournies par la classe React.Component nous permettent de modifier le state (this.setState()), et d'interagir avec le cycle de vie du composant (les principales sont this.componentDidMount, this.componentDidUpdate() et this.componentWillUnmount()).

5. Pour aller plus loin
Il existe d'autres méthodes utiles fournies par la classe React.Component, je te laisse te renseigner dans la documentation officielle.