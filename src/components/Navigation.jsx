import React from "react";
import { Link } from "react-router-dom";
import { useContextData } from "../context/AppContext";

import styles from "./Navigation.module.css";

export const Navigation = () => {
  const { filterEvents, setSearchText, lastClickedEvent } = useContextData();

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    filterEvents();
  };

  const eventLinkPath = lastClickedEvent ? `/event/${lastClickedEvent}` : "/";

  return (
    <nav className={styles.navContainer}>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <div className={styles.searchContainer}>
          <input
            name="searchbar"
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </div>
        <li>
          <Link to={eventLinkPath}>Event</Link>
        </li>
      </ul>
    </nav>
  );
};
