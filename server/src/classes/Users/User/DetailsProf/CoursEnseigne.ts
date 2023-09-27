import { DataTypes, Model, Op } from "sequelize";
import { ID, IUniqueIdentifier } from "../../Identifier/ID";
import { NiveauScolaire } from "./NiveauScolaire";
import sequelize from "../../../Database/DatabaseManager";
import { TypeCours } from "./TypeCours";
import { Avis, IAvis } from "../../Avis/Avis";
import { User } from "../User";


interface ICoursEnseigne extends IUniqueIdentifier {

    NomCours : string 
    TypeCours : string 
    ListeNiveaux : Array<NiveauScolaire>
    Prix : number 
    Duree : number 
    ListeAvisID: ID[]

}

export class CoursEnseigne extends Model implements ICoursEnseigne {

    ID!: ID;
    ListeAvisID!: ID[]
    NomCours!: string ;
    TypeCours! : string 
    ListeNiveaux!: NiveauScolaire[] ;
    Prix!: number ; 
    Duree!: number ; // En minutes

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

    getAvis() : Promise<Avis | null>[] {
      const list : Promise<Avis | null>[] = []
      this.ListeAvisID.forEach(IDAvis => {
        list.push(Avis.findByPk(IDAvis.toString()))
      })
      return list ;
    }

    async getProfessor() : Promise<User | null> {
      
      const user : User | null = await User.findOne({
        where:{
          ListeCoursEnseignes:{
            [Op.contains]: [this.ID]
          }
        }
      })

      return user ;

    }


}

export function initCoursEnseigneAdapter(){

    CoursEnseigne.init({
        ID: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        NomCours: {
          type: DataTypes.STRING,
          allowNull: false
        },
        TypeCours: {
            type: DataTypes.STRING, //TypeCours.getDataTypeEnum(),
            allowNull: false,
            defaultValue: "Autre" //TypeCours.AUTRE.toString()
        },
        ListeNiveaux: {
          type: DataTypes.ARRAY(NiveauScolaire.getDataTypeEnum()),
          allowNull: false,
          defaultValue: NiveauScolaire.getAllToString()
        },
        ListeAvisID: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: false,
            defaultValue: []
        },
        Prix: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0
        },
        Duree: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 60
        }
      }, {
        sequelize,
        modelName: 'CoursEnseigne'
      });
      

}