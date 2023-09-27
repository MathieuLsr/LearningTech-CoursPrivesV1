import express from "express";
import { Cfg_NiveauScolaire } from "../../../classes/Entities/Cfg_NiveauScolaire";

const listNiveauScolaireRouter = express.Router();

listNiveauScolaireRouter.get('/api/config/listNiveauScolaire', async (_req: any, res: any) => {
    const tab : Cfg_NiveauScolaire[] = await Cfg_NiveauScolaire.findAll()
    res.json(tab)
});


export default listNiveauScolaireRouter ;