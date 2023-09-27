import React, { useState, useEffect } from 'react';
import './Profil.css';
import { Link } from 'react-router-dom';
import { AccountService } from '../../Utils/AccountService';
import { hashPassword } from '../../Utils/Utils';
import { User } from '../../Api/User';
import AvisUser from "../Avis/AvisUser"
import Cours from "../Cours/Cours"
import SelectionNiveauScolaire from "../Cours/SelectionNiveauScolaire"
import { ListNiveauScolaire, ListTypeCours } from "../../Utils/UtilsVar"

import { fetchUser } from "./UtilsUsers"
import { fetchListeAvisUser, postAvisAdd, addAvisCours } from "./UtilsAvis"
import { fetchListeCoursEnseignes, createCoursEnseigne, fetchAllNiveauScolaire } from './UtilsCoursEnseignes';
//import SessionCours from "../SessionCours/SessionCours"

export default function Profil() {

  if(!AccountService.haveUUID()){
    return <div className="notLogged">
        <h1>Vous devez vous connecter pour afficher votre profil.</h1>
        <Link to="/login">Login</Link>
    </div>
  }

  const [message, setMessage] = useState("...")

  // Variables pour modifier son profil
  const [data, setData] = useState("") ;
  const ID = AccountService.getUUID()
  const [Prenom, setPrenom] = useState("");
  const [Password, setPassword] = useState("");
  const [Nom, setNom] = useState("");
  const [DateCreationCompte, setDateCreationCompte] = useState("");
  const [DateNaissance, setDateNaissance] = useState("");
  const [Email, setEmail] = useState("");
  const [TypeUser, setTypeUser] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [DescriptionPersonnelle, setDescriptionPersonnelle] = useState("");
  const [PorteFeuille, setPorteFeuille] = useState("");

  
  /*********************************************************/

  // Variable pour ajouter un avis

  const [ListeAvisID, setListeAvisID] = useState([])

  const [avisCommentaire, setAvisCommentaire] = useState("")
  const [avisNotation, setAvisNotation] = useState(0)

  /*********************************************************/

  const [ListeCoursEnseignes, setListeCoursEnseignes] = useState([])

  const [CoursNomCours, setCoursNomCours] = useState("")
  const [CoursTypeCours, setCoursTypeCours] = useState("")
  const [CoursListeNiveaux, setCoursListeNiveaux] = useState([])
  const [CoursPrix, setCoursPrix] = useState(0)
  const [CoursDuree, setCoursDuree] = useState(60)
  const [CoursListeAvisID, setCoursListeAvisID] = useState([])

  const [AllNiveauScolaire, setAllNiveauScolaire] = useState([])


  const [CoursAvisID, setCoursAvisID] = useState("")
  const [CoursAvisCommentaire, setCoursAvisCommentaire] = useState("")
  const [CoursAvisNotation, setCoursAvisNotation] = useState(0)



  /*********************************************************/


  useEffect(() => {

    fetchUser(setData, setPrenom, setNom, setEmail, setDateCreationCompte, setDateNaissance, setTypeUser, setTelephone, setDescriptionPersonnelle, setPorteFeuille);
    fetchListeAvisUser(ID, setListeAvisID) ;
    fetchListeCoursEnseignes(setListeCoursEnseignes) ;
    fetchAllNiveauScolaire(setAllNiveauScolaire)

  }, []);




  const handleSave = () => {
    
    const user = new User("-1")
    Object.assign(user,data)

    user.ID = ID
    user.Prenom = Prenom
    user.Nom = Nom 
    user.TypeUser = TypeUser
    user.DateNaissance = DateNaissance
    user.Email = Email 
    //user.Password = hashPassword(Password)
    user.Telephone = Telephone
    user.DescriptionPersonnelle = DescriptionPersonnelle
    user.PorteFeuille = PorteFeuille


    const fetchUser = async () => {
      try {
  
        
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(user) 
        }
  
        fetch('http://192.168.1.208:3001/api/user/update/'+ID, options)
          .then( resp => {
            
            if(resp.status === 400){
              setMessage("Vous ne pouvez pas faire ça.")
              return ;
            }

            setMessage("Modifications enregistrées.") ;

          }).catch(err => {
            console.error(err);
          }) 
  
            return ;
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUser();

  };


  /*****************************************/

  /*****************************************/


  return (
    <div className="profil">
      <h2>Profil</h2>
      <form className="profil-info">
        <div className="profil-input">
          <label htmlFor="ID-input">ID : </label>
          <input type="text" id="ID-input" value={ID} defaultValue={ID} disabled={true} />
        </div>
        <div className="profil-input">
          <label htmlFor="prenom-input">Prénom : </label>
          <input type="text" id="prenom-input" value={Prenom} onChange={event => setPrenom(event.target.value)} />
        </div>
        <div className="profil-input">
          <label htmlFor="nom-input">Nom : </label>
          <input type="text" id="nom-input" value={Nom} onChange={event => setNom(event.target.value)} />
        </div>
        <div className="profil-input">
          <label htmlFor="date-creation-input">Date de création du compte : </label>
          <input type="text" id="date-creation-input" value={DateCreationCompte} readOnly />
        </div>
        <div className="profil-input">
          <label htmlFor="type-user-input">Type d'utilisateur : </label>
          <input type="text" id="type-user-input" value={TypeUser} readOnly />
        </div>
        <div className="profil-input">
          <label htmlFor="date-naissance-input">Date de naissance : </label>
          <input type="text" id="date-naissance-input" value={DateNaissance} onChange={event => setDateNaissance(event.target.value)} />
        </div>
        <div className="profil-input">
          <label htmlFor="email-input">Email : </label>
          <input type="email" id="email-input" value={Email} onChange={event => setEmail(event.target.value)} />
        </div>
        <div className="profil-input">
          <label htmlFor="password-input">Password :</label>
          <input type="password" id="password-input" value={Password} onChange={event => setPassword(event.target.value)} />
          <button>Cliquer pour changer votre mot de passe</button>
        </div>
        <div className="profil-input">
          <label htmlFor="telephone-input">Téléphone : </label>
          <input type="tel" id="telephone-input" value={Telephone} onChange={event => setTelephone(event.target.value)} />
        </div>
        <div className="profil-input">
          <label htmlFor="description-input">Description personnelle : </label>
          <textarea id="description-input" value={DescriptionPersonnelle} onChange={event => setDescriptionPersonnelle(event.target.value)} />
        </div>
        <div className="profil-input">
          <label htmlFor="porte-feuille-input">Portefeuille : </label>
          <input type="number" id="porte-feuille-input" value={PorteFeuille} onChange={event => setPorteFeuille(event.target.value)} />
        </div>
      </form>
      <h3>{message}</h3>
      <button onClick={handleSave}>Sauvegarder</button>
      
      <div className="profil-listes">
        <h1>==========================================</h1>
        <div className="profil-liste-avis">
          <h3>Liste des avis :</h3>
          <div>{ListeAvisID.map(avis => (
            <AvisUser IDUser={ID} avis={avis} setListeAvisID={setListeAvisID} />
          ))}</div>

          <form>
            <div className="profil-input">
              <label htmlFor="avis-commentaire-input">Commentaire : </label>
              <textarea id="avis-commentaire-input" value={avisCommentaire} onChange={event => setAvisCommentaire(event.target.value)} />
            </div>
            <div className="profil-input">
              <label htmlFor="avis-notation-input">Notation : </label>
              <select
                id="avis-notation-input"
                value={avisNotation}
                onChange={event => setAvisNotation(event.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </form>
          <button onClick={() => postAvisAdd(ID, ID, avisCommentaire, avisNotation, setMessage, setListeAvisID)}>Ajouter l'avis</button>
        </div>
        <h1>==========================================</h1>
        <div className="profil-liste-session-cours">
          <h3>Liste des sessions de cours suivis :</h3>  
        </div>

        <h1>==========================================</h1>
        <div className="profil-liste-matieres-enseignees">
          <h3>Liste des matières enseignées :</h3>  
          <p1>{ListeCoursEnseignes.map(cours => (
            <Cours IDUser={ID} coursJson={cours} setListeCoursEnseignes={setListeCoursEnseignes} />
          ))}</p1>

          <form>
            <div className="profil-input">
              <label htmlFor="cours-name-input">Nom du cours : </label>
              <input type="text" id="cours-name-input" value={CoursNomCours} onChange={event => setCoursNomCours(event.target.value)} />
            </div>
            <div className="profil-input">
              <label htmlFor="cours-type-input">Type du cours :</label>              
              <select id="cours-type-input" value={CoursTypeCours} onChange={event => setCoursTypeCours(event.target.value)} >
                {ListTypeCours.map(ele => (
                  <option value={ele["STR_Name"]}>{ele["STR_Name"]}</option>
                ))}
              </select>
            </div>
            <div className="profil-input">
              {ListNiveauScolaire.map(ele => (
                <SelectionNiveauScolaire niveau={ele} />
              ))}
            </div>
            <div className="profil-input">
              <label htmlFor="cours-prix-input">Prix :</label>
              <input type="number" id="cours-prix-input" value={CoursPrix} onChange={event => setCoursPrix(event.target.value)} />
            </div>
            <div className="profil-input">
              <label htmlFor="cours-duree-input">Durée :</label>
              <input type="number" id="cours-duree-input" value={CoursDuree} onChange={event => setCoursDuree(event.target.value)} />
            </div>
          </form>
          <button onClick={() => createCoursEnseigne(ID, CoursNomCours, CoursTypeCours, CoursListeNiveaux, CoursPrix, CoursDuree, CoursListeAvisID, setMessage, setListeCoursEnseignes)}>Ajouter la matière enseignée</button>


          <form>

          <div className="profil-input">
              <label htmlFor="cours-avis-id-input">ID Avis : </label>
              <select id="cours-avis-id-input" value={CoursAvisID} onChange={event => setCoursAvisID(event.target.value)} >
                <option value=""></option>
                {ListeCoursEnseignes.map(cours => (
                  <option value={cours.ID}>{cours.ID}</option>
                ))}
              </select>
            </div>

            <div className="profil-input">
              <label htmlFor="cours-avis-commentaire-input">Commentaire : </label>
              <textarea id="cours-avis-commentaire-input" value={CoursAvisCommentaire} onChange={event => setCoursAvisCommentaire(event.target.value)} />
            </div>
            <div className="profil-input">
              <label htmlFor="cours-avis-notation-input">Notation : </label>
              <select id="cours-avis-notation-input" value={CoursAvisNotation} onChange={event => setCoursAvisNotation(event.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </form>
          <button onClick={() => addAvisCours(CoursAvisID, ID, CoursAvisCommentaire, CoursAvisNotation, setMessage, setListeCoursEnseignes)}>Ajouter l'avis à ce cours</button>

        </div>

        



        <h1>==========================================</h1>
        <div className="profil-liste-creneaux-indisponibles">
          <h3>Liste des créneaux indisponibles :</h3>  
        </div>
        

      </div>
    </div>

  );
}

