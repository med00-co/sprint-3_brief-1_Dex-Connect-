export  const BASE_URL = "https://db.ygoprodeck.com/api/v7";
export const PAGE_SIZE = 20

// function for capitalize First letter in words
function capitalizeFirstLetter(word) {
if (!word) return '';
return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


// ----hadi hiya li katjib lm3lomat mn API------------------------------------fetchJson
export const fetchJson = async (url) =>{
   let response 

   try{
     response = await fetch(url) ;
   }catch(networkError){
    const error = new Error('Pas de connexion Internet')
     error.status = 0 
     throw error
   }
    
   
   if(!response.ok){
    const error =  new Error(`Erreur serveur ${response.status}`)
    error.status = response.status
    throw error
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
export const getCreature = async (page , attribute = "", query ="") =>{
    attribute = attribute.toLowerCase()
    const offset = (page - 1 ) * PAGE_SIZE
    
    const url = new URL(`${BASE_URL}/cardinfo.php?`);
    const params = url.searchParams;
    
    if(attribute && attribute !== "tous"){
        params.append('attribute', attribute)
    }
    

    const cleanQuery = query.trim();
    if(cleanQuery) {
        params.append('fname', cleanQuery)
    }
    
    params.append('num', PAGE_SIZE)
    params.append('offset', offset)
    
    const urlString = url.toString()
    
    try {
       const data = await fetchJson(urlString)
       const cards = data.data ?? [];
       const totalPages = data.meta?.total_pages ?? 1 ;

       const totalRows = data.meta?.total_rows ?? 0; 
       return {
           creatures: cards.map(toCreature),
           totalPages,
           totalRows,
       }
    }catch (error){
        if (cleanQuery && (error.status === 400 || error.status === 404)){
            return {
                creatures: [],
                totalPages: 0 , 
                totalRows: 0 ,
            }
        }
        throw error
    }
}

// ---------------------------------------------------------------toCreatureDetail(raw)
export const toCreatureDetail = (raw) =>{
    const base = toCreature(raw)

    return {
        ...base ,
        archetype : raw.archetype ?? "-",
        setCounts : raw.card_sets?.length ?? 0, 

        sets: raw.card_sets 
            ?.map(set => set.set_name)
            ?.slice(0,3)
            ?.join(", ") || "-" , 

        

        
    }
}

// ---------------------------------------------------------getCreatureDetail(id)
export const getCreatureDetail = async (id) => {
    const url = new URL(`${BASE_URL}/cardinfo.php`);
    const params = url.searchParams ;

    params.append('id', id)

    const data = await fetchJson(url.toString()) 

    const raw = data.data?.[0]

    if(!raw) {
        throw new Error('Carte introuvable')
    }

    return toCreatureDetail(raw); 
}