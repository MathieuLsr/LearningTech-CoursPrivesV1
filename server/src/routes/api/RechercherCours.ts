import express from "express";
import { User } from "../../classes/Users/User/User";
import bodyParser from "body-parser"
import { UsersManager } from "../../classes/Users/Manager/UsersManager";
import { Avis } from "../../classes/Users/Avis/Avis";
import { TypeCours } from "../../classes/Users/User/DetailsProf/TypeCours";
import { CoursEnseigne } from "../../classes/Users/User/DetailsProf/CoursEnseigne";
import { NiveauScolaire } from "../../classes/Users/User/DetailsProf/NiveauScolaire";
import queryString, { ParsedUrlQuery } from "querystring"
import { FindOptions, Model, Op } from "sequelize";


const usersManager : UsersManager = new UsersManager() ;

const rechercherCoursRouter = express.Router();

const body = bodyParser.json()
rechercherCoursRouter.use(body)

rechercherCoursRouter.get('/api/coursEnseignes/search', async (req: any, res: any) => {
    
    const queryParams : ParsedUrlQuery = req.query;
      

    // Extraire les options facultatives
    const typeCours = queryParams.typeCours || undefined ;
    const niveauScolaire = queryParams.niveauScolaire || undefined;
    const prixMin = parseFloat(queryParams.prixMin?.toString() ?? '') || undefined ;
    const prixMax = parseFloat(queryParams.prixMax?.toString() ?? '') || undefined ;
    const dureeMin = parseFloat(queryParams.dureeMin?.toString() ?? '') || undefined ;
    const dureeMax = parseFloat(queryParams.dureeMax?.toString() ?? '') || undefined ;
    
    const options : {[key: string] : any} = {};

    if (typeCours !== undefined) {
        options.TypeCours = typeCours;
    }

    if (niveauScolaire !== undefined) {
        options.ListeNiveaux = {
            [Op.contains]: [niveauScolaire]
        };
    }

    if (prixMin !== undefined || prixMax !== undefined) {
        options.Prix = {};
        if (prixMin !== undefined) {
            options.Prix[Op.gte] = prixMin;
        }
        if (prixMax !== undefined) {
            options.Prix[Op.lte] = prixMax;
        }
    }

    if (dureeMin !== undefined || dureeMax !== undefined) {
        options.Duree = {};
        if (dureeMin !== undefined) {
            options.Duree[Op.gte] = dureeMin;
        }
        if (dureeMax !== undefined) {
            options.Duree[Op.lte] = dureeMax;
        }
    }

    const cours: CoursEnseigne[] = await CoursEnseigne.findAll({
    where: options
    });
      

    res.json(cours)

});


rechercherCoursRouter.get('/api/coursEnseignes/info/:idCours', async (req: any, res: any) => {

    const IDCours = req.params.idCours ;
    const cours : CoursEnseigne | null = await CoursEnseigne.findByPk(IDCours) ;
    

    if(cours == null) {
        res.status(400).json({error: "Cours enseigné introuvable."})
        return ;
    }

    const user : User | null = await User.findOne({
        where:{
            ListeCoursEnseignes: {
                [Op.contains]: [IDCours]
            }
        }
    })
    
    res.json(user)

}) ;



export default rechercherCoursRouter;
