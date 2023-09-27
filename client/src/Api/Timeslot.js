export class ITimeslot {
    constructor(ele) {
        this.ID = ele["ID"]
        this.Recurrence = ele["Recurrence"]
        this.DateDebut = ele["DateDebut"]
        this.DateFin = ele["DateFin"]
    }
    
}

/*
"Creneau":{
    "ID":"d29582d6-90b9-44cf-9a14-a1d950c5f1b9",
    "Recurrence":"0",
    "DateDebut":1685811600,
    "DateFin":1685813400,
    "createdAt":"2023-06-02T09:40:39.165Z",
    "updatedAt":"2023-06-02T09:40:39.165Z"
}
*/