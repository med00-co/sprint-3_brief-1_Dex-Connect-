import { fetchJson , BASE_URL , getCreature} from "./services/api.js";
import { renderGrid } from "./ui.js";

async function loadCards(){
 try {
    const cards = await  getCreature(40)
    renderGrid(cards)
 }
 catch(Error){
    console.log(Error)
 }
}
loadCards()