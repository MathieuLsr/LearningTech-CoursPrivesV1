import React from 'react';
import Creneau from '../Creneau/Creneau';
import { payerSession } from './UtilsSessionCoursEleve'

export default function SessionCoursEleve({ session, IDUser, setSessionsData }) {

  const payeEleve = session.PayeEleve ? "Oui" : "Non"
  const typeReponse = session.TypeReponseProf === '0' ? "Attente" : 
    session.TypeReponseProf === '1' ? "Accepte" : "Refusé"

  return (
    <div key={session.ID} className="calendar-cell">
      <p>===============</p>
      <p>ID Session : {session.ID}</p>
      <p>Prof : {session.IDUserProf} </p>
      <p>Eleve : {session.IDUserEleve} </p>
      <p>Prix : {session.Prix} | PayeEleve : {payeEleve} | TypeRepProf : {typeReponse}</p>
      <Creneau creneau={session.Creneau} />
      <button onClick={() => payerSession(session, IDUser, setSessionsData)}>Payer la session de cours</button>
    </div>
  );
}
