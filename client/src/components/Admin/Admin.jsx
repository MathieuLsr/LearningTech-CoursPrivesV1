import React, { useState, useEffect } from 'react';
import { ListTypeUser } from '../../Utils/UtilsVar';
import { fetchAllUsers, updateUser } from './SetAdmin/SetAdmin';
import { Link } from 'react-router-dom';


export default function Admin() {

  const [users, setUsers] = useState([])

  const [user, setUser] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    fetchAllUsers(setUsers)
  }, []);

  return (
    <div className="admin">
      <p>Panel Admin</p>
      <div className='setAdmin'>
        <div>
            <label htmlFor="select-user">Utilisateur :</label>              
            <select id="select-user" onChange={e => setUser(users.at(e.target.value))}>
            <option value='null'>Aucun</option>
            {users.map((user, index) => (
                <option value={index}>{user.Prenom} {user.Nom}</option>
            ))}
            </select>
        </div>
        <div>
            <label htmlFor="select-type">Type :</label>  
            <select id="select-type" onChange={e => setType(ListTypeUser.at(e.target.value))}>
            {ListTypeUser.map((type, index) => (
              <option value={index}>{type.STR_Name}</option>
            ))}
            </select>
        </div>
            <p>{user !== undefined ? JSON.stringify(user) : "Aucun utilisateur sélectionné"}</p>
            <p>{JSON.stringify(type)}</p>
        <button onClick={() => updateUser(user, type)}>Sauvegarder</button>
        </div>

      <div>
          <Link to="/dashboard">Accéder au dashboard</Link>
      </div>
    </div>


  );
}
