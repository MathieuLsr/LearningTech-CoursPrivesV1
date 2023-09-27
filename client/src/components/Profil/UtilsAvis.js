import { IAvis } from "../../Api/Avis"

export const fetchListeAvisUser = async (ID, setListeAvisID) => {
    try {

      fetch('http://192.168.1.208:3001/api/user/'+ID+"/avis/get")
      .then(async response => {
          if(response.status === 400){
            console.log("User not found")
            return ;
          }
          
          const data = await response.json()

          if(data == null) return ;
         
          setListeAvisID(data)
          
          return ;
      })
      .catch(error => {
          console.error(error)
          return ;
      });
    } catch (error) {
      console.error(error);
    }
  };

export const postAvisAdd = async (ID, IDUserWriteAvis, avisCommentaire, avisNotation, setMessage, setListeAvisID) => {
  try {

    const avis = new IAvis(ID, IDUserWriteAvis, avisCommentaire, avisNotation)

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(avis) 
    }

    fetch('http://192.168.1.208:3001/api/user/'+ID+"/avis/add", options)
      .then( async resp =>  {
        
        if(resp.status === 400){
          setMessage("Vous ne pouvez pas faire ça.")
          return ;
        }

        setMessage("Avis ajouté.") ;
        fetchListeAvisUser(ID, setListeAvisID)

      }).catch(err => {
        console.error(err);
      }) 

        return ;
  } catch (error) {
    console.error(error);
  }
};

export const removeAvisUser = async (IDUser, id, setListeAvisID) => {
    
  fetch('http://192.168.1.208:3001/api/user/'+IDUser+'/avis/remove/'+id)
      .then(async response => {
          if(response.status === 400){
            console.log("Avis not found")
            return ;
          }
          
          if(response.status === 200){
            fetchListeAvisUser(IDUser, setListeAvisID)
            return ;
          }

          return ;
      })
      .catch(error => {
          console.error(error)
          return ;
      });

};




















export const fetchListeAvisCours = async (ID, setListeAvisCours) => {
  try {

    fetch('http://192.168.1.208:3001/api/coursEnseignes/'+ID+"/avis/get")
    .then(async response => {
        if(response.status === 400){
          console.log("Cours not found")
          return ;
        }
        
        const data = await response.json()

        if(data == null) return ;
       
        setListeAvisCours(data)
       
        return ;
    })
    .catch(error => {
        console.error(error)
        return ;
    });
  } catch (error) {
    console.error(error);
  }
};



export const removeAvisCours = async (IDCours, id, setListeAvis) => {
    
  fetch('http://192.168.1.208:3001/api/coursEnseignes/'+IDCours+'/avis/remove/'+id)
      .then(async response => {
          if(response.status === 400){
            console.log("Avis not found")
            return ;
          }
          
          if(response.status === 200){
            fetchListeAvisCours(IDCours, setListeAvis)
            return ;
          }

          return ;
      })
      .catch(error => {
          console.error(error)
          return ;
      });
      
};



export const addAvisCours = async (IDCours, IDUserWriteAvis, avisCommentaire, avisNotation, setMessage, setListeAvisID) => {
  try {

    const avis = new IAvis(IDCours, IDUserWriteAvis, avisCommentaire, avisNotation)

    console.log(JSON.stringify(avis));

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(avis) 
    }

    fetch('http://192.168.1.208:3001/api/coursEnseignes/'+IDCours+"/avis/add", options)
      .then( async resp =>  {
        
        if(resp.status === 400){
          setMessage("Vous ne pouvez pas faire ça.")
          return ;
        }

        setMessage("Avis ajouté.") ;
        //fetchListeAvisUser(ID, setListeAvisID)

      }).catch(err => {
        console.error(err);
      }) 

        return ;
  } catch (error) {
    console.error(error);
  }
};