import { AccountService } from "../../../Utils/AccountService";

export const fetchAllDatasDashboard = async(setDatas) => {
    
    fetch('http://192.168.1.208:3001/api/dashboard/datas/'+AccountService.getUUID())
        .then( async resp =>  {
            
            if(resp.status === 400) return undefined ;
            
            const data = await resp.json()
            setDatas(data)
            return data
            
        }).catch(err => {
            console.error(err);
        }) 

}


export const getLiteInfosUser = async (IDUser, setTypeUser) => {
    
    fetch('http://192.168.1.208:3001/api/user/get/'+IDUser+'/filter?TypeUser')
        .then( async resp =>  {
            
            if(resp.status === 400) return undefined ;
            const data = await resp.json()
            setTypeUser(data.TypeUser)
            return data 
            
        }).catch(err => {
            console.error(err);
        }) 

}
