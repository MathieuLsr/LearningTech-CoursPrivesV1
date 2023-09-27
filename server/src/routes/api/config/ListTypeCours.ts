import express from "express";
import { Cfg_TypeCours } from "../../../classes/Entities/Cfg_TypeCours";

const listTypeCoursRouter = express.Router();

listTypeCoursRouter.get('/api/config/listTypeCours', async (_req: any, res: any) => {
    const tab : Cfg_TypeCours[] = await Cfg_TypeCours.findAll()
    res.json(tab)
});

export default listTypeCoursRouter ;