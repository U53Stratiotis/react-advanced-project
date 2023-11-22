import React, { createContext, useState, useContext, useEffect } from "react";
// Run the 'json-server events.json'command to set up json file on a local server on port 3000'

export const AppContext = createContext({});

export const fetchData = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch("http://localhost:3000/users");

  console.log(events);
  console.log(categories);
  console.log(users);

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
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredCategoryIds, setFilteredCategoryIds] = useState([]);
  const [events, setEvents] = useState([]);
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

  return (
    <AppContext.Provider
      value={{
        events,
        filteredEvents,
        setFilteredEvents,
        users,
        setUsers,
        categories,
        setCategories,
        lastClickedEvent,
        setLastClickedEvent,
        filteredCategoryIds,
        setFilteredCategoryIds,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// We import useContext here so we only need to import useContextData elsewhere
export const useContextData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppContextProvider");
  }
  return context;
};
