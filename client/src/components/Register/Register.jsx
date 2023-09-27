import React, { useState } from 'react';
import { hashPassword } from "../../Utils/Utils"

export default function Register() {

  const [message, setMessage] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const pw1 = form.elements.pw1.value;
    const pw2 = form.elements.pw2.value;
    if (pw1 !== pw2) {
      setMessage("Mot de passe différents.");
      return ;
    }

    const hashPw = hashPassword(pw1) ; 
    
    console.log(email+":"+hashPw);

    //const [response, setResponse] = useState();
    
    fetch('http://192.168.1.208:3001/api/register/'+email+"/"+hashPw)
      .then(data => {
        if(data.status === 500){
          setMessage("Email déjà enregistré.")
          return ;
        }
        console.log(data)
        setMessage("Nouveau compte enregistré !")
      })
      .catch(error => {
        console.error(error)
      });
    

  };
  

  return(
    <div className="register-wrapper">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p1>{message}</p1>
        </label>
        <label>
          <p>Email</p>
          <input type="text" name="email" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="pw1" />
        </label>
        <label>
          <p> Confirm password </p>
          <input type="password" name="pw2" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  ) ;
}
