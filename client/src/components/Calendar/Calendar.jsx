import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { fetchSessionUser } from './UtilsCalendar';
import { AccountService } from '../../Utils/AccountService'
import SessionCoursEleve from '../SessionCours/SessionCoursEleve'
import SessionCoursProf from '../SessionCours/SessionCoursProf'
import { ISession } from '../../Api/Session'

function Calendar({IDUser_}) {

  if(!AccountService.haveUUID()){
    return <div className="notLogged">
        <h1>Vous devez vous connecter pour afficher votre calendrier.</h1>
        <Link to="/login">Login</Link>
    </div>
  }

  const IDUser = IDUser_ === undefined ? AccountService.getUUID() : IDUser_
  const [SessionsData, setSessionsData] = useState([])

  
  useEffect(() => {
    fetchSessionUser(IDUser, setSessionsData)
  }, []);

  const renderCalendarCells = () => {

    const now = new Date() / 1000
    const SessionsBefore = []
    const SessionsNow = []
    const SessionsAfter = []

    SessionsData.map(ele => {

      const session = new ISession(ele)

      console.log(session.IDUserProf, IDUser);
      const sessionHtml =  session.IDUserProf === IDUser ? 
        <div><SessionCoursProf session={session} IDUser={IDUser} setSessionsData={setSessionsData}/></div> :
        <div><SessionCoursEleve session={session} IDUser={IDUser} setSessionsData={setSessionsData}/></div> 

      if(session.Creneau.DateFin < now) SessionsBefore.push(sessionHtml)
      else if(session.Creneau.DateDebut > now) SessionsAfter.push(sessionHtml)
      else SessionsNow.push(sessionHtml)

    });

    return (
      <div>
        <h1>Heure actuelle : {new Date(now*1000).toString()} {now}</h1>
        <div>
          <h2>Sessions à venir :</h2>
          {SessionsAfter.map((sessionHtml, index) => (
            <div key={index}>{sessionHtml}</div>
          ))}
        </div>
        <div>
          <h2>Sessions en cours :</h2>
          {SessionsNow.map((sessionHtml, index) => (
            <div key={index}>{sessionHtml}</div>
          ))}
        </div>
        <div>
          <h2>Sessions terminées :</h2>
          {SessionsBefore.map((sessionHtml, index) => (
            <div key={index}>{sessionHtml}</div>
          ))}
        </div>
      </div>
    );
    

  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>Calendar</h2>
      </div>
      <div className="calendar-body">
        <div className="calendar-grid">{renderCalendarCells()}</div>
      </div>
    </div>
  );
};

export default Calendar;
