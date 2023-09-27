import express from "express";
import { User } from "../../classes/Users/User/User";
import bodyParser from "body-parser"
import { UsersManager } from "../../classes/Users/Manager/UsersManager";
import { hashPassword } from "../../classes/Users/Utils/Utils";

const usersManager : UsersManager = new UsersManager() ;

const updateRouter = express.Router();

const body = bodyParser.json()
updateRouter.use(body)

updateRouter.post('/api/user/update/:id', body, async (req: any, res: any) => {
    
    const updatedUser = req.body; // contient les données mises à jour de l'utilisateur
    const IDUser = req.params.id ;

    const user : User | null = await usersManager.getUserFromUUID(IDUser) ;

    if(user == null) {
        res.status(400).json({error: "Utilisateur introuvable."})
        return ;
    }

    //console.log(updatedUser);

    if(updatedUser === undefined) {
        res.status(401).json({error: "Requête invalide."})
        return ;
    }
    
    Object.assign(user, updatedUser)
    
    /*
    const avis : Avis = await Avis.create({
        IDUser: user.ID,
        Notation: 3,
        Commentaire: "Très bon professeur !"
    })

    user.addAvis(avis)
    */

    try{ 
        await user.save()
        //console.log("SUCCÈS");
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch(excep){
        //console.log("EXCEPTION");
        console.error(excep)
        res.status(400).json({error: excep})
        return ;
    }
    
    // Enregistrement de la mise à jour dans la base de données ou autre traitement nécessaire
    
  });


updateRouter.get('/api/user/:uuid/changepassword/:currentPassword/:newPassword', async (req: any, res: any) => {

    const uuid = req.params.uuid ;
    const currentPassword = req.params.currentPassword ;
    const newPassword = req.params.newPassword ;
    const user : User | null = await usersManager.getUserFromUUID(uuid) ;

    if(user === null){
        res.status(400).json({error:"Utilisateur introuvable."})
        return ;
    }

    const currentPassHash = hashPassword(currentPassword)
    //const currentPassHash = hashPassword()

    //user.Password = currentPassHash ; 

    if(currentPassHash !== user.Password){
        res.status(402).json({error:"Le mot de passe est incorrect."})
        return ;
    }

    const newPassHash = hashPassword(newPassword)
    user.Password = newPassHash

    await user.save()
    res.status(200).json({message:"Mot de passe changé"})

}); 

export default updateRouter;
