// imports -----------------------------------------------
import { getCreature } from "./services/api.js";
import { renderGrid, showLoading, showEmpty, showError , renderPagination} from "./ui.js";
// ------------------------------------------------------


// Variables --------------------------------------------
let currentPage = 1;
let currentAttribute = "Tous"
let currentQuery = ""

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


const loadPage = async (page = 1, attribute = currentAttribute, query = currentQuery) => {
    
    if(isLoading) return ; 

    isLoading = true
    currentPage = page;
    currentAttribute = attribute
    currentQuery = query

    document.querySelectorAll('#filters button').forEach(bn => bn.disabled = true)
    document.getElementById('recherche').disabled = true
    document.querySelectorAll('#pagination button').forEach(b => b.disabled = true)
    document.getElementById('search').disabled = true
    document.getElementById('effacer-cherche').disabled = true

    showLoading(grid)
    const start = Date.now()
    
    try{
        const { creatures, totalPages: pages , totalRows} = await getCreature(page, attribute, query)

        totalPages = pages
        updateCreatureCount(totalRows);

        const elapsed = Date.now() - start ;
        if(elapsed < MIN_LOADING_MS){
            await sleep(MIN_LOADING_MS - elapsed)
        }

        if (creatures.length === 0) {
             const emptyMsg = currentQuery ? `Aucune créature trouvée pour << ${currentQuery} >>` : 'Aucune créature trouvée'

             showEmpty(grid , emptyMsg);
             renderPagination(paginationContainer, currentPage, totalPages); 
        } else {
             renderGrid(creatures, false);
             renderPagination(paginationContainer, currentPage, totalPages);
        }
        grid.scrollTop = 0

    }catch (error){
         paginationContainer.innerHTML = ""

         
         showError(grid, error.message || "Une erreur est servenue")

    }finally{
        isLoading = false

        document.querySelectorAll('#filters button').forEach(bn => bn.disabled = false)
        document.getElementById('recherche').disabled = false
        document.getElementById('search').disabled = false
        document.getElementById('effacer-cherche').disabled = false
    }

}


// --------------listener at pagination ------------------------------
paginationContainer.addEventListener('click', (event)=>{
    const btn = event.target.closest('button[data-page]');
    if(!btn || btn.disabled) return ;

    const page = Number(btn.dataset.page)
    loadPage(page , currentAttribute)
})


// -------------- small function for set the class for active filter button ------
const setActiveFilterBtn = (btn) => {
    const filtersPlace = document.getElementById('filters')

    const activeButton = ["bg-ink", "border-ink" , "text-white" , "hover:bg-brand"]
    const inactiveButton = ["hover:bg-brand-light"]

    filtersPlace.querySelectorAll('button[data-attribute], #tous').forEach(b =>{
        b.classList.remove(...activeButton)
        b.classList.add(...inactiveButton)
    })
    btn.classList.remove(...inactiveButton)
    btn.classList.add(...activeButton)
}

// ----------------------listener at filter ---------------------------
const filtersPlace = document.getElementById('filters')



filtersPlace.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-attribute], #tous')

    if(!btn ) return ;
    setActiveFilterBtn(btn)
    let attribute = btn.id === 'tous' ? 'Tous' : btn.dataset.attribute ;

    if(attribute === currentAttribute) return

    

    loadPage(1, attribute)
})



// ----------------------listener at RETRY btn -----------------


grid.addEventListener('click', (e)=>{
    
const retryBtn = e.target.closest('.retry-btn') 
if(!retryBtn) return ;
    loadPage(currentPage, currentAttribute)
})

// --------------------------creature count / header-----------
const updateCreatureCount =  (totalRows) => {

    const creatureCount = document.getElementById('creature-count')
    if(!creatureCount) return ;
    const count = totalRows ?? 0

    creatureCount.textContent = count.toLocaleString('fr-FR')
}

// ----------------------------search button submit -------------
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search')

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const text = searchInput.value.trim()
    if(!text) return ;

    currentQuery = text
    loadPage(1, currentAttribute, currentQuery)
})
document.getElementById('effacer-cherche').addEventListener('click', () => {
    searchInput.value = ""

    currentQuery = ""
    currentAttribute = ""

    
    
    const tousBtn = document.getElementById('tous')
    setActiveFilterBtn(tousBtn)

    loadPage(1, 'Tous', '')
})


// ----------------load the cards ------ final thing--
loadPage(1, 'Tous', '')
// ----------------------------------------------------