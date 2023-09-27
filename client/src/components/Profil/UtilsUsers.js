import { AccountService } from "../../Utils/AccountService";

export const fetchUser = async (setData, setPrenom, setNom, setEmail, setDateCreationCompte, setDateNaissance, setTypeUser, setTelephone, setDescriptionPersonnelle, setPorteFeuille) => {
    try {

      fetch('http://192.168.1.208:3001/api/user/get/'+AccountService.getUUID())
      .then(async response => {
          if(response.status === 400){
            console.log("User not found")
            return ;
          }
          
          const data = await response.json()

          if(data == null) return ;
          
          setData(data)
          setPrenom(data.Prenom)
          setNom(data.Nom)
          //setPassword(data.Password)
          setEmail(data.Email)
          setDateCreationCompte(data.DateCreationCompte)
          setDateNaissance(data.DateNaissance)
          setTypeUser(data.TypeUser)
          setTelephone(data.Telephone)
          setDescriptionPersonnelle(data.DescriptionPersonnelle)
          setPorteFeuille(data.PorteFeuille)

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


export const fetchUserDefaultInformations = async(IDCours, setUserData) => {

  try {
      const response = await fetch(`http://192.168.1.208:3001/api/coursEnseignes/info/${IDCours}`);
      const data = await response.json();
      setUserData(data)
  } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
  }


}