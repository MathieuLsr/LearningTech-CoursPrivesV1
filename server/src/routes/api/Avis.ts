import express from "express";
import { User } from "../../classes/Users/User/User";
import bodyParser from "body-parser"
import { UsersManager } from "../../classes/Users/Manager/UsersManager";
import { Avis } from "../../classes/Users/Avis/Avis";
import { CoursEnseigne } from "../../classes/Users/User/DetailsProf/CoursEnseigne";

const usersManager : UsersManager = new UsersManager() ;

const userAvisRouter = express.Router();

const body = bodyParser.json()
userAvisRouter.use(body)

userAvisRouter.get('/api/user/:idUser/avis/get', body, async (req: any, res: any) => {
    
    const IDUser = req.params.idUser ;

    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    const avis : Avis[] = await Avis.findAll({
        where:{
            IDObject: user.ID
        }
    })

    res.json(avis)
    
  });

userAvisRouter.get('/api/user/:idUser/avis/remove/:idAvis', body, async (req: any, res: any) => {

    const IDUser = req.params.idUser ;
    const IDAvis = req.params.idAvis ;

    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;
    const avis : Avis | null = await Avis.findByPk(IDAvis)

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    if(avis == null) {
        res.status(401).json({error: "Avis introuvable."})
        return ;
    }

    user.removeAvis(avis.ID)
    await avis.destroy()
    user.save()
    res.status(200).json({message: "Avis supprimé."})

});

userAvisRouter.post('/api/user/:idUser/avis/add', body, async (req: any, res: any) => {
    
    const avisJson = req.body; // contient les données mises à jour de l'utilisateur
    const IDUser = req.params.idUser ;

    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    if(avisJson === undefined) {
        res.status(401).json({error: "Requête invalide."})
        return ;
    }
   
    const avis : Avis = await Avis.create({
        IDObject : avisJson["IDObject"], 
        IDUserWriteAvis : avisJson["IDUserWriteAvis"],
        Commentaire: avisJson["Commentaire"], 
        Notation: avisJson["Notation"]
    })

    user.addAvis(avis)

    try{ 
        await user.save()

        const avis : Avis[] = await Avis.findAll({
            where:{
                IDObject: user.ID
            }
        })
        res.status(200).json(JSON.stringify(avis));
    } catch(excep){
        console.error(excep)
        res.status(402).json({error: excep})
        return ;
    }
    
  });




export default userAvisRouter;
