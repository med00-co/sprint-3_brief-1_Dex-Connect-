// imports -----------------------------------------------
import { getCreature, getCreatureDetail } from "./services/api.js";
import { renderGrid, showLoading, showEmpty, showError , renderPagination , showDetail , clearDetail } from "./ui.js";
import { getFavorites, toggleFavorite, isFavorite, saveLastSearch, getLastSearch, clearLastSearch } from "./storage.js";
// ------------------------------------------------------


// Variables --------------------------------------------
let currentPage = 1;
let currentAttribute = "Tous"
let currentQuery = ""

let totalPages = 1

let isLoading = false
const MIN_LOADING_MS = 800

let isDetailLoading = false;
let currentDetailId = null

let viewMode = "list"
let pageCreatures = []
let currentDetail = null

// from DOM -----
const grid = document.getElementById('grid')
const paginationContainer = document.getElementById('pagination')

const detailPanel = document.getElementById('detail')

// ------------------------------------------------------
// -------------------------------sleep(ms) function ------------
const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
// -------------------------------------------------------------------

// -------------------------------favIds() : les id des favoris ------------
const favIds = () => new Set(getFavorites().map(c => c.id))
// -------------------------------------------------------------------

// -------------------------------------------------loadPage()


const loadPage = async (page = 1, attribute = currentAttribute, query = currentQuery) => {
    
    if(isLoading) return ; 

    isLoading = true
    viewMode = "list"
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
        pageCreatures = creatures
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
             renderGrid(creatures, favIds());
             renderPagination(paginationContainer, currentPage, totalPages);
        }
        grid.scrollTop = 0

    }catch (error){
         paginationContainer.innerHTML = ""

         
         showError(grid, error.message || "Une erreur est survenue")

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

    filtersPlace.querySelectorAll('button[data-attribute], #tous, #favoris').forEach(b =>{
        b.classList.remove(...activeButton)
        b.classList.add(...inactiveButton)
    })
    btn.classList.remove(...inactiveButton)
    btn.classList.add(...activeButton)
}

// ----------------------listener at filter ---------------------------
const filtersPlace = document.getElementById('filters')



filtersPlace.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-attribute], #tous, #favoris')

    if(!btn ) return ;
    setActiveFilterBtn(btn)

    if(btn.id === 'favoris'){
        showFavorites()
        return
    }

    let attribute = btn.id === 'tous' ? 'Tous' : btn.dataset.attribute ;

    if(attribute === currentAttribute && viewMode === "list") return

    loadPage(1, attribute)
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
    saveLastSearch(text)

    // si on etait dans Favoris, on remet le chip de l'attribut actif
    const chip = currentAttribute === 'Tous'
        ? document.getElementById('tous')
        : filtersPlace.querySelector(`[data-attribute="${currentAttribute}"]`)
    setActiveFilterBtn(chip)

    loadPage(1, currentAttribute, currentQuery)
})
document.getElementById('effacer-cherche').addEventListener('click', () => {
    searchInput.value = ""
    clearLastSearch()

    currentQuery = ""
    currentAttribute = ""

    const tousBtn = document.getElementById('tous')
    setActiveFilterBtn(tousBtn)

    loadPage(1, 'Tous', '')
})

// ----------------------------------------------------------openDetail(id)---
const openDetail = async (id) => {
    if (isDetailLoading) return ;

    isDetailLoading = true ; 
    currentDetailId = id 

    showLoading(detailPanel)

    try{
        const creature = await getCreatureDetail(id)
        currentDetail = creature
        showDetail(creature, isFavorite(id))

        if(window.innerWidth < 1024) {
            detailPanel.scrollIntoView({behavior: "smooth" , block: "start"})
        }
    }catch (error) {
        showError(detailPanel , error.message ||"Impossible de charger la carte")
    }finally {
        isDetailLoading = false
    }
}

// ----------------------------------------------------------findCreature(id)
const findCreature = (id) => {
    return pageCreatures.find(c => c.id === id)
        ?? getFavorites().find(c => c.id === id)
        ?? (currentDetail?.id === id ? currentDetail : null)
}

// ----------------------------------------------------------refreshStars()
const refreshStars = () => {
    const ids = favIds()
    grid.querySelectorAll('.fav-btn').forEach(btn => {
        const isOn = ids.has(Number(btn.dataset.id))
        btn.classList.toggle('text-gold', isOn)
        btn.classList.toggle('text-white/50', !isOn)
        btn.setAttribute('aria-pressed', isOn)
    })
}

// ----------------------------------------------------------showFavorites()
const showFavorites = () => {
    viewMode = "favorites"
    const favorites = getFavorites()
    paginationContainer.innerHTML = ""
    updateCreatureCount(favorites.length)

    if(favorites.length === 0){
        showEmpty(grid, "Aucun favori pour le moment. Clique sur ★ pour en ajouter.")
        return
    }
    renderGrid(favorites, favIds())
    grid.scrollTop = 0
}

// ----------------------------------------------------------handleFavorite(id)
const handleFavorite = (id) => {
    const creature = findCreature(id)
    if(!creature) return

    toggleFavorite(creature)

    if(viewMode === "favorites"){
        showFavorites()
    }else{
        refreshStars()
    }

    if(currentDetail && currentDetail.id === id){
        showDetail(currentDetail, isFavorite(id))
    }
}

// ----------------------------------listener  at grid (retry + favoris + detail) ---------
grid.addEventListener('click', (e) => {
    const retryBtn = e.target.closest(".retry-btn")
    if(retryBtn) {
        loadPage(currentPage, currentAttribute , currentQuery)
        return
    }

    const favBtn = e.target.closest('.fav-btn')
    if(favBtn){
        handleFavorite(Number(favBtn.dataset.id))
        return
    }

    const article = e.target.closest("article[data-id]")
    if(article) {
        const id = Number(article.dataset.id);
        if(id) openDetail(id)
    }
})
// ------------------------------listener at detailPanel ----------
detailPanel.addEventListener('click', (e) => {
    if(e.target.closest('#ferme')){
        currentDetail = null
        clearDetail()
        return
    }

    if(e.target.closest('.retry-btn')){
        if(currentDetailId){
            openDetail(currentDetailId)
        }
        return
    }

    const favBtn = e.target.closest('.fav-btn')
    if(favBtn){
        handleFavorite(Number(favBtn.dataset.id))
    }
})

// ----------------load the cards ------ final thing--
searchInput.value = getLastSearch()
loadPage(1, 'Tous', '')
// ----------------------------------------------------