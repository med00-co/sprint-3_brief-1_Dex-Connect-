// imports -----------------------------------------------
import { getCreature } from "./services/api.js";
import { renderGrid, showLoading, showEmpty, showError , renderPagination} from "./ui.js";
// ------------------------------------------------------


// Variables --------------------------------------------
let currentPage = 1;
let currentAttribute = "Tous"

let totalPages = 1

let isLoading = false
const MIN_LOADING_MS = 800

// from DOM -----
const grid = document.getElementById('grid')
const paginationContainer = document.getElementById('pagination')


// ------------------------------------------------------
// -------------------------------sleep(ms) function ------------
const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
// -------------------------------------------------------------------

// -------------------------------------------------loadPage()


const loadPage = async (page = 1, attribute = currentAttribute) => {
    
    if(isLoading) return ; 

    isLoading = true
    currentPage = page;
    currentAttribute = attribute

    document.querySelectorAll('#filters button').forEach(bn => bn.disabled = true)
    document.getElementById('recherche').disabled = true
    document.querySelectorAll('#pagination button').forEach(b => b.disabled = true)
 
    showLoading(grid)
    
    
    const start = Date.now()
    
    try{
        const { creatures, totalPages: pages , totalRows} = await getCreature(page, attribute)
        totalPages = pages
         

        updateCreatureCount(totalRows);

        const elapsed = Date.now() - start ;
        if(elapsed < MIN_LOADING_MS){
            await sleep(MIN_LOADING_MS - elapsed)
        }

        if (creatures.length === 0) {
             showEmpty(grid , 'Aucune créature trouvé');
             renderPagination(paginationContainer, currentPage, totalPages); 
        } else {
             renderGrid(creatures, false);
             renderPagination(paginationContainer, currentPage, totalPages);
        }


       
    }catch (error){
         paginationContainer.innerHTML = ""

         const message = error instanceof TypeError ? "Pas de connection Internet" : "Erreur serveur (status)"
         showError(grid, message)

    }finally{
        isLoading = false

        document.querySelectorAll('#filters button').forEach(bn => bn.disabled = false)
        document.getElementById('recherche').disabled = false
        

    }

}
loadPage(1, 'Tous')

// --------------listener at pagination ------------------------------
paginationContainer.addEventListener('click', (event)=>{
    const btn = event.target.closest('button[data-page]');
    if(!btn || btn.disabled) return ;

    const page = Number(btn.dataset.page)
    loadPage(page , currentAttribute)
})



// ----------------------listener at filter ---------------------------
const filtersPlace = document.getElementById('filters')

const activeButton = ["bg-ink", "border-ink" , "text-white" , "hover:bg-brand"]
const inactiveButton = ["hover:bg-brand-light"]

filtersPlace.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-attribute], #tous')

    if(!btn ) return ;

    let attribute = btn.id === 'tous' ? 'Tous' : btn.dataset.attribute ;

    if(attribute === currentAttribute) return

    filtersPlace.querySelectorAll('button[data-attribute], #tous').forEach(b =>{
        b.classList.remove(...activeButton)
        b.classList.add(...inactiveButton)
    })
    btn.classList.remove(...inactiveButton)
    btn.classList.add(...activeButton)

    loadPage(1, attribute)
})



// ----------------------listener at RETRY btn -----------------


grid.addEventListener('click', (e)=>{
    
const retryBtn = e.target.closest('.retry-btn') 
if(!retryBtn) return ;
    loadPage(currentPage, currentAttribute)
})

// --------------------------creature count / header-----------
export const updateCreatureCount =  (totalRows) => {

    const creatureCount = document.getElementById('creature-count')
    if(!creatureCount) return ;
    const count = totalRows ?? 0

    creatureCount.textContent = count.toLocaleString('fr-FR')
}
