import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountService } from '../../Utils/AccountService';
import './styles.css'
import { UpdatePassword } from './ChangePassword'


export default function ChangePassword() {

    if(!AccountService.haveUUID()){
        return <div className="notLogged">
            <h1>Vous devez vous connecter pour accéder à cette page.</h1>
            <Link to="/login">Login</Link>
        </div>
    }

    const [message, setMessage] = useState("Changer votre mot de passe")

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    const handleSave = () => {

        console.log(currentPassword, newPassword1, newPassword2);

        if(newPassword1 !== newPassword2){
            setMessage("Les mots de passe ne sont pas identiques.")
            return ;
        }

        UpdatePassword(AccountService.getUUID(), currentPassword, newPassword1, setMessage)
    }

  return (
    <div class="changepassword">
        <p> {message} </p>
        <div class="change">
            <label for="currentPassword">Mot de passe actuel:</label>
            <input type="password" id="currentPassword" placeholder="Mot de passe actuel" value={currentPassword} onChange={event => setCurrentPassword(event.target.value)}/>
            <label for="newPassword">Nouveau mot de passe:</label>
            <input type="password" id="newPassword" placeholder="Nouveau mot de passe" value={newPassword1} onChange={event => setNewPassword1(event.target.value)} />
            <label for="confirmPassword">Confirmer le mot de passe:</label>
            <input type="password" id="confirmPassword" placeholder="Confirmer le mot de passe" value={newPassword2} onChange={event => setNewPassword2(event.target.value)} />
            <button type="button" onClick={handleSave}>Valider</button>
        </div>
    </div>
  );
}
