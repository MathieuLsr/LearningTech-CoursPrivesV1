import React from 'react';
/*
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchAllUsers } from './SetAdmin';
*/
function SetAdmin() {

    return (
        <div className='setadmin'>
            <p>Set admin</p>
        </div>
    )
}

export default SetAdmin ;

/*
    useEffect(() => {
        fetchAllUsers(setUsers)
      }, []);

    const [users, setUsers] = useState([])

  return (
    <div className="setadmin">

        <title>Type d'utilisateur</title>

        <div>
            <label htmlFor="select-user">Utilisateur :</label>              
            <select id="select-user">
            {users.map(user => (
                <option value={user}>{user.toString()}</option>
            ))}
            </select>
        </div>
    
    </div>
  );
  */
