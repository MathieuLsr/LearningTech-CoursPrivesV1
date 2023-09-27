export enum TypeReponse {
    ATTENTE = '0',
    ACCEPTE = '1',
    REFUSE = '2',
}

export namespace TypeReponse {
    export function parseString(str : string) : TypeReponse | undefined {
        if(str === "0") return TypeReponse.ATTENTE
        if(str === "1") return TypeReponse.ACCEPTE
        if(str === "2") return TypeReponse.REFUSE
        return undefined
    }
}