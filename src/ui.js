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

function createCard(card, isFav = false){
   const article = document.createElement("article")
    
   const attrNameForEffect = card.attribute != "Spell/Trap" ? card.attribute : "Spell_Trap"
    article.className = cardClass
    article.classList.add(glowClasses[attrNameForEffect])
    article.setAttribute("data-attribute", `${card.attribute}`)
    article.dataset.id = card.id
    const attributeClass = attrClasses[attrNameForEffect]

    article.innerHTML = `
           <div class="relative flex h-70 items-center justify-center rounded-xl bg-brand-light ">
              <img src="${card.image}" alt="carte Yu-gi-Oh!" loading="lazy" class="h-full w-full" >
             <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${String(card.id).padStart(3 ,"0")}</span>
           </div>
           <div class="flex items-center justify-between gap-2 ml-2">
             <h3 class="font-display text-xl text-white font-semibold">${card.name}</h3>
             <span class="rounded-full ${attributeClass} px-3 py-1 text-sm font-bold text-white" >${card.attribute}</span>
           </div>
           <div class="flex items-center justify-between ml-2 mb-1">
             <p class="text-sm font-semibold text-white">ATK ${card.atk} / DEF ${card.def}</p>
             <button type="button" data-id="${card.id}" aria-pressed="${isFav}" aria-label="Favori"
               class="fav-btn text-3xl leading-none hover:text-gold ${isFav ? 'text-gold' : 'text-white/50'}">★</button>
           </div>
           `;
          

     

    return article ;
}

