import { DataTypes, Model } from "sequelize"
import { ID } from "../Users/Identifier/ID"

export class PostForum extends Model {
    INT_ID! : number
    UUID_UserID!: ID
    STR_Title! : string
    STR_Body! : string
}


export function initPostForumAdapter(sequelize: any){
    PostForum.init({
        INT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          UUID_UserID: {
            type: DataTypes.UUID,
            allowNull: false
          },
          STR_Title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:""
          },
          STR_Body: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:""
          },
      }, {
        sequelize,
        modelName: 'PostsForum',
        tableName: 'PostsForum'
      });
}