// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.

// --------- update the counter of number cards in the header
document.getElementById('creature-count').textContent = cards.length

const detail = document.getElementById("detail")

let team = []
const teamSlots = document.getElementById('team-slots')
const teamCount = document.querySelectorAll('#team-count')
rendreTeam();

const glowClasses = {
  Fire:   "shadow-attr-fire/60",
  Water:  "shadow-attr-water/60",
  Dark:   "shadow-attr-dark/60",
  Earth:  "shadow-attr-earth/60",
  Wind:   "shadow-attr-wind/60",
  Light:  "shadow-attr-light/60",
  Divine: "shadow-attr-divine/60"
}

const allGlow = Object.values(glowClasses)

function showDetail(card){
  const atkPercent = typeof card.atk === "number" ? Math.min(card.atk / 5000 * 100, 100) : 100
  const defPercent = typeof card.def === "number" ? Math.min(card.def / 5000 * 100, 100) : 100
  
  detail.classList.remove(...allGlow)
  detail.classList.add(glowClasses[card.attribute])

  
  detail.innerHTML= `
       <div class="flex items-center justify-between">
            <span class="font-mono text-sm text-muted">#${String(card.id).padStart(3 ,"0")} · Détail</span>
            <button type="button" id="ferme" aria-label="Fermer le détail" class="btn-outline w-11 px-0 hover:bg-invalid">✕</button>
          </div>
          <div class="relative flex h-70  items-center justify-center rounded-xl bg-brand-light">
            <!-- <svg aria-hidden="true" class="h-20 w-20 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16c0-5 3.5-9 8-9s8 4 8 9"></path><circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle><path d="M7 7 5 3M17 7l2-4"></path></svg> -->
            <img src="${card.image}" alt="${card.name}" class="h-full w-full " >
          </div>
          <div class="flex items-center justify-between">
            <h2 class="font-display text-3xl font-extrabold">${card.name}</h2>
            <span class="rounded-full ${card.attrClass} px-3 py-1 text-sm font-bold text-ink">${card.attribute}</span>
          </div>
          <p class="text-gray-700">${card.description}</p>
          <div class="flex flex-col gap-2 text-sm">


            <!-- <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Etoiles</span><span class="h-3 rounded-full bg-brand-light"><span class="block h-3 w-[30%] rounded-full bg-brand"></span></span><span class="text-right font-mono">45</span></div> -->
            <div class="flex flex-col gap-1 text-sm">
               <div class="flex items-center justify-between">
                  <span class="font-bold">Étoiles</span>
                  <span class="font-mono">${card.level} /12</span>
               </div>
               <div class="flex flex-wrap gap-0.5 text-xl leading-none" role="img" aria-label="${card.level} étoiles sur 12">
                <p class="text-lg text-gold">${"★".repeat(card.level)}</p>
              <!-- 2 empty stars -->
                 <span class="text-line/30">${"★".repeat( 12 - card.level)}</span>
              </div>
          </div>
            
            
            
         <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">ATK</span><span class="h-3 rounded-full bg-brand-light"><span class="block h-3 rounded-full bg-brand" style="width: ${atkPercent}%"></span></span><span class="text-right font-mono">${card.atk}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">DEF</span><span class="h-3 rounded-full bg-brand-light"><span class="block h-3 rounded-full bg-brand" style="width: ${defPercent}%"></span></span><span class="text-right font-mono">${card.def}</span></div>
          </div>
          <button type="button" class="add-to-team bg-gold-metal text-ink font-semibold focus:ring-1 focus:ring-gold-light btn-primary hover:border-2 hover:border-card-xyz hover:bg-none hover:bg-gold-dark disabled:bg-none disabled:hover:bg-none disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-disabled-border disabled:cursor-not-allowed disabled:hover:bg-disabled-bg">Ajouter à l'équipe</button> 
        
  `
  detail.dataset.id = card.id

  
  updateButtons();

}

// ---------------------------------------------------CARD FROM DATA.js---------------------------------------------

const grid = document.getElementById("grid")

const cardClass = "flex flex-col gap-3 rounded-card bg-white p-3 pb-4    h-full w-full    shadow-[0_0_20px_3px]    cursor-pointer transition-[transform,translate,scale,rotate,opacity,box-shadow] duration-300 group-hover:opacity-35 group-hover:scale-95 hover:opacity-100! hover:scale-100 hover:-translate-y-2.5 hover:shadow-[0_16px_36px_rgba(0,0,0,.4)] focus-visible:opacity-100! focus-visible:-translate-y-2.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-thv18-green motion-reduce:transition-none "

