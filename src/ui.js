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
    const attributeClass = attrClasses[attrNameForEffect]

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
    loadingPhase.className = "flex gap-2 col-span-full my-10 items-center"
    loadingPhase.setAttribute('role', 'status')
    loadingPhase.setAttribute('aria-label', 'Loading')
    loadingPhase.innerHTML = `
    
  <span
    class="size-5 animate-ping rounded-full bg-gold/80 dark:bg-indigo-300"
    aria-hidden="true"
  ></span>
  <span
    class="size-5 animate-ping rounded-full bg-gold/80 [animation-delay:0.2s] dark:bg-indigo-300"
    aria-hidden="true"
  ></span>
  <span
    class="size-5 animate-ping rounded-full bg-gold/80 [animation-delay:0.4s] dark:bg-indigo-300"
    aria-hidden="true"
  ></span>


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

  <p class="mt-4 text-pretty text-white/70">
    ${text}
  </p>
  </div>
    `
}

// --------------------------------------------showError(container, message)
export const showError = (container, message) => {
    container.innerHTML = `
    <div class=" flex flex-col bg-ink/70 px-10 items-center w-full py-20 text-center gap-10 rounded-xl col-span-full  ">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl font-extrabold text-red-500 font-display border-b-2 border-red-400">ERROR</h1>
        <p class="text-2xl font-medium text-white mt-10 border-2 rounded-md p-4 font-body ">${message}</p>
        <p class="text-sm text-white mt-12">Désolé pour le dérangement. Réessaye plus tard.</p>

        <button class="retry-btn rounded-xl mt-10 bg-attr-dark p-3 text-white hover:bg-none hover:bg-attr-dark/80 ">Réessayer</button>
       </div>
    </div>
    `
    
}

// ---------------------------------------------renderPagination(container , currentPage , totalPages)----------
export const renderPagination = (container , currentPage , totalPages) => {
    if(totalPages <= 1){
        container.innerHTML = ""
        return
    }

    // hnaya kanhssb mnin ghanvda flpagination w fin ghansali
    let start = Math.max(1 , currentPage -2)
    let end = start + 4

    if(end > totalPages){
        end = totalPages
        start = Math.max(1 , end - 4)
    }

    let html = `
        <nav class="col-span-full flex flex-wrap justify-center gap-2 mt-6" aria-label="Pagination">
    `;

    // button of previous -----------------------
    const prevDisabled = currentPage === 1 ;
    html += `
        <button
            data-page="${currentPage - 1}"
            class="px-3 py-1.5 rounded border text-sm transition
                   ${prevDisabled
                       ? "opacity-40 cursor-not-allowed bg-gray-800 border-gray-700 text-gray-500"
                       : "bg-gray-800 border-gray-600 hover:bg-gray-700 text-white"}"
            ${prevDisabled ? "disabled" : ""}
        >
            ← Précédent
        </button>
    `
    
    
    // numbers of pages 5   , -------------------
    for(let i = start ; i <= end ; i++ ){
        const isActive = i === currentPage
        html += `
            <button
                data-page="${i}"
                class="min-w-[2.5rem] px-3 py-1.5 rounded border text-sm transition
                       ${isActive? "bg-amber-500 border-amber-400 text-black font-bold cursor-default"
                           : "bg-gray-800 border-gray-600 hover:bg-gray-700 text-white"}"
                ${isActive ? "disabled" : ""}
            >
                ${i}
            </button>
        `
        
    }
    
    // next Button ---------------------------------------
    const nextDisabled = currentPage === totalPages
    html += `
        <button
            data-page="${currentPage + 1}"
            class="px-3 py-1.5 rounded border text-sm transition
                   ${nextDisabled
                       ? "opacity-40 cursor-not-allowed bg-gray-800 border-gray-700 text-gray-500"
                       : "bg-gray-800 border-gray-600 hover:bg-gray-700 text-white"}"
            ${nextDisabled ? "disabled" : ""}
        >
            Suivant →
        </button>
    `
    html += `</nav>`

    container.innerHTML = html
    

}
