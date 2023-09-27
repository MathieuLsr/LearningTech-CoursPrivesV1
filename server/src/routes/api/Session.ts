import express from "express";
import bodyParser from "body-parser"
import { UsersManager } from "../../classes/Users/Manager/UsersManager";
import { User } from "../../classes/Users/User/User";
import { ITimeSlot, TimeSlot } from "../../classes/Users/Sessions/TimeSlot";
import { Recurrence } from "../../classes/Users/Time/Recurrence";
import { CoursEnseigne } from "../../classes/Users/User/DetailsProf/CoursEnseigne";
import { ISessionCours, SessionCours } from "../../classes/Users/Sessions/SessionCours";
import { TypeReponse } from "../../classes/Users/Sessions/TypeReponse";

const usersManager : UsersManager = new UsersManager() ;

const sessionRouter = express.Router();

const body = bodyParser.json()
sessionRouter.use(body)

sessionRouter.post('/api/user/:idUser/session/add', body, async (req: any, res: any) => {
    
    const sessionJson = req.body; // contient les données mises à jour de l'utilisateur
    const IDUser = req.params.idUser ;

    if(sessionJson === undefined) {
        res.status(401).json({error: "Requête invalide."})
        return ;
    }
   
    const request = {
        "IDUser" : sessionJson["IDUser"],
        "IDCours" : sessionJson["IDCours"],
        "CoursDate" : sessionJson["CoursDate"],
        "CoursTime" : sessionJson["CoursTime"],
        "NomSession" : sessionJson["NomSession"]
    }

    const user : User | null = await User.findByPk(IDUser)
    const IDCours = request.IDCours

    if(user == null) {
        res.status(400).json({error: "User introuvable."})
        return ;
    }

    const cours : CoursEnseigne | null = await CoursEnseigne.findByPk(IDCours)

    if(cours == null) {
        res.status(402).json({error: "Cours enseigné introuvable."})
        return ;
    }

    const coursDate = request.CoursDate;
    const coursTime = request.CoursTime;

    if(coursDate === undefined || coursTime === undefined){
        res.status(403).json({error: "La date est non définie."})
        return ; 
    }

    const dateObj = new Date(`${coursDate}T${coursTime}`);
    const timeDebut = dateObj.getTime() / 1000;

    const timeCours = cours.Duree * 60 // En min par défaut => pour passer en s
    
    const timeslot : TimeSlot = await TimeSlot.create({
        Recurrence : Recurrence.AUCUNE,
        DateDebut : timeDebut,
        DateFin : timeDebut+timeCours,
    })

    const prof : User | null = await cours.getProfessor() ;

    if(prof === null){
        timeslot.destroy()
        res.status(404).json({error: "Le professeur est introuvable."})
        return ;
    }

    const NomSession = request.NomSession === "" || request.NomSession === undefined ?
        cours.NomCours : request.NomSession ;

    const session : SessionCours = await SessionCours.create({
        IDUserProf: prof.ID,
        IDUserEleve: user.ID,
        CreneauID: timeslot.ID,
        Prix: cours.Prix,
        TypeReponseProf: TypeReponse.ATTENTE,
        AccepteEleve: true,
        PayeEleve: false,
        NomSession: NomSession
    })

    user.addSessionSuivi(session)
    prof.addSessionSuivi(session)

    Promise.all(user.getListSessionSuivi())
      .then(async rep => {
        res.json(rep)
        user.save()
        prof.save() 
      })

});


  

sessionRouter.get('/api/user/:idUser/session/get', body, async (req: any, res: any) => {

    const IDUser = req.params.idUser ;

    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    const promises : Promise<TimeSlot | null>[] = []

    Promise.all(user.getListSessionSuivi())
    .then(resp => {
        
        resp.forEach(session => {
            if(session === null) return ;
            const creneau : Promise<TimeSlot | null> = TimeSlot.findByPk(session.CreneauID.toString())
            promises.push(creneau);

            creneau.then(cre => {
                session.Creneau = cre
            })

        })

        Promise.all(promises).then(_ => {
            res.json(resp)
        })

    }).catch(err => {
        console.error(err);
        return ;
    })

    

});


sessionRouter.get('/api/user/:idUser/session/pay/:idSession', body, async (req: any, res: any) => {

    const IDUser = req.params.idUser ;
    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    const IDSession = req.params.idSession ;
    const session : SessionCours | null = await SessionCours.findByPk(IDSession)

    if(session == null) {
        res.status(401).json({error: "Session introuvable."})
        return ;
    }

    if(session.PayeEleve === true){
        res.status(301).json({error: "La session a déjà été payé."})
        return ;
    }

    if(user.PorteFeuille < session.Prix){
        res.status(300).json({error: "L'utilisateur n'a pas assez d'argent."})
        return ;
    }

    user.PorteFeuille -= session.Prix
    session.PayeEleve = true

    res.status(200).json({message: "L'utilisateur a payé la session de cours."})
    session.save()
    user.save()

});

sessionRouter.get('/api/user/:idUser/session/setReponse/:idSession/:typeReponse', async (req: any, res: any) => {

    const IDUser = req.params.idUser ;
    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    const IDSession = req.params.idSession ;
    const session : SessionCours | null = await SessionCours.findByPk(IDSession)

    if(session == null) {
        res.status(401).json({error: "Session introuvable."})
        return ;
    }

    
    if(session.TypeReponseProf !== TypeReponse.ATTENTE){
        res.status(301).json({error: "La session a déjà eu une réponse."})
        return ;
    }

    const typeRep : TypeReponse | undefined = TypeReponse.parseString(req.params.typeReponse)
    
    if(typeRep === undefined){
        res.status(300).json({error: "Le type de réponse est incorrect."})
        return ;
    }

    session.TypeReponseProf = typeRep 
    res.status(200).json({message: "La session a été mis à jour."})
    session.save()

});

export default sessionRouter;
