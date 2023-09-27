import { DataTypes, EnumDataType, Model } from "sequelize";

export enum TypeCours {

    AUTRE = 0,
    PHYSIQUE = 1,
    ANGLAIS = 2,
    BIOLOGIE = 3,
    MATHS = 4

}


export namespace TypeCours {

    export function getAll() : TypeCours[] {

        return [
            TypeCours.AUTRE,
            TypeCours.PHYSIQUE,
            TypeCours.ANGLAIS,
            TypeCours.BIOLOGIE,
            TypeCours.MATHS
        ]

    }

    export function getDataTypeEnum() : EnumDataType<string> {

        return DataTypes.ENUM(
            TypeCours.AUTRE.toString(),
            TypeCours.PHYSIQUE.toString(),
            TypeCours.ANGLAIS.toString(),
            TypeCours.BIOLOGIE.toString(),
            TypeCours.MATHS.toString()
        ) ;

    }


}