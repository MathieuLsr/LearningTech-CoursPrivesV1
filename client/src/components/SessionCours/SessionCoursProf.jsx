import React from 'react';
import Creneau from '../Creneau/Creneau';
import { setReponseProf } from './UtilsSessionCoursProf'

export default function SessionCoursProf({ session, IDUser, setSessionsData }) {

  const ATTENTE = '0'
  const ACCEPTE = '1'
  const REFUSE = '2'

  const payeEleve = session.PayeEleve ? "Oui" : "Non"
  const typeReponse = session.TypeReponseProf === ATTENTE ? "Attente" : 
    session.TypeReponseProf === ACCEPTE ? "Accepte" : "Refusé"

  

  return (
    <div key={session.ID} className="calendar-cell">
      <p>===============</p>
      <p>ID Session : {session.ID}</p>
      <p>Mon Eleve : {session.IDUserEleve} </p>
      <p>Prix : {session.Prix} | PayeEleve : {payeEleve} | Ma réponse : {typeReponse}</p>
      <Creneau creneau={session.Creneau} />
      <div>
        <button onClick={() => setReponseProf(session, ACCEPTE, IDUser, setSessionsData)}>Accepté la session</button>
        <button onClick={() => setReponseProf(session, REFUSE, IDUser, setSessionsData)}>Refusé la session</button>
      </div>
    </div>
  );
}
