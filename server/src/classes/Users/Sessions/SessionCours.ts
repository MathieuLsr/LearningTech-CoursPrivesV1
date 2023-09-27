import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/DatabaseManager";
import { ID, IUniqueIdentifier } from "../Identifier/ID";
import { ITimeSlot, TimeSlot } from "./TimeSlot";
import { TypeReponse } from "./TypeReponse";

export interface ISessionCours extends IUniqueIdentifier {

    IDUserProf: ID
    IDUserEleve: ID
    NomSession: string
    CreneauID: ID
    Prix: number
    TypeReponseProf: TypeReponse
    AccepteEleve: boolean
    PayeEleve: boolean

}

export class SessionCours extends Model implements ISessionCours {
    
    ID! : ID;

    IDUserProf!: ID
    IDUserEleve!: ID
    NomSession!: string
    CreneauID!: ID
    declare Creneau: TimeSlot | null
    Prix!: number 
    TypeReponseProf!: TypeReponse
    AccepteEleve!: boolean
    PayeEleve!: boolean

}


export function initSessionCoursAdapter(){

  SessionCours.init(
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      IDUserProf: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      IDUserEleve: {
        type: DataTypes.UUID,
      },
      NomSession: {
        type: DataTypes.STRING,
        defaultValue:""
      },
      CreneauID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'TimeSlots',
          key: 'ID'
        }
      },
      Creneau:{
        type: DataTypes.VIRTUAL,
        /*get(){
          const temp : Promise<TimeSlot | null> = TimeSlot.findByPk(this.CreneauID.toString())
          return temp ;
        }*/
      },
      Prix: {
        type: DataTypes.FLOAT,
        defaultValue:0,
        allowNull: false,
      },
      TypeReponseProf: {
        type: DataTypes.ENUM(
          TypeReponse.ATTENTE.toString(),
          TypeReponse.ACCEPTE.toString(),
          TypeReponse.REFUSE.toString(),
        ),
        allowNull: false,
        defaultValue: TypeReponse.ATTENTE.toString()
      },
      AccepteEleve: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      PayeEleve: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'SessionCours',
    },
  );
  
}
