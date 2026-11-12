// imports -----------------------------------------------
import { getCreature } from "./services/api.js";
import { renderGrid, showLoading, showEmpty, showError } from "./ui.js";
// ------------------------------------------------------


// Variables --------------------------------------------
const cartesChargees = []
let offset = 0
let isLoading = false
// ------------------------------------------------------


// -------------------------------------------------loadList(append)
const grid = document.getElementById('grid')
const loadList = async (append) => {
    if(isLoading) return ; 

    isLoading = true
    if(!append)showLoading(grid);
    
    try{
       const cards =  await getCreature(offset)
       cartesChargees.push(...cards)
       renderGrid(cards , append)
       offset += 20
       console.log(cartesChargees)
    }catch (error){
        showError(grid, error.message)
    }finally{
        isLoading = false
    }

}
loadList(false)
