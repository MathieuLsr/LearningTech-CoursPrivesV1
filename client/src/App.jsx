import React, { /*useState*/ } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NavBar from './components/NavBar/NavBar';
import Profil from './components/Profil/Profil';
import Rechercher from './components/Rechercher/Rechercher';
import Calendar from './components/Calendar/Calendar';
import MyCalendar from './components/FullCalendar/MyCalendar';
import { loadVariables } from './Utils/UtilsVar';
import Chat from './components/Chat/Chat';
import Admin from './components/Admin/Admin';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ChangePassword from './components/ChangePassword/ChangePassword';
import PostForum from './components/Forum/PostForum.jsx';

function App() {

  loadVariables() ;

  return (
    <div className="App">
      <h1>Application</h1>
      <BrowserRouter> 
        <NavBar />
          <Switch>
            <Route exact path="/">
              <h2>Hello world !</h2>
            </Route>
            
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profil" component={Profil} />
            <Route path="/rechercher" component={Rechercher} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/fullCalendar" component={MyCalendar} />
            <Route path="/chat" component={Chat} />
            <Route path="/admin" component={Admin} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/forum" component={PostForum} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
