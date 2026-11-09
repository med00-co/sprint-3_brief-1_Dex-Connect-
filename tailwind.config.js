// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./script.js", "./data.js"],
//   theme: {
//     extend: {
//       // Thème NEUTRE de départ.
//       // TODO (Partie 1) : remplacez ces valeurs par les couleurs et les polices de votre univers.
//       colors: {
//         brand: {
//           DEFAULT: "#4B5563",
//           dark: "#374151",
//           light: "#E5E7EB",
//         },
//         gold: "#C8A64A",
//         ink: "#14171D",
//         muted: "#545B68",
//         ground:  "#5B3C11",
//         line: "#D5D9E1",
//       },
//       fontFamily: {
//         display: ["Arial", "sans-serif"],
//         body: ["Arial", "sans-serif"],
//         mono: ["Courier New", "monospace"],
//       },
//       borderRadius: {
//         card: "20px",
//       },
//     },
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js", "./data.js"],
  theme: {
    extend: {
      colors: {
        // ---- EXISTING names, Yu-Gi-Oh! values ----
        brand: {
          DEFAULT: "#C8672B", // Effect Monster orange (main buttons)
          dark: "#8F4519",    // hover / pressed
          light: "#F6E7B4",   // card-text parchment
          cardVide: "#e8dfbb",
        },
        gold: "#D4AF37",      // card frame gold
        ink: "#1A1208",       // text on light backgrounds
        muted: "#B9A06A",     // secondary text (old gold)
        ground: "#422d12",    // page background (dark, like the card back)
        line: "#8A6A12",      // borders (dark gold)

        // ---- NEW: gold shades ----
        "gold-light": "#F7E27A",
        "gold-dark": "#8A6A12",

        // ---- NEW: card-type colors (real card frames) ----
        card: {
          normal: "#D6B24F",   // Normal Monster (yellow)
          effect: "#C8672B",   // Effect Monster (orange)
          ritual: "#4E86C5",   // Ritual (blue)
          fusion: "#8B5FA8",   // Fusion (purple)
          synchro: "#EDEDED",  // Synchro (white)
          xyz: "#1B1B1F",      // Xyz (black)
          link: "#1F5FA8",     // Link (dark blue)
          spell: "#1D9E74",    // Spell (green)
          trap: "#BC5A84",     // Trap (pink-purple)
        },

        // ---- NEW: attributes (for filters and badges) ----
        attr: {
          light: "#F5E050",   // Lumière
          dark: "#7B3FA0",    // Ténèbres
          fire: "#E5322D",    // Feu
          water: "#1E88E5",   // Eau
          earth: "#8B5A2B",   // Terre
          wind: "#2EAE6B",    // Vent
          divine: "#D4AF37",  // Divin
        },

        // ---- NEW: form validation ----
        valid: "#22C55E",
        invalid: "#EF4444",

        // button disabled 
        disabled: {
          bg: "#d6d3d1",      // خلفية رمادية فاتحة
          text: "#78716c",    // نص رمادي
          border: "#a8a29e"   // حدود رمادية
        }
      },
      backgroundImage: {
        // metallic gold, for titles, borders and buttons
        "gold-metal": "linear-gradient(135deg, #F7E27A 0%, #D4AF37 45%, #8A6A12 100%)",
      },
      boxShadow: {
        gold: "0 0 18px rgba(212, 175, 55, 0.45)", // golden glow on hover
      },
      fontFamily: {
        display: ['"Cinzel"', "serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};