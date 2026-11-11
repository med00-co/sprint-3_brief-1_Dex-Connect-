// -------------------------------------------------imports---------

// -----------------------------------------------------------------
// -----------------------------------------------glowClasses
export const glowClasses = {
  Fire:   "shadow-attr-fire/60",
  Water:  "shadow-attr-water/60",
  Dark:   "shadow-attr-dark/60",
  Earth:  "shadow-attr-earth/60",
  Wind:   "shadow-attr-wind/60",
  Light:  "shadow-attr-light/60",
  Divine: "shadow-attr-divine/60"
}

// ----------------------------------------------attrClasses
export const attrClasses = {
  Fire: "bg-attr-fire",
  Water: "bg-attr-water", 
  Dark: "bg-attr-dark",
  Earth: "bg-attr-earth",
  Wind: "bg-attr-wind", 
  Light: "bg-attr-light", 
  Divine: "bg-attr-divine"
}

// ----------------------------------------------createCard()
const cardClass = "flex flex-col gap-3 rounded-card bg-white p-3 pb-4    h-full w-full    shadow-[0_0_20px_3px]    cursor-pointer transition-[transform,translate,scale,rotate,opacity,box-shadow] duration-300 group-hover:opacity-35 group-hover:scale-95 hover:opacity-100! hover:scale-100 hover:-translate-y-2.5 hover:shadow-[0_16px_36px_rgba(0,0,0,.4)] focus-visible:opacity-100! focus-visible:-translate-y-2.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-thv18-green motion-reduce:transition-none "

function createCard(card){
   const article = document.createElement("article")
    
    article.className = cardClass
    article.classList.add(glowClasses[card.attribute])
    article.setAttribute("data-attribute", `${card.attribute}`)
    article.dataset.id = card.id
    const attributeClass = card.attribute != "Unknown" ? attrClasses[card.attribute] : ""

    article.innerHTML = `
           <div class="relative flex h-70 items-center justify-center rounded-xl bg-brand-light ">
              <img src="${card.image}" alt="${card.name}" class="h-full w-full" >
             <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${String(card.id).padStart(3 ,"0")}</span>
           </div>
           <div class="flex items-center justify-between gap-2">
             <h3 class="font-display text-xl font-semibold">${card.name}</h3>
             <span class="rounded-full ${attributeClass} px-3 py-1 text-sm font-bold text-ink" >${card.attribute}</span>
           </div>
           <p class="text-sm font-semibold">ATK ${card.atk} / DEF ${card.def}</p>
           <button class="btn-outline add-to-team mt-auto hover:bg-gold-metal hover:border-0 disabled:hover:bg-none disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-disabled-border disabled:cursor-not-allowed disabled:hover:bg-disabled-bg"> Ajouter à l'équipe </button>
           `;
          

     

    return article ;
}

// ----------------------------------------------renderGrid()
export const renderGrid = (list, append = false) => {
    const grid = document.getElementById("grid")
    if(!append){
       grid.innerHTML = ""
    }
    list.forEach((creature) => {
        const card = createCard(creature)
        grid.appendChild(card)
    });
}