AntDesign
Parfois, nous n'avons pas besoin d'utiliser un design poussé dans nos applications React. C'est pourquoi des librairies telles que Semantic UI, Material UI ou Ant Design existent et nous mâchent le travail. AntDesign est une librairie avec des composants prêts à l'emploi.

1. Introduction
AntDesign (aka AntD) est une librairie contenant un ensemble de composants préfaits que tu vas pouvoir installer afin de mettre des composants ready-to-use dans ton application.

https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png

2. Historique et contexte
AntDesign est mis à jour très régulièrement. Tu pourras trouver sur leur changelog l'ensemble des fonctionnalités ajoutées peu à peu. N'hésite pas à y passer régulièrement pour voir si du contenu t'intéresse.
⚠ Si ton projet inclut dans le scope un navigateur inférieur à IE11, AntD n'est peut-être pas la solution vers laquelle se tourner.

3. La ressource
3.1. Installation
Pour installer AntDesign dans ton projet, il te suffira de taper l'une des deux commandes en fonction de ton gestionnaire de paquet préféré.

$ pnpm install antd
$ yarn add antd
Il va aussi falloir importer le CSS de AntDesign dans le composant racine de ton projet:

import 'antd/dist/antd.css';
3.2. Utilisation
Pour utiliser un composant fait par AntDesign, il va falloir se balader dans la documentation. Dans mon cas, je souhaite mettre en place un sélecteur en cascade.



Je vais donc taper dans la barre de recherche "cascader". Voici le lien pour y accéder.

Dans les exemples, je décide prendre le premier. Je clique sur "show code".

Directement, voici ce que AntD me propose:

import { Cascader } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const handleChange = (value) => {
  console.log(value);
};

ReactDOM.render(
  <Cascader options={options} onChange={handleChange} placeholder="Please select" />,
  document.getElementById('root'),
);
Donc pour l'importer, je fais comme lorsque j'importe un composant que j'ai créé:

import { Cascader } from 'antd';
Puis, pour l'utiliser, je suis ce que AntD me dit de faire, je décide donc de le mettre dans mon composant App:

import React from 'react';
import ReactDOM from 'react-dom';
import { Cascader } from 'antd';
import 'antd/dist/antd.css';

const App = () => {
  const options = [
    {
      value: 'thp',
      label: 'THP',
      children: [
        {
          value: 'ruby',
          label: 'Ruby',
          children: [
            {
              value: 'rails',
              label: 'Rails',
            },
          ],
        },
      ],
    },
    {
      value: 'javascript',
      label: 'JS',
      children: [
        {
          value: 'react',
          label: 'React',
          children: [
            {
              value: 'functional',
              label: 'Function Components',
            },
          ],
        },
      ],
    },
  ];

  const handleChange = (value) => {
    console.log(value)
  };

  return (
    <div className="App">
      <p>Hey, this is a cool button, created with AntDesign!</p>
      <Cascader
        options={options}
        onChange={handleChange}
        placeholder="Please select"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
Dans options, tu peux mettre toutes les informations que tu souhaites. Aussi, crée une fonction handleChange pour faire ce que tu veux.

Ça y est! Tu as utilisé un composant de AntDesign!

Si tu souhaites importer plusieurs composants AntDesign dans un de tes composants, c'est tout simple:

import { DatePicker, message, Alert } from 'antd';
Puis tu utilises tes composants comme tout à l'heure.

3.3. Icons
Si besoin, tu peux également utiliser des icons.

Tu peux trouver la documentation sur les icons en suivant ce lien.
Pour installer l'utilisation des icons, tu devras taper cette ligne de commande:

pnpm install @ant-design/icons
Ensuite, tu tapes dans la barre de recherche l'icon que tu veux, puis tu n'as plus qu'à cliquer dessus. Le code pour le mettre dans ta page sera automatiquement copié dans ton presse-papier.

Dans mon cas, c'est:

<TwitterOutlined />
Tu vas pouvoir leur donner une taille ou une couleur grâce à des props:

<TwitterOutlined style={{ fontSize: '16px', color: '#08c' }} />
Attention! N'oublie pas d'importer ton icon depuis le package:

 import { TwitterOutlined } from '@ant-design/icons';
4. Ce qu'il faut retenir
AntDesign va te permettre d'avoir des composants prêts à l'emploi. Généralement utilisé dans le back-end d'applications, tu vas aussi pouvoir l'utiliser où bon te semble.

5. Pour aller plus loin
Si AntDesign ne te plaît pas, il existe d'autres librairies ayant le même usage. Je t'invite par exemple à te renseigner à propos de MaterialUI.

Si AntDesign te convient, tu pourras trouver dans la barre de gauche, toute une liste de composants disponible!

Voici également un avis sur AntDesign par un de ses utilisateurs de longue date. Tu pourras y voir ses avantages et inconvénients.