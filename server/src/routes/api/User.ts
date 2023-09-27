import express from "express";
import { ParsedUrlQuery } from "querystring";
import { UsersManager } from "../../classes/Users/Manager/UsersManager";
import { User } from "../../classes/Users/User/User";

const userRouter = express.Router();
const usersManager : UsersManager = new UsersManager()


userRouter.get('/api/user/get/:uuid', async (req: any, res: any) => {


    const paramUuidValue = req.params.uuid

    const user : User | null = await usersManager.getUserFromUUID(paramUuidValue)

    if(user === null){
        res.status(400).json({error:"User not found."})
        return ;
    }

    res.json(user) ;

});


userRouter.get('/api/user/get/:uuid/filter', async (req: any, res: any) => {


    const paramUuidValue = req.params.uuid
    const queryParams : ParsedUrlQuery = req.query;

    const user : User | null = await usersManager.getUserFromUUID(paramUuidValue)

    if(user === null){
        res.status(400).json({error:"User not found."})
        return ;
    }

    const userFilter : Record<string, any> = {}
    const userJson = user.toJSON()
    userFilter["ID"] = userJson["ID"]

    for(var key in user.get()){
        if(queryParams[key] !== undefined) userFilter[key] = userJson[key]
    }

    res.json(userFilter) ;

});


userRouter.get('/api/user/get_all', async (_req: any, res: any) => {
    const users : User[] = await User.findAll()
    res.json(users) ;
});

export default userRouter;
