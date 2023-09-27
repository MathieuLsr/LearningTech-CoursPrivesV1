import React, { useState, useEffect } from 'react';
import { CoursEnseignes } from '../../Api/CoursEnseignes';
import { fetchListeAvisCours } from "../Profil/UtilsAvis"
import { fetchUserDefaultInformations } from '../Profil/UtilsUsers'
import { demanderSessionCours } from './UtilsReservations'

function CoursFilter({coursJson}) {

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

    const [UserData, setUserData] = useState()
    const [ListeAvis, setListeAvis] = useState([])

    const [CoursDate, setCoursDate] = useState()
    const [CoursTime, setCoursTime] = useState()
    const [NomSession, setNomSession] = useState()

    useEffect(() => {
        fetchListeAvisCours(cours.ID, setListeAvis)
        fetchUserDefaultInformations(cours.ID, setUserData)
    }, [cours.ID]);


  return (
    <div className="cours">
      <p>=========</p>
      <p>{JSON.stringify(UserData)}</p>
      <p>{JSON.stringify(cours)}</p>
      <p>Avis :</p>
      <div>
        {ListeAvis.map(avis => (
          <p key={avis.ID}>{JSON.stringify(avis)}</p>
        ))}
      </div>

      <div>

        <label for="name">Nom session:</label>
        <input type="text" id="name" name="name" value={NomSession} onChange={e => setNomSession(e.target.value)}/>

        <label for="date">Date:</label>
        <input type="date" id="date" name="date" value={CoursDate} onChange={e => setCoursDate(e.target.value)}/>

        <label for="time">Heure:</label>
        <input type="time" id="time" name="time" value={CoursTime} onChange={e => setCoursTime(e.target.value)}/>
      </div>
      
      <button onClick={() => demanderSessionCours(cours.ID, CoursDate, CoursTime, NomSession)}>Réserver ce créneau</button>

    </div>
  );
}
export default CoursFilter;
