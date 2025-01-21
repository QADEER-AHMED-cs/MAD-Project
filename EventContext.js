import React, { createContext, useState } from 'react';

// Create Event Context
export const EventContext = createContext();

// Provider Component
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Hackathon', date: '2024-12-15', feedback: '' },
    { id: 2, title: 'Art Exhibition', date: '2024-12-10', feedback: '' },
  ]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: prevEvents.length + 1 }]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
