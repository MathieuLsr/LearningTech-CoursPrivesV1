import express from "express";
import { User } from "../../classes/Users/User/User";
import bodyParser from "body-parser"
import { UsersManager } from "../../classes/Users/Manager/UsersManager";
import { Avis } from "../../classes/Users/Avis/Avis";
import { TypeCours } from "../../classes/Users/User/DetailsProf/TypeCours";
import { CoursEnseigne } from "../../classes/Users/User/DetailsProf/CoursEnseigne";
import { NiveauScolaire } from "../../classes/Users/User/DetailsProf/NiveauScolaire";
import { deprecate } from "util";

const usersManager : UsersManager = new UsersManager() ;

const coursEnseignesRouter = express.Router();

const body = bodyParser.json()
coursEnseignesRouter.use(body)

coursEnseignesRouter.get('/api/user/:idUser/coursEnseignes/get', async (req: any, res: any) => {
    
    const IDUser = req.params.idUser ;

    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    Promise.all(user.getListCoursEnseignes())
      .then(async rep => {
        res.json(rep)
        await user.save()
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite lors du traitement des cours." });
      });
    
});

coursEnseignesRouter.get('/api/user/:idUser/coursEnseignes/remove/:idCours', body, async (req: any, res: any) => {

    const IDUser = req.params.idUser
    const IDCours = req.params.idCours ;

    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;
    const cours : CoursEnseigne | null = await CoursEnseigne.findByPk(IDCours)

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    if(cours == null) {
        res.status(401).json({error: "Cours introuvable."})
        return ;
    }

    user.removeCoursEnseignes(cours.ID)
    await cours.destroy()
    user.save()
    res.status(200).json({message: "Cours supprimé."})

});

coursEnseignesRouter.post('/api/user/:idUser/coursEnseignes/add', body, async (req: any, res: any) => {
    
    const coursJson = req.body; // contient les données mises à jour de l'utilisateur
    const IDUser = req.params.idUser ;

    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    if(coursJson === undefined) {
        res.status(401).json({error: "Requête invalide."})
        return ;
    }

    
    const cours : CoursEnseigne = CoursEnseigne.build()

    cours.NomCours = coursJson["NomCours"]
    cours.TypeCours = coursJson["TypeCours"]
    cours.Duree = coursJson["Duree"]
    cours.Prix = coursJson["Prix"]
    
    cours.ListeNiveaux = coursJson["ListeNiveaux"]
    cours.ListeAvisID = coursJson["ListeAvisID"]
    
    await cours.save()
    
    user.addCoursEnseigne(cours)

    try{ 
        const newUser : User = await user.save()

        Promise.all(newUser.getListCoursEnseignes()).then((listCours) => {
            res.status(200).json(listCours);
        })

    } catch(excep){
        console.error(excep)
        res.status(402).json({error: excep})
        return ;
    }
    
  });


  
/*      @deprecate
coursEnseignesRouter.get('/api/niveauScolaire/list_all', async (_req: any, res: any) => {
    const map = NiveauScolaire.getMapIDWithName()
    res.json(map)
});
*/






coursEnseignesRouter.post('/api/coursEnseignes/:idCours/avis/add', body, async (req: any, res: any) => {
    
    const avisJson = req.body; // contient les données mises à jour de l'utilisateur
    const IDCours = req.params.idCours ;

    const cours : CoursEnseigne | null = await CoursEnseigne.findByPk(IDCours)

    if(cours == null) {
        res.status(400).json({error: "Cours enseigné introuvable."})
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

    cours.addAvis(avis)

    try{ 
        await cours.save()
        res.status(200).json(JSON.stringify(avis));
    } catch(excep){
        console.error(excep)
        res.status(402).json({error: excep})
        return ;
    }
    
});


coursEnseignesRouter.get('/api/coursEnseignes/:idCours/avis/get', body, async (req: any, res: any) => {

    const IDCours = req.params.idCours ;

    const cours : CoursEnseigne | null = await CoursEnseigne.findByPk(IDCours) ;

    if(cours == null) {
        res.status(400).json({error: "Cours enseigné introuvable."})
        return ;
    }

    const avis : Avis[] = await Avis.findAll({
        where:{
            IDObject: cours.ID
        }
    })

    res.json(avis)

});




coursEnseignesRouter.get('/api/coursEnseignes/:idCours/avis/remove/:idAvis', body, async (req: any, res: any) => {

    const IDCours = req.params.idCours ;
    const IDAvis = req.params.idAvis ;

    const cours : CoursEnseigne | null = await CoursEnseigne.findByPk(IDCours) ;
    const avis : Avis | null = await Avis.findByPk(IDAvis)

    if(cours == null) {
        res.status(400).json({error: "Cours enseigné introuvable."})
        return ;
    }   

    if(avis == null) {
        res.status(401).json({error: "Avis introuvable."})
        return ;
    }

    cours.removeAvis(avis.ID)
    await avis.destroy()
    cours.save()
    res.status(200).json({message: "Avis supprimé."})

});






export default coursEnseignesRouter;
