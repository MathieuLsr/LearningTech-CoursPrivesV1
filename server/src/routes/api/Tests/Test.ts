import { kStringMaxLength } from "buffer";
import express from "express";
import { DataTypes, UUIDV4, where } from "sequelize";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { DatabaseManager } from "../../../classes/Database/DatabaseManager";
import { Avis } from "../../../classes/Users/Avis/Avis";
import { SessionCours } from "../../../classes/Users/Sessions/SessionCours";
import { TimeSlot } from "../../../classes/Users/Sessions/TimeSlot";
import { Recurrence } from "../../../classes/Users/Time/Recurrence";
import { CoursEnseigne } from "../../../classes/Users/User/DetailsProf/CoursEnseigne";
import { NiveauScolaire } from "../../../classes/Users/User/DetailsProf/NiveauScolaire";
import { TypeCours } from "../../../classes/Users/User/DetailsProf/TypeCours";
import { User } from "../../../classes/Users/User/User";
import { hashPassword } from "../../../classes/Users/Utils/Utils";

const testRouter = express.Router();


testRouter.get('/api/test', async (_req: any, res: any) => {

    console.log("1 ====");
    
    const pw : string = ""
    const passhash : string = hashPassword(pw)

    const user : [User, boolean] = await User.findOrCreate({ where :{
        Email: "admin2",
        Password: passhash
    }
    })

    console.log(user);
    if(user === null) return ;

    const avis : Avis = await Avis.create({
        IDObject: user[0].ID,
        IDUserWriteAvis: user[0].ID,
        Notation: 3,
        Commentaire: "Très bon professeur !"
    })

    user[0].addAvis(avis)
    
    await user[0].save()
    

    /*

    console.log("2 ====");

    const prof2 : User = new User()
    prof2.Email = "prof2@gmail.com"
    prof2.Password = "sha256:prof2"

    const pAvis : Promise<Avis> = Avis.create({
        IDUser: prof2.ID,
        Notation: 3
    })
    const pAvis2 : Promise<Avis> = Avis.create({
        IDUser: prof2.ID,
        Notation: 5
    })
    const pAvis3 : Promise<Avis> = Avis.create({
        IDUser: prof2.ID,
        Notation: 1
    })

    const avis : Avis = await pAvis ;
    console.log("AVIS = ",avis.ID);

    console.log(prof1)
    prof1.ListeAvisID.push(avis.ID)
    
    //await prof1.save() ;

    prof1.ListeAvisID.push((await pAvis2).ID)
    prof1.ListeAvisID.push((await pAvis3).ID)

    console.log("Après le push des 3 avis :");
    console.log(prof1)

    const avisAfter : Avis | null = await Avis.findByPk(avis.ID.toString()) ;

    if(avisAfter != null) console.log(avisAfter);
    

    prof1.save().then(async (us) => {
        console.log(prof1.ID.toString());
        console.log(us.ID.toString());

        const prof3 : User | null = await User.findByPk(us.ID.toString()) ;

        if(prof3 != null){

            console.log("PROF 3 : ");
            console.log(prof3);

            const pAvis4 = Avis.create({
                IDUser: prof3.ID,
                Notation: 4
            }).then((av) => {


                const uuids : UUID[] = prof3.ListeAvisID
                uuids.push(av.ID)

                prof3.ListeAvisID = uuids ;

                prof3.Prenom = "TEST update"

                prof3.save().then(() => console.log(prof3))


            })

            

        }


    }) ;

    
    */
    



/*
    // mise à jour de l'instance prof1 en base de données
    await prof1.update({
        ListeAvisID: prof1.ListeAvisID
    }, {
        where: {
            ID: prof1.ID
        }                
    }).then(() => {
        console.log("prof1 mis à jour dans la base de données");
    }).catch((error) => {
        console.log("Erreur lors de la mise à jour de prof1 :", error);
    });
*/


    /*
    const pAvis : Promise<Avis> = Avis.create({
        Notation: 3
    })

    const avis : Avis = await pAvis ;

    console.log("AVIS = ",avis);
    
    const pCours : Promise<CoursEnseigne> = CoursEnseigne.create({
        
          NomCours: "Cours de Maths",
          TypeCours: TypeCours.MATHS,
          ListeNiveaux: [NiveauScolaire.LYCEE_T, NiveauScolaire.LYCEE_1],
          Prix: 45,
          ListeAvisID: [avis.ID]
          
    })

    const cours : CoursEnseigne = await pCours ;

    const pAvis2 : Promise<Avis> = Avis.create({
        Notation: 5
    })
    const pAvis3 : Promise<Avis> = Avis.create({
        Notation: 1
    })

    cours.ListeAvisID.push((await pAvis2).ID)
    cours.ListeAvisID.push((await pAvis3).ID)

    //cours.ListeAvisID.push(avis.ID)
    //cours.save()

    console.log("COURS = ",cours);
    */



    


    /*
    const manager : DatabaseManager = new DatabaseManager()

    const slot1 : TimeSlot = TimeSlot.build({Recurrence: Recurrence.JOUR, DateDebut:123456789, DateFin:1234578988}) ;
    const slot2 : TimeSlot = TimeSlot.build() ;
    const slot3 : TimeSlot = TimeSlot.build() ;

    
    const session1 : SessionCours = SessionCours.build({});
    session1.IDUserProf = session1.ID
    session1.CreneauID = slot1.ID ;
    session1.Prix = 50

    res.send("Test")
    
    await slot1.save() ;

    console.log("Slot 1 a été sauvardé dans la BDD")

    await session1.save() ;
        
    console.log("Creneau 1 a été save")
    
    SessionCours.findOne({where: {ID: session1.ID},}).then((session) => {                 
            if(session == undefined) return ;

            console.log(session.Creneau);
            session.Creneau.then((cre) => {
                console.log(cre)
            })
        });
    */

   res.send("Test")

});


export default testRouter;
