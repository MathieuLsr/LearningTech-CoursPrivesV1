import express from "express";
import { User } from "../../classes/Users/User/User";
import bodyParser from "body-parser"
import { UsersManager } from "../../classes/Users/Manager/UsersManager";
import { Avis } from "../../classes/Users/Avis/Avis";
import { PostForum } from "../../classes/Forum/PostForum";

const usersManager : UsersManager = new UsersManager() ;

const postForumRouter = express.Router();

const body = bodyParser.json()
postForumRouter.use(body)

postForumRouter.get('/api/postforum/get_amount/:nb', body, async (req: any, res: any) => {
    
    const nb = parseInt(req.params.nb) ;
    const post : PostForum[] = await PostForum.findAll()

    if(post == null) {
        res.status(400).json({error: "Post introuvable."})
        return ;
    }

    const response : PostForum[] = []

    for(let j=0 ; j<nb ; j++) response.push(post[j])

    res.json(response)
    
});

postForumRouter.get('/api/postforum/get/:id', body, async (req: any, res: any) => {
    
    const ID = req.params.id ;

    const post : PostForum | null = await PostForum.findByPk(ID) ;

    if(post == null) {
        res.status(400).json({error: "Post introuvable."})
        return ;
    }

    res.json(post)
    
});

postForumRouter.get('/api/postforum/remove/:id', body, async (req: any, res: any) => {

    const ID = req.params.id ;

    const post : PostForum | null = await PostForum.findByPk(ID) ;

    if(post == null) {
        res.status(400).json({error: "Post introuvable."})
        return ;
    }

    await post.destroy()
    res.status(200).json({error: "Post supprimé."})

});

postForumRouter.post('/api/postforum/add', body, async (req: any, res: any) => {
    
    const postJson = req.body; // contient les données mises à jour de l'utilisateur
    
    if(postJson === undefined) {
        res.status(401).json({error: "Requête invalide."})
        return ;
    }
    
    const post : PostForum = await PostForum.create({
        UUID_UserID : postJson["UUID_UserID"], 
        STR_Title : postJson["STR_Title"],
        STR_Body: postJson["STR_Body"]
    })


    try{ 
        await post.save()
        res.status(200).json(JSON.stringify(post));
    
    } catch(excep){
        console.error(excep)
        res.status(402).json({error: excep})
        return ;
    }
    
  });




export default postForumRouter;
