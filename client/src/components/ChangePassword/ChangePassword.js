export function UpdatePassword(uuid, currentPassword, newPassword, setMessage){

    fetch('http://192.168.1.208:3001/api/user/'+uuid+'/changepassword/'+currentPassword+'/'+newPassword)
        .then( async resp =>  {
            
            if(resp.status === 400) setMessage("Utilisateur introuvable.") ;
            if(resp.status === 402) setMessage("Mot de passe incorrect.") ;
            if(resp.status === 200) setMessage("Mot de passe changé avec succès") ;
                
        }).catch(err => {
            console.error("Error non génée :",err);
        }) 

}