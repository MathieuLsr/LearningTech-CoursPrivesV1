
export const fetchAllUsers = async (setUsers) => {
    
    fetch('http://192.168.1.208:3001/api/user/get_all')
        .then( async resp =>  {
            
            if(resp.status === 400) return undefined ;
            const data = await resp.json()
            setUsers(data)
            
        }).catch(err => {
            console.error(err);
        }) 

}

export const updateUser = async (user, type) => {
    try {

        if(user === 'null' || user === undefined) return ;

        const ID = user.ID
        user.TypeUser = type.INT_ID
        
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user) 
        }

        fetch('http://192.168.1.208:3001/api/user/update/'+ID, options)
            .then( resp => {
            
            if(resp.status === 400){
                return ;
            }

            console.log("Update réussie");

            }).catch(err => {
                console.error(err);
            }) 

            return ;
        } catch (error) {
            console.error(error);
        }
  };