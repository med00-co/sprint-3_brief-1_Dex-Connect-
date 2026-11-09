// =============================================================
// data.js — les créatures de VOTRE univers
// =============================================================
// TODO : remplissez ce tableau avec au moins 12 créatures
// (Pokémon, Digimon ou Yu-Gi-Oh!), en respectant ce format :
//
// {
//   id: "#001",                                   // "#" suivi de 3 chiffres
//   name: "Exemple",                              // texte
//   type: "Feu",                                  // une valeur d'une liste fixe
//   level: "Base",                                // texte
//   stats: { hp: 45, attack: 49, defence: 49 },   // 3 nombres de 0 à 999
//   image: "https://example.com/001.png",         // lien https vers une image
//   description: "Une courte description."        // 10 à 200 caractères
// }
//
// Pensez à citer la source de vos images dans le README.

const cards = [
  {
    id: 1,
    name: "Black Rose Dragon",
    image: "https://images.ygoprodeck.com/images/cards/73580471.jpg",
    attribute: "Fire",
    attrClass: "bg-attr-fire",
    level: 7,
    type: "Dragon / Synchro",
    atk: 2400,
    def: 1800,
    description: "Monstre Synchro : quand il est invoqué par Synchro, tu peux détruire toutes les cartes sur le terrain." // ⚠ à vérifier
  },
  {
    id: 2,
    name: "Obelisk the Tormentor",
    image: "https://images.ygoprodeck.com/images/cards/10000000.jpg",
    attribute: "Divine",
    attrClass: "bg-attr-divine",
    level: 10,
    type: "Divine-Beast",
    atk: 4000,
    def: 4000,
    description: "Demande 3 Tributs pour être invoqué. Immunisé contre les Pièges. En sacrifiant 2 monstres, il détruit tous les monstres de l'adversaire et inflige 4000 points de dégâts."
  },
  {
    id: 3,
    name: "A Cat of Ill Omen",
    image: "https://images.ygoprodeck.com/images/cards/24140059.jpg",
    attribute: "Dark",
    attrClass: "bg-attr-dark",
    level: 3,
    type: "Beast",
    atk: 1000, // ⚠ à vérifier
    def: 1000, // ⚠ à vérifier
    description: "Quand il est invoqué, tu peux placer 1 Piège de ton Deck sur le dessus de ton Deck."
  },
  {
    id: 4,
    name: "Absolute King - Megaplunder",
    image: "https://images.ygoprodeck.com/images/cards/27553701.jpg",
    attribute: "Earth",
    attrClass: "bg-attr-earth",
    level: 1, // ⚠ à vérifier
    type: "Fiend", // ⚠ à vérifier
    atk: 0, // ⚠ à vérifier
    def: 0, // ⚠ à vérifier
    description: "À compléter depuis la vraie carte." // ⚠ à vérifier
  },
  {
    id: 5,
    name: "Adamancipator Risen - Raptite",
    image: "https://images.ygoprodeck.com/images/cards/73079836.jpg",
    attribute: "Wind",
    attrClass: "bg-attr-wind",
    level: 4, // ⚠ à vérifier
    type: "Rock", // ⚠ à vérifier
    atk: 1900, // ⚠ à vérifier
    def: 0, // ⚠ à vérifier
    description: "À compléter depuis la vraie carte." // ⚠ à vérifier
  },
  {
    id: 6,
    name: "Altergeist Malwisp",
    image: "https://images.ygoprodeck.com/images/cards/27132400.jpg",
    attribute: "Light",
    attrClass: "bg-attr-light",
    level: 3, // ⚠ à vérifier
    type: "Fiend", // ⚠ à vérifier
    atk: 0, // ⚠ à vérifier
    def: 0, // ⚠ à vérifier
    description: "À compléter depuis la vraie carte." // ⚠ à vérifier
  },
  {
    id: 7,
    name: "Adularia of the June Moon",
    image: "https://images.ygoprodeck.com/images/cards/15464375.jpg",
    attribute: "Water",
    attrClass: "bg-attr-water",
    level: 2, // ⚠ à vérifier
    type: "Fairy", // ⚠ à vérifier
    atk: 0, // ⚠ à vérifier
    def: 0, // ⚠ à vérifier
    description: "À compléter depuis la vraie carte." // ⚠ à vérifier
  },

  // 5 nouvelles cartes
  {
    id: 8,
    name: "Blue-Eyes White Dragon",
    image: "https://images.ygoprodeck.com/images/cards/89631139.jpg",
    attribute: "Light",
    attrClass: "bg-attr-light",
    level: 8,
    type: "Dragon",
    atk: 3000,
    def: 2500,
    description: "Ce dragon légendaire est une puissante machine de destruction. Presque invincible, très peu l'ont affronté et en sont revenus."
  },
  {
    id: 9,
    name: "Dark Magician",
    image: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
    attribute: "Dark",
    attrClass: "bg-attr-dark",
    level: 7,
    type: "Spellcaster",
    atk: 2500,
    def: 2100,
    description: "Le magicien ultime en termes d'attaque et de défense."
  },
  {
    id: 10,
    name: "Red-Eyes Black Dragon",
    image: "https://images.ygoprodeck.com/images/cards/74677422.jpg",
    attribute: "Dark",
    attrClass: "bg-attr-dark",
    level: 7,
    type: "Dragon",
    atk: 2400,
    def: 2000,
    description: "Un dragon aux yeux rouges luisants, dont la force a peu d'égal."
  },
  {
    id: 11,
    name: "Slifer the Sky Dragon",
    image: "https://images.ygoprodeck.com/images/cards/10000020.jpg",
    attribute: "Divine",
    attrClass: "bg-attr-divine",
    level: 10,
    type: "Divine-Beast",
    atk: "?",
    def: "?",
    description: "Demande 3 Tributs. Gagne 1000 ATK/DEF par carte dans ta main. Quand l'adversaire invoque un monstre, celui-ci perd 2000 ATK et est détruit s'il tombe à 0."
  },
  {
    id: 12,
    name: "The Winged Dragon of Ra",
    image: "https://images.ygoprodeck.com/images/cards/10000010.jpg",
    attribute: "Divine",
    attrClass: "bg-attr-divine",
    level: 10,
    type: "Divine-Beast",
    atk: "?",
    def: "?",
    description: "Demande 3 Tributs. Son ATK/DEF dépend des monstres sacrifiés, et tu peux payer des Points de Vie pour augmenter son ATK."
  }
];


