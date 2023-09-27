import { DataTypes, Model } from "sequelize"

export class Cfg_TypeCours extends Model {
    INT_ID! : number
    STR_Name! : string
}


export function initCfgTypeCoursAdapter(sequelize: any){

    Cfg_TypeCours.init({
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
        modelName: 'Cfg_TypeCours',
        tableName: 'Cfg_TypeCours',
        timestamps: false, 
      });
      

}