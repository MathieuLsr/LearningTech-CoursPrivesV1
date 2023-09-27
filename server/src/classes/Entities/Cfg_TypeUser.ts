import { DataTypes, Model } from "sequelize"

export class Cfg_TypeUser extends Model {
    INT_ID! : number
    STR_Name! : string
}


export function initCfgTypeUserAdapter(sequelize: any){
  Cfg_TypeUser.init({
        INT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          STR_Name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      }, {
        sequelize,
        modelName: 'Cfg_TypeUser',
        tableName: 'Cfg_TypeUser',
        timestamps: false, 
      });
}