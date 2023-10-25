import React, { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext({});

export const fetchData = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch("http://localhost:3000/users");

  const eventsData = await events.json();
  const categoriesData = await categories.json();
  const usersData = await users.json();

  return {
    events: eventsData,
    categories: categoriesData,
    users: usersData,
  };
};

export const AppContextProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState();
  const [users, setUsers] = useState();
  const [lastClickedEvent, setLastClickedEvent] = useState(false);

  useEffect(() => {
    fetchData().then((data) => {
      setEvents(data.events);
      setFilteredEvents(data.events);
      setCategories(data.categories);
      setUsers(data.users);
    });
  }, []);

  const filterEvents = () => {
    const filteredData = filteredEvents?.filter((event) =>
      event?.title?.toLowerCase().includes(searchText.toLowerCase())
    );

    // console.log(filteredData);
    setFilteredEvents(filteredData);
    return filteredData;
  };

  return (
    <AppContext.Provider
      value={{
        events,
        searchText,
        setSearchText,
        filteredEvents,
        setFilteredEvents,
        users,
        setUsers,
        categories,
        setCategories,
        filterEvents,
        lastClickedEvent,
        setLastClickedEvent,
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
