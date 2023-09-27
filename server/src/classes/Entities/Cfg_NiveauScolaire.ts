import { DataTypes, Model } from "sequelize"

export class Cfg_NiveauScolaire extends Model {
    INT_ID! : number
    STR_Name! : string
}


export function initCfgNiveauScolaireAdapter(sequelize: any){
  Cfg_NiveauScolaire.init({
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
        modelName: 'Cfg_NiveauScolaire',
        tableName: 'Cfg_NiveauScolaire',
        timestamps: false, 
      });
}