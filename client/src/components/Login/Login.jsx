import React, { useState } from 'react';
import './Login.css';
import { hashPassword } from "../../Utils/Utils"
import { AccountService } from '../../Utils/AccountService';

export default function Login({setToken}) {

  /* const [username, setUserName] = useState();
  const [password, setPassword] = useState(); */

  const [message, setMessage] = useState("");
  const emailSaved = AccountService.haveEmail() ? AccountService.getEmail() : ""

  const handleSubmit = async event => {
    
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const pw = form.elements.pw.value;
    const hashPw = hashPassword(pw) ;
    
    fetch('http://192.168.1.208:3001/api/login/'+email+"/"+hashPw)
      .then(async response => {
        if(response.status === 400){
          setMessage("Email ou mot de passe incorrect.")
          return ;
        }
        const data = await response.json()
        const id = data.ID;
        
        AccountService.saveEmail(email)
        AccountService.saveUUID(id)
        setMessage("Login succeed !")
        return ;
      })
      .catch(error => {
        setMessage("Une erreur est survenue.")
        console.error(error)
      });

  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p1>{message}</p1>
        </label>
        <label>
          <p>Email</p>
          <input type="text" name="email" defaultValue={emailSaved}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="pw"/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
