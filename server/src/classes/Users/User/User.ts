import { DataTypes, Model, ModelCtor, ModelStatic, Sequelize } from 'sequelize';
import { ID, IUniqueIdentifier } from '../Identifier/ID';
import sequelize from "../../Database/DatabaseManager";
import { Avis, IAvis } from '../Avis/Avis';
import { CoursEnseigne } from './DetailsProf/CoursEnseigne';
import { SessionCours } from '../Sessions/SessionCours';

export interface IUser extends IUniqueIdentifier {

    
    DateCreationCompte : number ; 
    TypeUser : number ;

    Nom : string ;
    Prenom : string ;
    DateNaissance : number ;
    Email : string ;
    Password : string ;
    Telephone : string ;
    Photo : File | undefined ;
    DescriptionPersonnelle : string ;
    PorteFeuille : number ; 

    ListeSessionCoursSuivisID : ID[] // SessionCours
    ListeAvisID : ID[] // Avis

    ListeCoursEnseignes : ID[] // CoursEnseigne
    ListeCreaneauIndisponible : ID[] // TimeSlot
    
}

export class User extends Model implements IUser {
    
    ID! : ID;

    DateCreationCompte: number = Date.now()
    TypeUser!: number 
    Nom!: string 
    Prenom!: string
    DateNaissance!: number 
    Email!: string 
    Password!: string 
    Telephone!: string 
    Photo!: File | undefined
    DescriptionPersonnelle!: string
    PorteFeuille!: number

    ListeSessionCoursSuivisID! : ID[]
    ListeAvisID! : ID[]

    ListeCoursEnseignes! : ID[]
    ListeCreaneauIndisponible! : ID[]

    addAvis(avis : IAvis) {
      const list : ID[] = []
      list.push(avis.ID);
      this.ListeAvisID.forEach(element => list.push(element)) ;
      this.ListeAvisID = list
    }

    removeAvis(id : ID) {
      const list : ID[] = []
      this.ListeAvisID.forEach(ele => {
        if(ele !== id) list.push(ele)
      })
      this.ListeAvisID = list 
    }

    addCoursEnseigne(cours: CoursEnseigne) {
      const list : ID[] = []
      list.push(cours.ID)
      this.ListeCoursEnseignes.forEach(ele => list.push(ele))
      this.ListeCoursEnseignes = list 
    }

    removeCoursEnseignes(id : ID){
      const list : ID[] = []
      this.ListeCoursEnseignes.forEach(ele => {
        if(ele !== id) list.push(ele)
      })
      this.ListeCoursEnseignes = list 
    }

    getListCoursEnseignes() : Promise<CoursEnseigne | null>[] {
      const promises: Promise<CoursEnseigne | null>[] = [];
      
      this.ListeCoursEnseignes.forEach((coursID) => {
        const promise = CoursEnseigne.findByPk(coursID.toString()) ;
        promises.push(promise);

        promise.then(cours => {
          if(cours === null) this.removeCoursEnseignes(coursID)
        })
      })

      return promises
    }




    /*********************************************/

    addSessionSuivi(session: SessionCours) {
      const list : ID[] = []
      list.push(session.ID)
      this.ListeSessionCoursSuivisID.forEach(ele => list.push(ele))
      this.ListeSessionCoursSuivisID = list 
    }

    removeSessionSuivi(id : ID){
      const list : ID[] = []
      this.ListeSessionCoursSuivisID.forEach(ele => {
        if(ele !== id) list.push(ele)
      })
      this.ListeSessionCoursSuivisID = list 
    }

    getListSessionSuivi() : Promise<SessionCours | null>[] {
      const promises: Promise<SessionCours | null>[] = [];
      
      this.ListeSessionCoursSuivisID.forEach((sessionID) => {
        const promise = SessionCours.findByPk(sessionID.toString()) ;
        promises.push(promise);

        promise.then(session => {
          if(session === null) this.removeSessionSuivi(sessionID)
        })
      })

      return promises
    }


    
}

export function initUserModel() {

    User.init({
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      DateCreationCompte: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      TypeUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      Nom: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      Prenom: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      DateNaissance: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Telephone: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      Photo: {
        type: DataTypes.JSONB,
        defaultValue: ""
      },
      DescriptionPersonnelle: {
        type: DataTypes.TEXT,
        defaultValue: ""
      },
      PorteFeuille: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      ListeSessionCoursSuivisID: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: [],
      },
      ListeAvisID: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: []
      },
      ListeCoursEnseignes: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: []
      },
      ListeCreaneauIndisponible: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: []
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'Users'
    })

}
  


export enum TypeUser {
    ADMIN,
    PROFESSEUR,
    ELEVE
}