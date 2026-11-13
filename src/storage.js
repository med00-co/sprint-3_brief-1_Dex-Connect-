const FAVORITES_KEY = "dex_favorites"
const LAST_SEARCH_KEY = "dex_last_search"

export const getFavorites = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const saveFavorites = (list) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list))
  } catch {
    // stockage indisponible : on ignore
  }
}

export const isFavorite = (id) => getFavorites().some(c => c.id === id)

export const toggleFavorite = (creature) => {
  const favorites = getFavorites()
  const exists = favorites.some(c => c.id === creature.id)
  const updated = exists
    ? favorites.filter(c => c.id !== creature.id)
    : [...favorites, creature]
  saveFavorites(updated)
  return !exists
}

export const saveLastSearch = (text) => sessionStorage.setItem(LAST_SEARCH_KEY, text)
export const getLastSearch = () => sessionStorage.getItem(LAST_SEARCH_KEY) ?? ""
export const clearLastSearch = () => sessionStorage.removeItem(LAST_SEARCH_KEY)