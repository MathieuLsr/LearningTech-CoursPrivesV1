import { ISession } from "../../Api/Session";
import { fetchSessionUser } from '../Calendar/UtilsCalendar'
/**
 * 
 * @param {ISession} session 
 */
export function payerSession(session, IDUser, setSessionsData){

    fetch(`http://192.168.1.208:3001/api/user/${session.IDUserEleve}/session/pay/${session.ID}`)
    .then(async rep => {
        
        const data = await rep.json()

        console.log(data);
         
        if(rep.status === 200){
            fetchSessionUser(IDUser, setSessionsData)
        }

    })
    .catch((except) => {
        console.error(except);
    })
        

}