grid.innerHTML = ""

function createCard(card){
   const article = document.createElement("article")
    
    article.className = cardClass
    article.classList.add(glowClasses[card.attribute])
    article.setAttribute("data-attribute", `${card.attribute}`)
    article.dataset.id = card.id

    article.innerHTML = `
           <div class="relative flex h-70 items-center justify-center rounded-xl bg-brand-light ">
              <img src="${card.image}" alt="${card.name}" class="h-full w-full" >
             <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${String(card.id).padStart(3 ,"0")}</span>
           </div>
           <div class="flex items-center justify-between gap-2">
             <h3 class="font-display text-xl font-semibold">${card.name}</h3>
             <span class="rounded-full ${card.attrClass} px-3 py-1 text-sm font-bold text-ink" >${card.attribute}</span>
           </div>
           <p class="text-sm font-semibold">ATK ${card.atk} / DEF ${card.def}</p>
           <button class="btn-outline add-to-team mt-auto hover:bg-gold-metal hover:border-0 disabled:hover:bg-none disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-disabled-border disabled:cursor-not-allowed disabled:hover:bg-disabled-bg"> Ajouter à l'équipe </button>
           `;
          

     article.addEventListener('click' , function(event){
      if (event.target.closest('.add-to-team')) return;
      showDetail(card);
    })

    return article ;
}
cards.forEach(card =>{
  grid.appendChild(createCard(card))
})




// <!-- <svg aria-hidden="true" class="h-14 w-14 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16c0-5 3.5-9 8-9s8 4 8 9"></path><circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle><path d="M7 7 5 3M17 7l2-4"></path></svg> -->

//   article.innerHTML = `
//     <div class="relative flex h-70 items-center justify-center rounded-xl bg-brand-light">
//       <img src="${card.image}" alt="${card.name}" class="h-full w-full">
//       <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${String(card.id).padStart(3, "0")}</span>
//     </div>
//     <div class="flex items-center justify-between gap-2">
//       <h3 class="font-display text-xl font-semibold">${card.name}</h3>
//       <span class="rounded-full ${card.attrClass} px-3 py-1 text-sm font-bold text-ink">${card.attribute}</span>
//     </div>
//     <p class="text-sm text-muted">${"★".repeat(card.level)} · ${card.type}</p>
//     <p class="text-sm font-semibold">ATK ${card.atk} / DEF ${card.def}</p>
//     <p class="text-sm text-muted">${card.description}</p>
//     <button type="button" class="btn-outline mt-auto hover:bg-gold-metal hover:border-0">Ajouter à l'équipe</button>
//   `;

// <!-- Carte écrite à la main : à remplacer par des cartes générées en JS (Partie 2) -->
//         <article class="flex flex-col gap-3 rounded-card bg-white p-3 pb-4    h-full w-full        cursor-pointer transition-[transform,translate,scale,rotate,opacity,box-shadow] duration-300 group-hover:opacity-35 group-hover:scale-95 hover:opacity-100! hover:scale-100 hover:-translate-y-2.5 hover:shadow-[0_16px_36px_rgba(0,0,0,.4)] focus-visible:opacity-100! focus-visible:-translate-y-2.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-thv18-green motion-reduce:transition-none  ">
//           <div class="relative flex h-70 items-center justify-center rounded-xl bg-brand-light ">
//             <!-- <svg aria-hidden="true" class="h-14 w-14 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16c0-5 3.5-9 8-9s8 4 8 9"></path><circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle><path d="M7 7 5 3M17 7l2-4"></path></svg> -->
//              <img src="https://images.ygoprodeck.com/images/cards/73580471.jpg" alt="Black rose dragon" class="h-full w-full " >
//             <span class="absolute left-3 top-2 font-mono text-sm text-muted">#001</span>
//           </div>
//           <div class="flex items-center justify-between gap-2">
//             <h3 class="font-display text-xl font-semibold">Black Rose Dragon</h3>
//             <span class="rounded-full bg-attr-fire px-3 py-1 text-sm font-bold text-ink">Fire</span>
//           </div>
//           <p class="text-sm text-muted">Base · Total 309</p>
//           <button type="button" class="btn-outline mt-auto hover:bg-gold-metal hover:border-0">Ajouter à l'équipe</button>
//         </article>



// ----------------------------------RECHERCHE ET FILTRE ---------------------------------------------------------------------
// ----------------------RECHERCHE ----------------------------
const search = document.getElementById("search")
const articles = document.querySelectorAll("#grid article")
const buttonFilters = document.querySelectorAll("#filters button")

