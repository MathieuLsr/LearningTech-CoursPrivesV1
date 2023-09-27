import { AccountService } from "../../Utils/AccountService";


export function demanderSessionCours(IDCours, CoursDate, CoursTime, NomSession){

    const IDUser = AccountService.getUUID()
    
    const request = {
        "IDUser" : IDUser,
        "IDCours" : IDCours,
        "CoursDate" : CoursDate,
        "CoursTime" : CoursTime,
        "NomSession" : NomSession,
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request) 
    }
  
    try{
        fetch('http://192.168.1.208:3001/api/user/'+IDUser+"/session/add", options)
        .then( async resp =>  {
          
          if(resp.status === 400){
            //setMessage("Vous ne pouvez pas faire ça.")
            return ;
          }
  
          //console.log(await resp.json());
          
        }).catch(err => {
          console.error(err);
        }) 
  
          return ;
    } catch (error) {
      console.error(error);
    }

}