import { DataTypes, Model } from "sequelize";
import { ID, IUniqueIdentifier } from "../Users/Identifier/ID";


export interface IMessage extends IUniqueIdentifier {

    IDUser: ID ;
    Date: Number ;
    Content: string ;
    
}

export class Message extends Model implements IMessage {
    
    ID!: ID;
    IDUser!: ID;
    Date!: Number;
    Content!: string;
    
}

export function initMessageAdapter(sequelize:any){

    Message.init(
        {
          ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
          },
          IDUser: {
            type: DataTypes.UUID,
            allowNull: false
          },
          Date: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: new Date() 
          },
          Content: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
          },
        },
        {
          sequelize,
          modelName: 'Message',
        }
      );
      

}