import { DataTypes, Model } from "sequelize";
import { ID, IUniqueIdentifier } from "../Users/Identifier/ID";


export interface IConversation extends IUniqueIdentifier {

    IDUsers: ID[] ;
    IDMessages: ID[] ;
    
}

export class Conversation extends Model implements IConversation {
    
    ID!: ID;
    IDUsers!: ID[] ;
    IDMessages!: ID[] ;
    
}

export function initMessageAdapter(sequelize:any){

    Conversation.init(
        {
          ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
          },
          IDUsers: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: false,
            defaultValue: []
          },
          IDMessages: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: false,
            defaultValue: []
          },
        },
        {
          sequelize,
          modelName: 'Conversation',
        }
      );
      

}