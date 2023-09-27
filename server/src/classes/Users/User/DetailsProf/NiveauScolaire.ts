import { DataTypes, EnumDataType } from "sequelize"

export enum NiveauScolaire {

    PRIMAIRE = 0,
    COLLEGE_6 = 1,
    COLLEGE_5 = 2,
    COLLEGE_4 = 3,
    COLLEGE_3 = 4,
    LYCEE_2 = 5,
    LYCEE_1 = 6,
    LYCEE_T = 7 
}
    
export namespace NiveauScolaire {

    export function getAll() : NiveauScolaire[] {

        return [
            NiveauScolaire.PRIMAIRE,
            NiveauScolaire.COLLEGE_6,
            NiveauScolaire.COLLEGE_5,
            NiveauScolaire.COLLEGE_4,
            NiveauScolaire.COLLEGE_3,
            NiveauScolaire.LYCEE_2,
            NiveauScolaire.LYCEE_1,
            NiveauScolaire.LYCEE_T
        ]

    }

    export function getMapIDWithName() {

        const map = {
            "Primaire": NiveauScolaire.PRIMAIRE,
            "Collège 6ème": NiveauScolaire.COLLEGE_6,
            "Collège 5ème": NiveauScolaire.COLLEGE_5,
            "Collège 4ème": NiveauScolaire.COLLEGE_4,
            "Collège 3ème": NiveauScolaire.COLLEGE_3,
            "Lycée 2nd": NiveauScolaire.LYCEE_2,
            "Lycée 1ere": NiveauScolaire.LYCEE_1,
            "Lycée Term": NiveauScolaire.LYCEE_T,
        }
        
        return map ;

    }

    export function getDataTypeEnum() : EnumDataType<string> {

        return DataTypes.ENUM(
            NiveauScolaire.PRIMAIRE.toString(),
            NiveauScolaire.COLLEGE_6.toString(),
            NiveauScolaire.COLLEGE_5.toString(),
            NiveauScolaire.COLLEGE_4.toString(),
            NiveauScolaire.COLLEGE_3.toString(),
            NiveauScolaire.LYCEE_2.toString(),
            NiveauScolaire.LYCEE_1.toString(),
            NiveauScolaire.LYCEE_T.toString()
        ) ;

    }

    export function getAllToString() : string[] {

        const list : string[] = []

        NiveauScolaire.getAll().forEach((niv) => {
            list.push(niv.toString())
        })
        return list ;
    }

}