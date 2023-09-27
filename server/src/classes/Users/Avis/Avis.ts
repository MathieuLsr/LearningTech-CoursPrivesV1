import { DataTypes, Model } from "sequelize";
import { ID, IUniqueIdentifier } from "../Identifier/ID";
import sequelize from "../../Database/DatabaseManager";

export interface IAvis extends IUniqueIdentifier {

    IDObject : ID ;
    IDUserWriteAvis : ID ; 
    Notation : number ;
    Commentaire : string ;

}

export class Avis extends Model implements IAvis {
    
    ID!: ID ;
    IDObject!: ID;
    IDUserWriteAvis!: ID;
    Notation!: number;
    Commentaire!: string;

}

export function initAvisAdapter(){

    Avis.init(
        {
          ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
          },
          IDObject: {
            type: DataTypes.UUID,
            allowNull: true
          },
          IDUserWriteAvis: {
            type: DataTypes.UUID,
            allowNull: true
          },
          Notation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: -1,
            validate: {
              min: -1,
              max: 5,
            },
          },
          Commentaire: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ""
          },
        },
        {
          sequelize,
          modelName: 'Avis',
        }
      );
      

}