let activeAttribute = ""

const activeButton = ["bg-ink", "border-ink" , "text-white" , "hover:bg-brand"]
const inactiveButton = ["hover:bg-brand-light"]


function updatesCard(){

  const text = search.value.trim().toLowerCase()
// ------ this line i added it to load the cards with every update-
  const articles = document.querySelectorAll("#grid article")

  articles.forEach(article =>{

   const name = article.querySelector('h3').textContent.toLowerCase()
   const cardAttribute = article.dataset.attribute
   

   const matchName = name.includes(text)
   const matchAttribute = activeAttribute === "" || cardAttribute === activeAttribute

   article.style.display = matchName && matchAttribute ? "" : "none";

   })
}

search.addEventListener("input", updatesCard)
  

// -------------------------------FILTERS-------------------------------

buttonFilters.forEach(button =>{
  
  
  button.addEventListener('click', function(){
     activeAttribute = button.dataset.attribute || "";
     

    buttonFilters.forEach(b =>{
      b.classList.remove(...activeButton)
      b.classList.add(...inactiveButton)
    })

    button.classList.remove(...inactiveButton)
    button.classList.add(...activeButton)

     updatesCard();
  })
})




// -----------------------AJOUTER à L'EQUIPE----------------------------------------------------------------------------------------------------


// ---------------------::FUNCTION rendreTeam():-----------------------
function rendreTeam(){
  // ------------delete what inside box------
  teamSlots.innerHTML =  ""

  // --------------- place of card added to equipe-------
  team.forEach(t =>{
    const div = document.createElement('div')
    div.classList.add('relative' ,'border',     'flex' ,'hover:border-2', 'hover:border-gold')
    div.dataset.id = t.id

    div.innerHTML = `
    <img src="${t.image}" alt="${t.name}" class="w-full ">
    <button type="button"
              class="remove-from-team absolute top-1 right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded hover:bg-none hover:bg-red-800">
        ✕
      </button>
    `
    
    teamSlots.appendChild(div)
  })

  // --------------------Empty places-----------
  for(let i=team.length; i< 6  ; i++){
    const empty = document.createElement('div')
    empty.innerHTML= `
    <a  href="#grid" class="border px-8 py-6 rounded-card bg-brand-cardVide   flex justify-center items-center hover:border-2 hover:border-gold ">
                     <p class="text-gold-dark text-3xl font-extralight ">+</p>
    </a>
    `
    teamSlots.appendChild(empty)
  }

  // -------------------- update the Counter ---------
  teamCount.forEach(t =>{
  t.textContent = team.length
})


}
// ---------------------------------------------------------
function showTeamMessage(text) {
  const msg = document.getElementById("team-message")
  if (msg) {
    msg.textContent = text
    setTimeout(() => {
      msg.textContent = ""
    }, 3000)
  }
}

//  ---------------------Function updateButtons()---------------------------------------
function updateButtons(){
  const buttons = document.querySelectorAll('.add-to-team')
  buttons.forEach(bn =>{
    let cardId = null

    const article = bn.closest('article')
    if(article){
      cardId = Number(article.dataset.id)
    }else if(detail.dataset.id){
      cardId = Number(detail.dataset.id)
    }
    
    let alreadyExist = cardId !== null && team.some(c => c.id === cardId)
    let isFull = team.length >= 6
  
    if(isFull){
     bn.disabled = true
     bn.textContent =  "Team is full"

    }else if(alreadyExist){
      bn.disabled = true
      bn.textContent =  "Already in Team"

    }else{
      bn.disabled = false
      bn.textContent =  "Ajouter à l'équipe"
    }

    
  })
}

function addToTeam(card) {

  if (team.length >= 6) {
    showTeamMessage("Team is full (6/6)")
    return
  }

 
  if (team.some(c => c.id === card.id)) {
    showTeamMessage("Card already exist !!")
    return
  }

 
  team.push(card)
  rendreTeam()
  updateButtons()
}


grid.addEventListener('click', function(event){
  

   const btn = event.target.closest('.add-to-team')
   if (!btn) return ; 

   const article = btn.closest('article')
   const id = article.dataset.id
   const foundCard = cards.find(c => c.id === Number(id))
   
   if(foundCard){
    addToTeam(foundCard)
   }
   
   
})


