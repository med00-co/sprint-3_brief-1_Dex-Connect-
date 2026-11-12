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
  Divine: "shadow-attr-divine/60",
  Spell_Trap : "shadow-card-spell/70",
}

// ----------------------------------------------attrClasses
export const attrClasses = {
  Fire: "bg-attr-fire",
  Water: "bg-attr-water", 
  Dark: "bg-attr-dark",
  Earth: "bg-attr-earth",
  Wind: "bg-attr-wind", 
  Light: "bg-attr-light", 
  Divine: "bg-attr-divine",
  Spell_Trap : "bg-card-spell/60"
}

// ----------------------------------------------createCard()
const cardClass = "flex flex-col gap-3 border-2 border-ink  bg-[url('../image/cover.jpg')] p-3 pb-4  rounded-[24px] overflow-hidden bg-cover bg-center bg-no-repeat  h-full w-full    shadow-[0_0_20px_3px]    cursor-pointer transition-[transform,translate,scale,rotate,opacity,box-shadow] duration-300 group-hover:opacity-35 group-hover:scale-95 hover:opacity-100! hover:scale-100 hover:-translate-y-2.5 hover:shadow-[0_16px_36px_rgba(0,0,0,.4)]  focus-visible:opacity-100! focus-visible:-translate-y-2.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-thv18-green motion-reduce:transition-none "

function createCard(card){
   const article = document.createElement("article")
    
   const attrNameForEffect = card.attribute != "Spell/Trap" ? card.attribute : "Spell_Trap"
    article.className = cardClass
    article.classList.add(glowClasses[attrNameForEffect])
    article.setAttribute("data-attribute", `${card.attribute}`)
    article.dataset.id = card.id
    const attributeClass = card.attribute != "Spell/Trap" ? attrClasses[card.attribute] : "Spell_Trap"

    article.innerHTML = `
           <div class="relative flex h-70 items-center justify-center rounded-xl bg-brand-light ">
              <img src="${card.image}" alt="${card.name}" class="h-full w-full" >
             <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${String(card.id).padStart(3 ,"0")}</span>
           </div>
           <div class="flex items-center justify-between gap-2 ml-2">
             <h3 class="font-display text-xl text-white font-semibold">${card.name}</h3>
             <span class="rounded-full ${attributeClass} px-3 py-1 text-sm font-bold text-white" >${card.attribute}</span>
           </div>
           <p class="text-sm font-semibold text-white ml-2 mb-1">ATK ${card.atk} / DEF ${card.def}</p>
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

// --------------------------------------------showLoading(container)
export const showLoading = (container) => {
    container.innerHTML = ""
    const loadingPhase = document.createElement('div')
    loadingPhase.className = "inline-flex items-center gap-3 col-span-full my-10"
    loadingPhase.setAttribute('role', 'status')
    loadingPhase.innerHTML = `
    
  <svg
    class="size-6 animate-spin text-indigo-600 dark:text-indigo-300"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>

    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>

  <p class="font-medium text-gray-700 dark:text-gray-200">Chargement...</p>

    `
    container.appendChild(loadingPhase)
}
// --------------------------------------------showEmpty(container, text)
export const showEmpty = (container, text) => {
    container.innerHTML = ""
    container.innerHTML = `
    <div class="max-w-md text-center col-span-full">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="mx-auto size-20 text-gray-400"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
    />
  </svg>

  <h2 class="mt-6 text-2xl font-bold text-gold">Hmm, nothing found</h2>

  <p class="mt-4 text-pretty text-white-700">
    ${text}
  </p>
  </div>
    `
}

// --------------------------------------------showError(container, message)
export const showError = (container, message) => {
    container.innerHTML = `
    <div class=" flex flex-col bg-ink/70 px-2 text-center gap-10 rounded-xl col-span-full h-screen ">
      <div class="h-screen flex flex-col justify-center items-center">
        <h1 class="text-4xl font-extrabold text-red-500 font-display ">ERROR</h1>
        <p class="text-2xl font-medium text-white mt-10 border-2 rounded-md py-6 font-body ">${message}</p>
        <p class="text-md text-white mt-12">Désolé pour le dérangement. Réessaye plus tard.</p>

        <button class="retry-btn rounded-xl mt-10 bg-attr-dark p-3 text-white hover:bg-none hover:bg-attr-dark/80 ">Réessayer</button>
       </div>
    </div>
    `
    
}