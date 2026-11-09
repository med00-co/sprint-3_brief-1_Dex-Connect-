# Mon Dex — Yu-Gi-Oh!

Encyclopédie interactive de cartes monstres Yu-Gi-Oh! réalisée dans le cadre du Sprint 2.

## Description

Mon Dex permet de consulter, rechercher, filtrer et créer des cartes monstres, ainsi que de constituer une équipe de 6 cartes maximum.

## Fonctionnalités

- Affichage dynamique des cartes depuis `data.js`
- Panneau de détail avec image, description et barres ATK / DEF
- Recherche en temps réel (insensible à la casse)
- Filtre par attribut (Fire, Water, Dark, Earth, Wind, Light, Divine)
- Création de nouvelles cartes avec validation par expressions régulières
- Gestion de l’équipe :
  - Ajouter / Retirer
  - Maximum 6 cartes
  - Pas de doublon
  - Message clair en cas de refus
  - Compteur x/6
- Interface responsive

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/med00-co/brief1-Dex_YuGiOh 
cd mon-dex
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer Tailwind en mode watch :
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

4. Ouvrir `index.html` dans le navigateur.

## Structure du projet

```
mon-dex/
├── index.html
├── script.js
├── data.js
├── dist/
│   └── output.css
├── src/
│   └── input.css
├── tailwind.config.js
└── README.md
```

## Données

Les 12 cartes de base sont stockées dans `data.js`.

Les images proviennent de [YGOPRODeck](https://ygoprodeck.com/).

## Validation du formulaire (expressions régulières)

### Numéro
```js
/^#\d{3}$/
```
- Valides : `#001`, `#012`, `#999`
- Invalides : `001`, `#12`, `#1234`, `abc`

### Nom
```js
/^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/
```
- Valides : `Dark Magician`, `Blue-Eyes`, `Obelisk`
- Invalides : `A`, ` `, `Carte@Speciale`

### ATK / DEF
```js
/^\d{1,4}$/
```
- Valides : `0`, `2500`, `9999`
- Invalides : `-10`, `10000`, `abc`

### Image
```js
/^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i
```
- Valides : `https://example.com/card.png`, `https://images.ygoprodeck.com/images/cards/89631139.jpg`
- Invalides : `http://example.com/card.png`, `https://example.com/card.bmp`

### Description
```js
/^[\s\S]{10,200}$/
```
- Valides : texte entre 10 et 200 caractères
- Invalides : texte trop court ou trop long

## Technologies

- HTML5
- CSS (Tailwind CSS)
- JavaScript (Vanilla + DOM)


## Github Projects
lien : https://github.com/users/med00-co/projects/13

## Auteur

Mohamed Id Irrami
```