// ------------------- Run the add button in detail ------
detail.addEventListener('click', function(event){
   
   if (event.target.closest('#ferme')) {
    detail.innerHTML = `<h2 class="font-display text-3xl font-extrabold text-center">choose a card</h2>`
    detail.classList.remove(...allGlow)   
    return
  }

   const btn = event.target.closest('.add-to-team')
   if (!btn) return ;

   const id = Number(detail.dataset.id)
   const found = cards.find(c => c.id === Number(id))
   
   if(found){
    addToTeam(found)
   }
   
})
// ---------------------------------------------------------------------------
// ------------------------------Remove from team function -----------
function removeFromTeam(id){
  team = team.filter(card => card.id !== id)

  rendreTeam()
  updateButtons()
}

// ---------Add listener to slots and remove the card its button clicked -----------
teamSlots.addEventListener('click' , function(event){
  const btn = event.target.closest('.remove-from-team')
  if(!btn) return ;

  const cardDiv = btn.closest('[data-id]')
  const id = Number(cardDiv.dataset.id)

  removeFromTeam(id)
})


// -----------------------------------------CREATE CARDS -------------------------------------------
const attrClasses = {
  Fire: "bg-attr-fire",
  Water: "bg-attr-water", 
  Dark: "bg-attr-dark",
  Earth: "bg-attr-earth",
  Wind: "bg-attr-wind", 
  Light: "bg-attr-light", 
  Divine: "bg-attr-divine"
}



const nameRegex = /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/
const statRegex = /^\d{1,4}$/
const imageRegex = /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i
const descRegex = /^[\s\S]{10,200}$/
const idRegex = /^#\d{3}$/


function showError(fieldName , message){
  const input = formNewCard.elements[fieldName]
  const span = input.closest("label").querySelector('.error-message')
  
  span.textContent= message
}

const formNewCard = document.getElementById('creature-form')
formNewCard.addEventListener('submit', function(event){
  event.preventDefault()
  document.querySelectorAll('.error-message').forEach(s =>s.textContent = "")

  const data  = new FormData(formNewCard)
  const carte = Object.fromEntries(data)
  
  let isValid = true

  // --- id check
  let idText = data.get('id').trim()
  if(!idRegex.test(idText)){
    showError('id', "il faut: # suivi de 3 chiffres, pas déjà utilisé ")
    isValid = false
  }else if (cards.some(c => c.id == idText.replace("#", ""))) {
  showError('id', "Ce numéro est déjà utilisé")
  isValid = false
  }
  // ---name check
  if(!nameRegex.test(data.get('name').trim())){
    showError('name', "2 à 30 caractères, commence par une lettre ou un chiffre ; lettres, chiffres, espaces, ., ' et - autorisés")
    isValid = false
  }
  // ---attribute check
  if (data.get("attribute") === "") {
  showError("attribute", "Choisissez un attribute !!")
  isValid = false
  }
  // ---level check
  if (data.get("level") === "") {
  showError("level", "Choisissez le nombre des étoiles")
  isValid = false
  }
  // ---atk check
  if(!statRegex.test(data.get('atk').trim())){
    showError('atk', "Nombre entier de 0 à 9999")
    isValid = false
  }
  // ---def check
  if(!statRegex.test(data.get('def').trim())){
    showError('def', "Nombre entier de 0 à 9999")
    isValid = false
  }
  // ---image check
  if(!imageRegex.test(data.get('image').trim())){
    showError('image', "Il faut que le lien https se termine par .png, .jpg, .jpeg, .webp ou .gif")
    isValid = false
  }
  // ---description check
  if(!descRegex.test(data.get('description').trim())){
    showError('description', "10 à 200 caractères")
    isValid = false
  }
  if(!isValid) return ;

  const newCard = {
  id: Number(data.get('id').trim().replace("#", "")),
  name: data.get('name').trim(),
  image: data.get('image').trim(),
  attribute: data.get('attribute'),
  attrClass: attrClasses[data.get('attribute')],
  level: Number(data.get('level')),
  atk: Number(data.get('atk').trim()),
  def: Number(data.get('def').trim()),
  description: data.get('description').trim()
 }

 cards.push(newCard)
 grid.appendChild(createCard(newCard))
 document.getElementById('creature-count').textContent = cards.length
 formNewCard.reset()
 updatesCard()
 updateButtons()
 showFormMessage("Créature ajoutée avec succès !")
})

formNewCard.addEventListener('reset', () => {
  document.querySelectorAll('.error-message').forEach(s => s.textContent = "")
})


// -----------------------------Function show message add successfuly ---------------
function showFormMessage(text) {
  const msg = document.getElementById("form-message")
  if (msg) {
    msg.textContent = text
    setTimeout(() => {
      msg.textContent = ""
    }, 3000) 
  }
}


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------




  



// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------

