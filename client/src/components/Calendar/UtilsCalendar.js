
export const fetchSessionUser = async (IDUser, setSessionsData) => {

    fetch('http://192.168.1.208:3001/api/user/'+IDUser+"/session/get")
        .then( async resp =>  {
            
            if(resp.status === 400){
            //setMessage("Vous ne pouvez pas faire ça.")
            return ;
            }

            setSessionsData(await resp.json());
            
        }).catch(err => {
                console.error(err);
        }) 

}


export const fetchLiteInfosUser = async (IDUser, setUserInfo) => {

    fetch('http://192.168.1.208:3001/api/user/get/'+IDUser+'/filter?Nom&Prenom')
        .then( async resp =>  {
            
            if(resp.status === 400){
            //setMessage("Vous ne pouvez pas faire ça.")
            return ;
            }

            setUserInfo(await resp.json())
            
        }).catch(err => {
                console.error(err);
        }) 

}

export const getLiteInfosUser = async (IDUser) => {
    
    fetch('http://192.168.1.208:3001/api/user/get/'+IDUser+'/filter?Nom&Prenom')
        .then( async resp =>  {
            
            if(resp.status === 400) return undefined ;
            return resp.json()
            
        }).catch(err => {
            console.error(err);
        }) 

}
