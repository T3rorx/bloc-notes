# Projet bonus : Mettre en place un formulaire

Dans ce projet, tu mettras en place un formulaire pour créer un compte pour un programme d'apprentissage au développement, en utilisant des composants UI modernes (**Shadcn UI** — voir la ressource *Shadcn-UI*).

Ce projet n'est pas validant : ne le fais pas en priorité, tu peux le reprendre en fin de semaine. Il sert à utiliser Shadcn UI (ou une lib de composants) et à te familiariser avec React en composants fonctionnels.

## 1. Présentation

Pour t'exercer à utiliser une lib de composants, tu vas mettre en place un formulaire fonctionnel. Les créateurs de THP souhaitent changer le formulaire de contact pour renseigner toutes les informations d'inscription à un programme d'apprentissage au développement. Tu mettras ce formulaire en place pour les aider.

Tu utiliseras **Shadcn UI** pour les champs, boutons, sélecteurs, etc. (voir la ressource *Shadcn-UI*). Lorsque le formulaire sera envoyé, s'il n'y a pas d'erreur, l'utilisateur verra une notification de confirmation.

## 2. L'application

Ton application demandera plusieurs données. À toi de choisir le composant le plus adapté pour chaque type de champ (Input, Select, RadioGroup, etc.) et de les mettre en required ou non.

Les champs seront organisés en **trois étapes**.

**Contact :**
- Nom  
- Prénom  
- Genre  
- Date de naissance  
- Mail  
- Téléphone  
- Ville  

**Développement :**
- Niveau en développement web (général)  
- Langages connus et niveau pour chacun  
- Langage que l'utilisateur souhaite apprendre (liste)  

**Prise de rendez-vous (optionnel) :**
- Motif (liste)  
- Date souhaitée  

Pour passer à l'étape suivante, tous les champs de l'étape en cours doivent être valides ; sinon, l'utilisateur voit des messages d'erreur.

Quand toutes les étapes sont remplies et validées, l'utilisateur voit une notification indiquant qu'il sera contacté. Les informations peuvent être affichées dans la console sous forme d'un objet.

## 3. Pour aller plus loin

Quand tu auras fini, tu peux par exemple :

- Enchaîner avec **React Hook Form** et **Zod** pour la validation et la gestion des erreurs (voir la *recommandation* du projet).
- Reste en **composants fonctionnels** et hooks ; c’est le standard actuel (voir la ressource *Composants-fonctionnels*).

---

*Projet principal : [Crée ton bloc-notes (1/2)](./Projet%20block%20notes.md)*
