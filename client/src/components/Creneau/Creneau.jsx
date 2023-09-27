import React from 'react';
import { ISession } from '../../Api/Session';
import { ITimeslot } from '../../Api/Timeslot';
import { formatTimestamp } from '../../Utils/Utils'

export default function Creneau({creneau}) {

    const timestamp_debut = creneau.DateDebut*1000
    const timestamp_fin = creneau.DateFin*1000

    const dateDebut_str = formatTimestamp(timestamp_debut)
    const dateFin_str = formatTimestamp(timestamp_fin)

  return (
    <div className={creneau.ID}>
        <p>{creneau.Recurrence} : {dateDebut_str} {dateFin_str} ({timestamp_debut} - {timestamp_fin})</p>
    </div>
  );
};
