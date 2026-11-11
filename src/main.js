import { fetchJson , BASE_URL , getCreature} from "./services/api.js";

async function loadCards(){
 try {
    const datas = await  getCreature(20)
    console.log(datas)
 }
 catch(Error){
    console.log(Error)
 }
}
loadCards()