export  const BASE_URL = "https://db.ygoprodeck.com/api/v7";

// function for capitalize First letter in words
function capitalizeFirstLetter(word) {
if (!word) return '';
return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


// ----hadi hiya li katjib lm3lomat mn API------------------------------------fetchJson
export const fetchJson = async (url) =>{
   const response = await fetch(url) ;

   if(!response.ok){
    throw new Error(`Erreur ${response.status}`)
   }
   return await response.json()
}

// function bach n9ad lm3lomat li kayjiwni mn l API------------------toCreature()
 
export const toCreature = (raw)=>{
    const attr = !raw.attribute  ? 'Spell/Trap' : capitalizeFirstLetter(raw.attribute)
    return {
        id: raw.id ?? 0,
        name : raw.name ?? 'Unknown',
        type : raw.type ?? 'Unknown',
        description : raw.desc ?? "No description",
        atk : raw.atk ?? 0, 
        def : raw.def ?? 0, 
        level : raw.level ?? 0, 
        race : raw.race ?? "Unknown",
        attribute :  attr ,
        image : raw.card_images?.[0]?.image_url ?? "",
    }
}


// lmain function , hya li katjm3 bin lfunctions -------------------- getCreature()
export const getCreature = async (page , attribute) =>{
    attribute = attribute.toLowerCase()
    const offset = (page - 1 ) * 20
    
    const url = new URL(`${BASE_URL}/cardinfo.php?`);
    const params = url.searchParams;

    if(attribute && attribute !== "tous"){
        params.append('attribute', attribute)
    }
    params.append('num', 20)
    
    params.append('offset', offset)
    
    let urlString = url.toString()
    console.log(urlString)

    const data = await fetchJson(urlString)
    const cards = data.data ?? [];
    const totalPages = data.meta?.total_pages ?? 1 ;

    return {
        creatures: cards.map(toCreature),
        totalPages,
    } 
}