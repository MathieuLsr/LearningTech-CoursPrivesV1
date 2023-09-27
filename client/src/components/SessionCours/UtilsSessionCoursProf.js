import { ISession } from "../../Api/Session";
import { fetchSessionUser } from '../Calendar/UtilsCalendar'
/**
 * 
 * @param {ISession} session 
 */
export function setReponseProf(session, typeReponse, IDUser, setSessionsData){

    console.log(typeReponse);

    fetch(`http://192.168.1.208:3001/api/user/${session.IDUserEleve}/session/setReponse/${session.ID}/${typeReponse}`)
    .then(async rep => {
        
        const data = await rep.json()
        console.log(data);
         
    })
    .catch((except) => {
        console.error(except);
    })
        

}