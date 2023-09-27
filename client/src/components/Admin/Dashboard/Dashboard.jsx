import React, { useState, useEffect } from 'react';
import { AccountService } from '../../../Utils/AccountService';
import { fetchAllDatasDashboard, getLiteInfosUser } from './Dashboard';
import { Link } from 'react-router-dom';

export default function Dashboard() {

    if(!AccountService.haveUUID()){
        return <div className="notLogged">
            <h1>Vous devez vous connecter pour accéder à cette page.</h1>
            <Link to="/login">Login</Link>
        </div>
    }

    const [typeUser, setTypeUser] = useState(null);
    const [datas, setDatas] = useState()

    useEffect(() => {
        const fetchData = async () => {
            getLiteInfosUser(AccountService.getUUID(), setTypeUser);
        };
      
        fetchData();
        fetchAllDatasDashboard(setDatas)
    }, []);

    if(typeUser === null || typeUser === 2){
        return (
            <div>
                <p>Aucune donnée</p>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <p>Dashboard</p>
            <p>{datas === undefined ? "Aucune donnée" : JSON.stringify(datas)}</p>
            
            <div className="data">
                <p>Nombre total d'utilisateurs : {datas === undefined ? 0 : datas.users.length}</p>
                <p>Nombre total d'avis : {datas === undefined ? 0 : datas.avis.length}</p>
                <p>Nombre total de cours : {datas === undefined ? 0 : datas.cours.length}</p>
                <p>Nombre total de sessions : {datas === undefined ? 0 : datas.sessions.length}</p>
                <p>Nombre total de post sur le forum : {datas === undefined ? 0 : datas.postForum.length}</p>

            </div>
            
        </div>
    );
}
