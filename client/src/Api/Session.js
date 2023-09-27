import { ITimeslot } from './Timeslot'

export class ISession {
    constructor(ele) {
        this.ID = ele["ID"] ;
        this.IDUserProf = ele["IDUserProf"] ;
        this.IDUserEleve = ele["IDUserEleve"] ;
        this.CreneauID = ele["CreneauID"] ;
        this.Prix = ele["Prix"] ;
        this.TypeReponseProf = ele["TypeReponseProf"] ;
        this.AccepteEleve = ele["AccepteEleve"] ;
        this.PayeEleve = ele["PayeEleve"] ;
        this.Creneau = new ITimeslot(ele["Creneau"]) ;
        this.NomSession = ele["NomSession"] ;
    }
}
/*
{
    "ID":"b909490d-4829-4dd8-862e-2876be7de1ca",
    "IDUserProf":"90f48bcb-078e-41cc-9588-db69ac8c4ff2",
    "IDUserEleve":"ba0f2774-371a-4487-9bb8-6617813ef8b7",
    "CreneauID":"d29582d6-90b9-44cf-9a14-a1d950c5f1b9",
    "Prix":20,
    "TypeReponseProf":"0",
    "AccepteEleve":true,
    "PayeEleve":false,
    "createdAt":"2023-06-02T09:40:39.239Z",
    "updatedAt":"2023-06-02T09:40:39.239Z",
    "Creneau":{
        "ID":"d29582d6-90b9-44cf-9a14-a1d950c5f1b9",
        "Recurrence":"0",
        "DateDebut":1685811600,
        "DateFin":1685813400,
        "createdAt":"2023-06-02T09:40:39.165Z",
        "updatedAt":"2023-06-02T09:40:39.165Z"
    }
}
*/