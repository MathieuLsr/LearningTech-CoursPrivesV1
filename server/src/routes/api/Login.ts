import express from "express";
import { User } from "../../classes/Users/User/User";
import { hashPassword } from "../../classes/Users/Utils/Utils";

const loginRouter = express.Router();

loginRouter.get('/api/login/:email/:hashPassword', async (req: any, res: any) => {

    const email = req.params.email
    const hashPassword = req.params.hashPassword

    const user : User | null = await User.findOne({
        where:{
            Email: email
        }
    })

    if(user == null){
        //res.send("Utilisateur non trouvé.")
        res.status(400).json({error: "Utilisateur ou mot de passe incorrect."})
        return ;
    }

    if(user?.Password == hashPassword){
        res.json(user)
        return ;
    }
    
    
    res.status(400).json({error: "Utilisateur ou mot de passe incorrect."})
    //res.send(user) ;

});

export default loginRouter;
