import React, { useState, useEffect } from 'react';
import AvisCours from '../Avis/AvisCours'
import { CoursEnseignes } from '../../Api/CoursEnseignes';
import { fetchListeAvisCours } from "../Profil/UtilsAvis"
import { removeCoursEnseignes } from "../Profil/UtilsCoursEnseignes"

function Cours({IDUser, coursJson, setListeCoursEnseignes}) {

    if(coursJson === undefined | coursJson === null) return ;

    const cours = new CoursEnseignes(
         coursJson["NomCours"], 
         coursJson["TypeCours"], 
         coursJson["ListeNiveaux"], 
         coursJson["Prix"], 
         coursJson["Duree"], 
         coursJson["ListeAvisID"]
    )
    cours.ID = coursJson["ID"]

    const [ListeAvis, setListeAvis] = useState([])
    

    useEffect(() => {

      fetchListeAvisCours(cours.ID, setListeAvis)
  
    }, []);


  return (
    <div className="cours">
      <h3>CoursEnseignes #{cours.ID}</h3>
      <p>Nom cours : {cours.NomCours}</p>
      <p>TypeCours : {cours.TypeCours}</p>
      <p>ListeNiveaux : {cours.ListeNiveaux}</p>
      <p>Prix : {cours.Prix}</p>
      <p>Duree : {cours.Duree}</p>

      <p>
        {ListeAvis.map(avis => (
          <AvisCours IDCours={cours.ID} avis={avis} setListeAvis={setListeAvis}/> 
        ))}
      </p>
      
      <button onClick={() => removeCoursEnseignes(IDUser, cours.ID, setListeCoursEnseignes)}>Supprimer le cours enseigné</button>
    </div>
  );
  //<button onClick={() => postAvisRemove(id)}>Supprimer</button>
}
export default Cours;
