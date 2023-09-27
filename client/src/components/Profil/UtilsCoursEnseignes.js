import { AccountService } from "../../Utils/AccountService";
import { CoursEnseignes } from "../../Api/CoursEnseignes"
import { ListNiveauScolaire, MapNiveauScolaire } from "../../Utils/UtilsVar"

export const fetchListeCoursEnseignes = async (setListeCoursEnseignes) => {
    try {

      fetch('http://192.168.1.208:3001/api/user/'+AccountService.getUUID()+"/coursEnseignes/get")
      .then(async response => {
          if(response.status === 400){
            console.log("User not found")
            return ;
          }
          
          const data = await response.json()

          if(data == null) return ;
         
          setListeCoursEnseignes(data)
          
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


export const removeCoursEnseignes = async (IDUser, id, setListeCoursEnseignes) => {
    //"user/:idUser/coursEnseignes/remove/:idCours"
  fetch('http://192.168.1.208:3001/api/user/'+IDUser+'/coursEnseignes/remove/'+id)
      .then(async response => {
          if(response.status === 400){
            console.log("Cours not found")
            return ;
          }
          
          if(response.status === 200){
            fetchListeCoursEnseignes(setListeCoursEnseignes)
            return ;
          }

          return ;
      })
      .catch(error => {
          console.error(error)
          return ;
      });

};

export const createCoursEnseigne = async (ID, NomCours, TypeCours, CoursNiveauScolaire, Prix, Duree, ListeAvisID, setMessage, setListeCoursEnseignes) => {
  try {

    console.log("CoursNiveauScolaire : ", CoursNiveauScolaire);

    const ListeNiveaux = []
    for(var i in ListNiveauScolaire){
      const niv = ListNiveauScolaire[i]
      if(niv["select"] === true) ListeNiveaux.push(niv["INT_ID"])
    }

    const cours = new CoursEnseignes(NomCours, TypeCours, ListeNiveaux, Prix, Duree, ListeAvisID)

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(cours) 
    }

    fetch('http://192.168.1.208:3001/api/user/'+ID+"/coursEnseignes/add", options)
      .then( async resp =>  {
        
        if(resp.status === 400){
          setMessage("Vous ne pouvez pas faire ça.")
          return ;
        }

        setMessage("Avis ajouté.") ;
        fetchListeCoursEnseignes(setListeCoursEnseignes)

      }).catch(err => {
        console.error(err);
      }) 

        return ;
  } catch (error) {
    console.error(error);
  }
};


export const fetchAllNiveauScolaire = async(setAllNiveauScolaire) => {

  
  const list = []
  var j = 0 
  
  for(var i in MapNiveauScolaire) {
    list.push([i, j, false])
    j++ 
  }
  setAllNiveauScolaire(list)

}