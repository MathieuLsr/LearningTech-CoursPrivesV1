import React from 'react';
import { removeAvisCours } from "../Profil/UtilsAvis"

export default function AvisCours({ IDCours, avis, setListeCoursEnseignes}) {

  const ID_Cours = IDCours
  const id = avis["ID"]
  const auteur = avis["IDUserWriteAvis"]
  const note = avis["Notation"]
  const commentaire = avis["Commentaire"]

  return (
    <div className="avis">
      <p>Avis #{id}</p>
      <p> Auteur: {auteur} </p>
      <p> Note: {note}/5 </p>
      <p> Commentaire: {commentaire} </p>
      <button onClick={() => removeAvisCours(ID_Cours, id, setListeCoursEnseignes)}>Supprimer l'avis</button>
    </div>
  );
}
