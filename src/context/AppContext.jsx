import React, { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext({});

export const fetchData = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const eventsData = await events.json();

  return {
    events: eventsData,
  };
};

export const AppContextProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setFilteredEvents(data.events);
    });
  }, []); // Empty dependency array ensures this effect runs only once

  const filterEvents = () => {
    return filteredEvents?.filter((event) =>
      event?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <AppContext.Provider
      value={{
        searchText,
        setSearchText,
        filteredEvents,
        setFilteredEvents,
        // categories,
        // setCategories,
        filterEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useContextData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppContextProvider");
  }
  return context;
};
