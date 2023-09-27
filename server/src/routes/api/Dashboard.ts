import express from "express";
import { PostForum } from "../../classes/Forum/PostForum";
import { Avis } from "../../classes/Users/Avis/Avis";
import { SessionCours } from "../../classes/Users/Sessions/SessionCours";
import { CoursEnseigne } from "../../classes/Users/User/DetailsProf/CoursEnseigne";
import { User } from "../../classes/Users/User/User";

const dashboardRouter = express.Router();

dashboardRouter.get('/api/dashboard/datas/:uuid', async (_req: any, res: any) => {

    const users : User[] = await User.findAll()
    const avis : Avis[] = await Avis.findAll()
    const cours : CoursEnseigne[] = await CoursEnseigne.findAll()
    const sessions : SessionCours[] = await SessionCours.findAll()
    const postForum : PostForum[] = await PostForum.findAll()

    const obj = {
        "users": users,
        "avis": avis,
        "cours": cours,
        "sessions": sessions,
        "postForum": postForum
    }

    res.json(obj) ;
});

export default dashboardRouter;
