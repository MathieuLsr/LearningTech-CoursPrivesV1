
export const fetchSessionUser = async (IDUser, setEvents) => {

    fetch('http://192.168.1.208:3001/api/user/'+IDUser+"/session/get")
        .then( async resp =>  {
            
            if(resp.status === 400){
            //setMessage("Vous ne pouvez pas faire ça.")
            return ;
            }
            const data = await resp.json()
            convertSessionsToEvents(data, setEvents)
            
        }).catch(err => {
                console.error(err);
        }) 

}


export const fetchLiteInfosUser = async (IDUser, setUserInfo) => {

    fetch('http://192.168.1.208:3001/api/user/get/'+IDUser+'/filter?Nom&Prenom')
        .then( async resp =>  {
            
            if(resp.status === 400){
            //setMessage("Vous ne pouvez pas faire ça.")
            return ;
            }

            setUserInfo(await resp.json())
            
        }).catch(err => {
                console.error(err);
        }) 

}

export const getLiteInfosUser = async (IDUser) => {
    
    fetch('http://192.168.1.208:3001/api/user/get/'+IDUser+'/filter?Nom&Prenom')
        .then( async resp =>  {
            
            if(resp.status === 400) return undefined ;
            return resp.json()
            
        }).catch(err => {
            console.error(err);
        }) 

}


  // Fonction pour déterminer les propriétés de style de l'événement
export const getEventStyle = (event) => {
    let backgroundColor;
    // Déterminez la couleur en fonction de la variable de l'événement
    switch (event.typeReponseProf) {
      case "0":
        backgroundColor = 'orange';
        break;
      case "1":
        backgroundColor = 'green';
        break;
      case "2":
        backgroundColor = 'red';
        break;
      default:
        backgroundColor = 'cyan'; // Couleur par défaut si la variable n'est pas définie
        break;
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };



const convertSessionsToEvents = (SessionsData, setEvents) => {

  const events = SessionsData.map((session) => ({
    title: session.NomSession,
    start: new Date(session.Creneau.DateDebut * 1000),
    end: new Date(session.Creneau.DateFin * 1000),
    typeReponseProf: session.TypeReponseProf,
    session: session,
  }));

  setEvents(events)

};