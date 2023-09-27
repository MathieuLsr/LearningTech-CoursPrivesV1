import React, { useState } from 'react';
import './Rechercher.css'
import { ListNiveauScolaire, ListTypeCours, MapNiveauScolaire } from '../../Utils/UtilsVar'
import { rechercher } from './UtilsRechercher'
import CoursFilter from '../Cours/CoursFilter'

export default function Rechercher() {

  const [CoursTypeCours, setCoursTypeCours] = useState(undefined)
  const [CoursNiveauScolaire, setCoursNiveauScolaire] = useState(undefined)
  const [CoursPrixMini, setCoursPrixMini] = useState()
  const [CoursPrixMaxi, setCoursPrixMaxi] = useState()
  const [CoursDureeMini, setCoursDureeMini] = useState()
  const [CoursDureeMaxi, setCoursDureeMaxi] = useState()
  
  const [ListCoursFilter, setListCoursFilter] = useState([])
  
  return(
    <div className="rechercher-wrapper">
      <h1>Recherche d'utilisateurs</h1>
        <div className="search-form">
          <div className="cours-type-input">
              <label htmlFor="cours-type-input">Type du cours :</label>              
              <select id="cours-type-input" value={CoursTypeCours} onChange={event => setCoursTypeCours(event.target.value)} >
              <option value={undefined} key="undefined" >{}</option>
                {ListTypeCours.map(ele => (
                  <option value={ele["STR_Name"]} key={ele["INT_ID"]} >{ele["STR_Name"]}</option>
                ))}
              </select>
          </div>
          <label htmlFor="niveau-scolaire">Niveau scolaire :</label>
          <select id="niveau-scolaire" value={CoursNiveauScolaire} onChange={event => setCoursNiveauScolaire(event.target.value)}>
            <option value={undefined} key="undefined" >{}</option>
            {ListNiveauScolaire.map(ele => (
              <option value={ele["STR_Name"]} key={ele["INT_ID"]} >{ele["STR_Name"]}</option>
            ))}
          </select>
          <label htmlFor="prix-min">Prix minimum :</label>
          <input type="number" id="prix-min" value={CoursPrixMini} onChange={event => setCoursPrixMini(event.target.value)}/>
          <label htmlFor="prix-max">Prix maximum :</label>
          <input type="number" id="prix-max" value={CoursPrixMaxi} onChange={event => setCoursPrixMaxi(event.target.value)}/>
          <label htmlFor="duree-min">Durée minimum :</label>
          <input type="number" id="duree-min" value={CoursDureeMini} onChange={event => setCoursDureeMini(event.target.value)}/>
          <label htmlFor="duree-max">Durée maximum :</label>
          <input type="number" id="duree-max" value={CoursDureeMaxi} onChange={event => setCoursDureeMaxi(event.target.value)}/>
        </div>
        <button onClick={() => rechercher(CoursTypeCours, CoursNiveauScolaire, CoursPrixMini, CoursPrixMaxi, CoursDureeMini, CoursDureeMaxi, setListCoursFilter)} id="search-button">Rechercher</button>

        <div id="search-results">

          {ListCoursFilter.map(value => (
            <CoursFilter coursJson={value}/>
          ))}
          
        </div>
    </div>
  )
}
