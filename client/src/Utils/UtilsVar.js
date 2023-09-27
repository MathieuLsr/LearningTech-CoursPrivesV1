export function loadVariables(){
    loadListTypeCours()
    loadListTypeUser()
    loadListNiveauScolaire()
}

export const ListTypeCours = []
export const ListTypeUser = []
export const ListNiveauScolaire = []

function loadListTypeCours() {

    fetch('http://192.168.1.208:3001/api/config/listTypeCours')
        .then( async resp =>  {
            
            if(resp.status === 400) return ;
            
            const data = await resp.json()
            
            ListTypeCours.splice(0, ListTypeCours.length)

            data.forEach(element => {
                ListTypeCours.push(element)
            });
            
        }).catch(err => {
                console.error(err);
        }) 

}

function loadListTypeUser() {

    fetch('http://192.168.1.208:3001/api/config/listTypeUser')
        .then( async resp =>  {
            
            if(resp.status === 400) return ;
            
            const data = await resp.json()
            
            data.forEach(element => {
                ListTypeUser.push(element)
            });
            
        }).catch(err => {
                console.error(err);
        }) 

}

function loadListNiveauScolaire() {

    fetch('http://192.168.1.208:3001/api/config/listNiveauScolaire')
        .then( async resp =>  {
            
            if(resp.status === 400) return ;
            
            const data = await resp.json()
            
            ListNiveauScolaire.splice(0, ListNiveauScolaire.length)
            data.forEach(element => {
                ListNiveauScolaire.push(element)
            });
            
        }).catch(err => {
            console.error(err);
        }) 

}