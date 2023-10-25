import React from "react";
import { Link } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const { filterEvents, setSearchText } = useContextData();

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    filterEvents();
  };

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
          <Link to="/event/1">Event</Link>
        </li>
      </ul>
    </nav>
  );
};
