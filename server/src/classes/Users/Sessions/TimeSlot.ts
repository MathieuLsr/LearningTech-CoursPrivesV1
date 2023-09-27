import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/DatabaseManager";
import { ID, IUniqueIdentifier } from "../Identifier/ID";
import { Recurrence } from "../Time/Recurrence";

export interface ITimeSlot extends IUniqueIdentifier {
    
    Recurrence : Recurrence ;
    DateDebut : Number ;
    DateFin : Number ;

}
export class TimeSlot extends Model implements ITimeSlot {
    
    ID!: ID;
      
    Recurrence!: Recurrence ;
    DateDebut!: Number;
    DateFin!: Number;
    
   
   
}


export function initTimeSlotAdapter(){

  TimeSlot.init(
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      Recurrence: {
        type: DataTypes.ENUM(Recurrence.AUCUNE.toString(), Recurrence.JOUR.toString(), Recurrence.SEMAINE.toString(), Recurrence.MOIS.toString()),
        allowNull: false,
        defaultValue: Recurrence.AUCUNE.toString()
      },
      DateDebut: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DateFin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    },
    {
      sequelize,
      modelName: 'TimeSlot',
    }
  );

}

