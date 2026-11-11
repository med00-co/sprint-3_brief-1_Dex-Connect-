export  const BASE_URL = "https://db.ygoprodeck.com/api/v7";

// hadi bzch 
export const fetchJson = async (url) =>{
   const response = await fetch(url) ;

   if(!response.ok){
    throw new Error(`failed to connect ${response.status}`)
   }
   return await response.json()
}

// function bach n9ad lm3lomat li kayjiwni mn l API------------------toCreature()
export const toCreature = (raw)=>{
    return {
        id: raw.id ?? 0,
        name : raw.name ?? 'Unknown',
        type : raw.type ?? 'Unknown',
        description : raw.desc ?? "No description",
        atk : raw.atk ?? 0, 
        def : raw.def ?? 0, 
        level : raw.level ?? 0, 
        race : raw.race ?? "Unknown",
        attribute : raw.attribute ?? "Unknown",
        image : raw.card_images?.[0]?.image_url ?? "",
    }
}


// lmain function , hya li katjm3 bin lfunctions ------------ getCreature()
export const getCreature = async (offset = 0) => {
    const url = `${BASE_URL}/cardinfo.php?num=20&offset=${offset}`
    const data = await fetchJson(url)
    const cards = data.data ?? [];
    return cards.map(toCreature);
}