import React from 'react';
import { removeAvisUser } from "../Profil/UtilsAvis"

export default function AvisUser({ IDUser, avis, setListeAvisID}) {

  const id = avis["ID"]
  const auteur = avis["IDUserWriteAvis"]
  const note = avis["Notation"]
  const commentaire = avis["Commentaire"]

  return (
    <div className="avis">
      <h3>Avis #{id}</h3>
      <p>
        <strong>Auteur:</strong> {auteur}
      </p>
      <p>
        <strong>Note:</strong> {note}/5
      </p>
      <p>
        <strong>Commentaire:</strong> {commentaire}
      </p>
      <button onClick={() => removeAvisUser(IDUser, id, setListeAvisID)}>Supprimer l'avis sur l'utilisateur</button>
    </div>
  );
}

//export default AvisUser ;