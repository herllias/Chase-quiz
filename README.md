# Chase Quiz

Bienvenue dans **Chase Quiz**, une application de quiz interactive conçue pour deux joueurs, offrant une expérience personnalisée et amusante !

## Description du Projet

Chase Quiz est une application web développée avec Angular qui permet à deux joueurs de s'affronter dans un quiz. Chaque joueur répond à un ensemble de questions qui lui sont propres, rendant l'expérience unique pour chacun. À la fin du quiz, les scores sont affichés et un message amusant et personnalisé est généré pour célébrer le gagnant (ou l'égalité !).

## Fonctionnalités

*   **Quiz Personnalisé**: Chaque joueur répond à sa propre série de questions.
*   **Gestion des Joueurs**: Saisie des noms des joueurs au début du jeu.
*   **Suivi des Scores**: Les scores sont maintenus séparément pour chaque joueur.
*   **Écran de Transition**: Un écran de transition convivial entre les tours des joueurs.
*   **Résultats Amusants**: Affichage des scores finaux avec un message personnalisé et des emojis pour le gagnant.
*   **Réinitialisation du Jeu**: Possibilité de rejouer facilement.

## Technologies Utilisées

*   **Angular**: Framework pour le développement de l'application front-end.
*   **TypeScript**: Langage de programmation pour le développement.
*   **SCSS**: Préprocesseur CSS pour des styles modulaires et maintenables.
*   **RxJS**: Pour la gestion des états réactifs dans le `QuizService`.

## Installation et Démarrage

Suivez ces étapes pour configurer et exécuter le projet localement.

### Prérequis

Assurez-vous d'avoir installé :
*   [Node.js](https://nodejs.org/en/) (version 18.x ou supérieure recommandée)
*   [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
*   [Angular CLI](https://angular.io/cli) (installez-le globalement avec `npm install -g @angular/cli`)

### Étapes

1.  **Cloner le dépôt**:
    ```bash
    git clone https://github.com/herllias/Chase-quiz.git
    cd Chase-quiz
    ```

2.  **Installer les dépendances**:
    ```bash
    npm install
    ```

3.  **Démarrer l'application**:
    ```bash
    npm start
    ```
    L'application sera disponible à l'adresse `http://localhost:4200/` dans votre navigateur.

## Utilisation

1.  Sur la page d'accueil, entrez les noms des deux joueurs.
2.  Cliquez sur "Démarrer le Quiz".
3.  Le Joueur 1 répondra à ses questions.
4.  Un écran de transition apparaîtra, puis le Joueur 2 prendra le relais.
5.  Le Joueur 2 répondra à ses questions.
6.  La page de résultats affichera les scores des deux joueurs et un message amusant.
7.  Cliquez sur "Rejouer" pour recommencer une nouvelle partie.

---