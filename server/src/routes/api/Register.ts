import express from "express";
import { UsersManager } from "../../classes/Users/Manager/UsersManager";
import { User } from "../../classes/Users/User/User";

const registerRouter = express.Router();
const usersManager : UsersManager = new UsersManager()


registerRouter.get('/api/Register/:email/:hashPassword', async (req: any, res: any) => {

    const email = req.params.email
    const hashPassword = req.params.hashPassword
    
    const exists : boolean = await usersManager.containsEmail(email)

    if(exists){
        res.status(500).json({error:"L'email est déjà utilisée."})
        return ;
    }

    const user : User = await User.create({
        Email : email,
        Password : hashPassword
    })

    res.json(user)
    
});

export default registerRouter;
