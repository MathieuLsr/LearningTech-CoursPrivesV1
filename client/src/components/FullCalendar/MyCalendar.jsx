import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AccountService } from '../../Utils/AccountService';
import { fetchSessionUser, getEventStyle } from './UtilsCalendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import SessionCoursEleve from '../SessionCours/SessionCoursEleve';
import SessionCoursProf from '../SessionCours/SessionCoursProf';


export default function MyCalendar({ IDUser_ }) {

  if(!AccountService.haveUUID()){
    return <div className="notLogged">
        <h1>Vous devez vous connecter pour afficher votre calendrier.</h1>
        <Link to="/login">Login</Link>
    </div>
  }

  const IDUser = IDUser_ === undefined ? AccountService.getUUID() : IDUser_;
  const [, setSessionsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([])

  const localizer = momentLocalizer(moment);

  Modal.setAppElement("#root")

  const effects = () => {
    useEffect(() => {
      fetchSessionUser(IDUser, setEvents);
    }, []);
  }

  effects()

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
    fetchSessionUser(IDUser, setEvents);
  };

  const renderEventDetails = () => {
    if (!selectedEvent) return null;

    const sessionHtml =  selectedEvent.session.IDUserProf === IDUser ? 
        <div><SessionCoursProf session={selectedEvent.session} IDUser={IDUser} setSessionsData={setSessionsData}/></div> :
        <div><SessionCoursEleve session={selectedEvent.session} IDUser={IDUser} setSessionsData={setSessionsData}/></div> 

    return (
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Event Details">
        <div className="event-details">
          {sessionHtml}
          <button onClick={handleCloseModal}>Fermer</button>
        </div>
      </Modal>
    );
  };

  

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="week"
        eventPropGetter={getEventStyle}
        selectable={true}
        onSelectEvent={handleEventSelect}
      />
      {renderEventDetails()}
    </div>
  );
}
