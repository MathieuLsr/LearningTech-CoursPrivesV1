import express from "express";
import { Cfg_TypeUser } from "../../../classes/Entities/Cfg_TypeUser";

const listTypeUserRouter = express.Router();

listTypeUserRouter.get('/api/config/listTypeUser', async (_req: any, res: any) => {
    const tab : Cfg_TypeUser[] = await Cfg_TypeUser.findAll()
    res.json(tab)
});

export default listTypeUserRouter ;