// ----------------------------------------------renderGrid()
export const renderGrid = (list, favIds = new Set()) => {
    const grid = document.getElementById("grid")
    grid.innerHTML = ""
    list.forEach((creature) => {
        grid.appendChild(createCard(creature, favIds.has(creature.id)))
    })
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

  <h2 class="mt-6 text-2xl font-bold text-gold">Aucune carte trouvée</h2>

  <p class="mt-4 text-pretty text-white/70">
    ${text}
  </p>
  </div>
    `
}

// --------------------------------------------showError(container, message)
export const showError = (container, message) => {
    container.innerHTML = `
    <div role="alert" class=" flex flex-col bg-ink/70 px-10 items-center w-full py-20 text-center gap-10 rounded-xl col-span-full  ">
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
            class="px-3 py-1.5 rounded border text-sm transition focus-visible:outline-2 focus-visible:outline-gold
                   ${prevDisabled
                       ? "opacity-40 cursor-not-allowed bg-ink/40 border-ink/30 text-white/40"
                       : "bg-ink border-ink hover:bg-gold/80 hover:border-gold text-white"}"
            ${prevDisabled ? "disabled" : ""}
        >
            ← Précédent
        </button>
    `
    
    
    // numbers of pages 5   , -------------------
    for (let i = start; i <= end; i++) {
        const isActive = i === currentPage;
        html += `
            <button
                data-page="${i}"
                class="min-w-[2.5rem] px-3 py-1.5 rounded border text-sm transition focus-visible:outline-2 focus-visible:outline-gold
                       ${isActive
                           ? "bg-gold border-gold text-ink font-bold cursor-default"
                           : "bg-ink border-ink text-white hover:bg-gold hover:text-ink hover:border-gold"}"
                ${isActive ? "disabled" : ""}
            >
                ${i}
            </button>
        `;
    }
    
    // next Button ---------------------------------------
    const nextDisabled = currentPage === totalPages;
    html += `
        <button
            data-page="${currentPage + 1}"
            class="px-3 py-1.5 rounded border text-sm transition focus-visible:outline-2 focus-visible:outline-gold
                   ${nextDisabled
                       ? "opacity-40 cursor-not-allowed bg-ink/40 border-ink/30 text-white/40"
                       : "bg-ink border-ink text-white hover:bg-gold hover:text-ink hover:border-gold"}"
            ${nextDisabled ? "disabled" : ""}
        >
            Suivant →
        </button>
    `

    html += `</nav>`

    container.innerHTML = html
    

}

// -------------------------------------------------------------------------showDetail(creature)
export const showDetail = (creature, isFav = false) => {
    const detail = document.getElementById("detail");
    if (!detail) return;

    const atkPercent = typeof creature.atk === "number"
        ? Math.min((creature.atk / 5000) * 100, 100)
        : 0;
    const defPercent = typeof creature.def === "number"
        ? Math.min((creature.def / 5000) * 100, 100)
        : 0;

    const level = Math.max(0, Math.min(creature.level ?? 0, 12));
    const starsHTML = level > 0 ? `
        <div class="flex flex-col gap-1 text-sm">
            <div class="flex items-center justify-between">
                <span class="font-bold">Étoiles</span>
                <span class="font-mono">${level} / 12</span>
            </div>
            <div class="flex flex-wrap gap-0.5 text-xl leading-none" role="img" aria-label="${level} étoiles sur 12">
                <span class="text-gold">${"★".repeat(level)}</span>
                <span class="text-line/30">${"★".repeat(12 - level)}</span>
            </div>
        </div>
    ` : "";

    const attrKey = creature.attribute === "Spell/Trap" ? "Spell_Trap" : creature.attribute;
    const glow = glowClasses[attrKey] || "";

    detail.classList.remove(...Object.values(glowClasses));
    if (glow) detail.classList.add(glow);

    detail.innerHTML = `
        <!-- Header --------------------->
        <div class="flex items-center justify-between">
            <span class="font-mono text-sm text-muted">#${String(creature.id).padStart(3, "0")} · Détail</span>
            <button type="button" id="ferme" aria-label="Fermer le détail"
                    class="btn-outline w-11 px-0 hover:bg-invalid">✕</button>
        </div>

        <!-- Image ------------------------->
        <div class="relative flex h-70 items-center justify-center rounded-xl bg-brand-light">
            <img src="${creature.image}" alt="${creature.name}" loading="lazy" class="h-full w-full object-contain">
        </div>

        <!-- Nom + Badge --------------------->
        <div class="flex items-center justify-between gap-2">
            <h2 class="font-display text-3xl font-extrabold">${creature.name}</h2>
            <span class="rounded-full ${attrClasses[attrKey] || "bg-gray-500"} px-3 py-1 text-sm font-bold text-white">
                ${creature.attribute}
            </span>
        </div>

        <!-- Description -------------------->
        <p class="text-gray-700 text-sm leading-relaxed  whitespace-pre-line">${creature.description}</p>

        <!-- Stats ----------->
        <div class="flex flex-col gap-3 text-sm">
            ${starsHTML}

            <!-- ATK ------------------>
            <div class="grid grid-cols-[60px_1fr_50px] items-center gap-2">
                <span class="font-bold">ATK</span>
                <span class="h-3 rounded-full bg-brand-light overflow-hidden">
                    <span class="block h-3 rounded-full bg-brand" style="width: ${atkPercent}%"></span>
                </span>
                <span class="text-right font-mono">${creature.atk ?? "—"}</span>
            </div>

            <!-- DEF ------------>
            <div class="grid grid-cols-[60px_1fr_50px] items-center gap-2">
                <span class="font-bold">DEF</span>
                <span class="h-3 rounded-full bg-brand-light overflow-hidden">
                    <span class="block h-3 rounded-full bg-brand" style="width: ${defPercent}%"></span>
                </span>
                <span class="text-right font-mono">${creature.def ?? "—"}</span>
            </div>
        </div>

        
        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-gray-200 pt-4 mt-2">
            <div>
                <span class="text-muted">Race</span>
                <p class="font-semibold">${creature.race ?? "—"}</p>
            </div>
            <div>
                <span class="text-muted">Type</span>
                <p class="font-semibold">${creature.type ?? "—"}</p>
            </div>
            <div>
                <span class="text-muted">Archetype</span>
                <p class="font-semibold">${creature.archetype ?? "—"}</p>
            </div>
            <div>
                <span class="text-muted">Éditions</span>
                <p class="font-semibold">${creature.setsCount ? creature.setsCount + " set(s)" : "—"}</p>
            </div>
        </div>

        <button type="button" data-id="${creature.id}"
                class="fav-btn mt-4 rounded-xl bg-gold-metal px-4 py-2 font-semibold text-ink hover:opacity-90">
            ${isFav ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
        </button>
    `;

    detail.dataset.id = creature.id;
};

// --------------------------------------------------------------clearDetail()
export const clearDetail = () => {
    const detail = document.getElementById('detail')
    if(!detail) return
    

    detail.classList.remove(...Object.values(glowClasses))

    detail.innerHTML = `
        <h2 class="font-display text-3xl font-extrabold text-center text-gray-400">
            choose a card
        </h2>
    `

    delete detail.dataset.id;
}
